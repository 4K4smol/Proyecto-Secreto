// index.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

// Configurar la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost', 
  user: 'root',      
  password: 'mysql',  
  database: 'influencers_db'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conexión a MySQL exitosa");
});

// Ruta para obtener todos los influencers
app.get('/api/influencers', (req, res) => {
  db.query("SELECT * FROM influencers", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// Ruta para obtener un influencer por ID
app.get('/api/influencers/:id', (req, res) => {
  const influencerId = req.params.id;
  db.query("SELECT * FROM influencers WHERE id = ?", [influencerId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (results.length > 0) {
        const influencer = results[0];
        // Agregar la estructura socialLinks
        influencer.socialLinks = {
          instagram: influencer.instagram,
          twitter: influencer.twitter,
        };
        delete influencer.instagram; // Elimina la propiedad redundante
        delete influencer.twitter;    // Elimina la propiedad redundante
  
        res.json(influencer);
      }else {
      res.status(404).json({ error: "Influencer no encontrado" });
    }
  });
});

// Ruta para agregar un nuevo influencer
app.post('/api/influencers', (req, res) => {
  const { name, bio, image, instagram, twitter } = req.body;
  const sql = "INSERT INTO influencers (name, bio, image, instagram, twitter) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, bio, image, instagram, twitter], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ id: result.insertId, name, bio, image, instagram, twitter });
  });
});

// Ruta para actualizar un influencer existente
app.put('/api/influencers/:id', (req, res) => {
  const influencerId = req.params.id;
  const { name, bio, image, instagram, twitter } = req.body;
  const sql = "UPDATE influencers SET name = ?, bio = ?, image = ?, instagram = ?, twitter = ? WHERE id = ?";
  db.query(sql, [name, bio, image, instagram, twitter, influencerId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (result.affectedRows > 0) {
      res.json({ id: influencerId, name, bio, image, instagram, twitter });
    } else {
      res.status(404).json({ error: "Influencer no encontrado" });
    }
  });
});

// Ruta para eliminar un influencer
app.delete('/api/influencers/:id', (req, res) => {
  const influencerId = req.params.id;
  db.query("DELETE FROM influencers WHERE id = ?", [influencerId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (result.affectedRows > 0) {
      res.json({ message: "Influencer eliminado" });
    } else {
      res.status(404).json({ error: "Influencer no encontrado" });
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


const secretKey = "mySecretKey123"; // Llave secreta para JWT

// Registro de usuario
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Verificar si el usuario ya existe
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (result.length > 0) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar nuevo usuario
    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(201).json({ message: "Usuario registrado con éxito" });
    });
  });
});

// Inicio de sesión
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Verificar si el usuario existe
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
    }

    const user = result[0];

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
    }

    // Crear y devolver un token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
    res.json({ message: "Inicio de sesión exitoso", token, username: user.username });
});
});


// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(403).json({ message: "Token no proporcionado" });
    }
  
    // Verificar el token
    jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token no válido" });
      }
      req.userId = decoded.id; // Guardar el id del usuario en el objeto de solicitud
      next();
    });
  };
  
  // Ruta protegida para obtener todos los influencers
app.get('/api/influencers', verifyToken, (req, res) => {
    db.query("SELECT * FROM influencers", (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json(results);
    });
  });
  