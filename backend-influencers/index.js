require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mysql = require('mysql2');
const helmet = require('helmet'); // Para seguridad adicional
const rateLimit = require('express-rate-limit'); // Para limitar solicitudes
const path = require('path');

const app = express();

// Middleware de seguridad
app.use(helmet());

// Middleware para limitar solicitudes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limitar cada IP a 100 solicitudes por ventana
  message: "Demasiadas solicitudes desde esta IP, por favor intenta de nuevo más tarde."
});
app.use(limiter);

// Middleware para analizar JSON y habilitar CORS
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Reemplaza con el origen de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Configurar la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,      
  password: process.env.DB_PASSWORD,  
  database: process.env.DB_NAME
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conexión a MySQL exitosa");
});

// Llave secreta para JWT
const secretKey = process.env.JWT_SECRET; 

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(403).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: "Token no proporcionado" });
  }

  // Verificar el token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token no válido" });
    }
    req.userId = decoded.id; // Guardar el id del usuario en el objeto de solicitud
    next();
  });
};

// Rutas de la API
app.get('/api/influencers', (req, res) => {
  db.query("SELECT * FROM influencers", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// Endpoint para la búsqueda de influencers por nombre utilizando el query parameter `q`
app.get('/api/influencers/search', (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: "No se proporcionó un término de búsqueda" });
  }

  const sql = "SELECT * FROM influencers WHERE LOWER(name) LIKE ? LIMIT 1"; 
  db.query(sql, [`%${q.toLowerCase()}%`], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Influencer no encontrada" });
    }

    res.json(results[0]);
  });
});

// Endpoint para obtener un influencer por ID o nombre exacto
app.get('/api/influencers/:identifier', (req, res) => {
  const { identifier } = req.params;

  // Verificar si el identifier es un número (ID) o un texto (nombre)
  const isId = !isNaN(identifier);

  let sql;
  let queryParam;

  if (isId) {
    // Buscar por ID
    sql = "SELECT * FROM influencers WHERE id = ?";
    queryParam = [identifier];
  } else {
    // Buscar por nombre exacto (asegúrate de que la columna name está en minúsculas si estás utilizando lower)
    sql = "SELECT * FROM influencers WHERE LOWER(name) = ?";
    queryParam = [identifier.toLowerCase()];
  }

  db.query(sql, queryParam, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Influencer no encontrado" });
    }

    res.json(results[0]);
  });
});





app.get('/api/influencers/search', (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: "No se proporcionó un término de búsqueda" });
  }

  const sql = "SELECT * FROM influencers WHERE LOWER(name) LIKE ? LIMIT 1"; 
  db.query(sql, [`%${q.toLowerCase()}%`], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Influencer no encontrada" });
    }

    res.json(results[0]);
  });
});

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (result.length > 0) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(201).json({ message: "Usuario registrado con éxito" });
    });
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
    res.json({ message: "Inicio de sesión exitoso", token, username: user.username });
  });
});

// Añade todas las rutas de tu API antes de esta parte

// Sirve los archivos estáticos del build de React (esta parte va al final)
app.use(express.static(path.join(__dirname, 'build')));

// Cualquier otra ruta que no coincida debe responder con index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
