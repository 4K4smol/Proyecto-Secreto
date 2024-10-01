require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mysql = require('mysql2');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();

// Middleware de seguridad
app.use(helmet());

// Middleware para limitar solicitudes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Demasiadas solicitudes desde esta IP, por favor intenta de nuevo más tarde."
});
app.use(limiter);

// Middleware para analizar JSON y habilitar CORS
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
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
    process.exit(1); // Terminar el proceso si no hay conexión
  }
  console.log("Conexión a MySQL exitosa");
});

// Llave secreta para JWT
const secretKey = process.env.JWT_SECRET;

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ message: "Token no proporcionado" });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token no válido" });
    req.userId = decoded.id;
    next();
  });
};

// Rutas de la API

// Endpoint para obtener influencers por municipio_id
app.get('/api/influencers/municipio/:municipio_id', (req, res) => {
  const municipioId = req.params.municipio_id;
  if (!municipioId) {
    return res.status(400).json({ message: "ID de municipio no proporcionado" });
  }
  db.query('SELECT * FROM influencers WHERE municipio_id = ?', [municipioId], (err, results) => {
    if (err) {
      console.error('Error al obtener las influencers:', err);
      return res.status(500).json({ message: 'Error al obtener las influencers' });
    }
    res.json(results);
  });
});

// Endpoint para la búsqueda de influencers por nombre (parcial)
app.get('/api/influencers/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "No se proporcionó un término de búsqueda" });

  const sql = "SELECT * FROM influencers WHERE LOWER(name) LIKE ?";
  db.query(sql, [`%${q.toLowerCase()}%`], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Influencer no encontrada" });
    res.json(results);
  });
});

// Endpoint para obtener un influencer por ID (numérico)
app.get('/api/influencers/id/:id(\\d+)', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM influencers WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Influencer no encontrado" });
    res.json(results[0]);
  });
});

// Endpoint para obtener un influencer por nombre exacto
app.get('/api/influencers/name/:name', (req, res) => {
  const name = req.params.name.toLowerCase();
  db.query('SELECT * FROM influencers WHERE LOWER(name) = ?', [name], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Influencer no encontrado" });
    res.json(results[0]);
  });
});

// Ruta protegida que requiere autenticación
app.get('/api/influencers', verifyToken, (req, res) => {
  db.query("SELECT * FROM influencers", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Ruta para obtener un municipio por su ID
app.get('/api/municipios/:municipioId', (req, res) => {
  const { municipioId } = req.params;
  db.query('SELECT * FROM municipios WHERE id = ?', [municipioId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener el municipio' });
    if (results.length === 0) return res.status(404).json({ error: 'Municipio no encontrado' });
    res.json(results[0]);
  });
});

// Sirve los archivos estáticos del build de React
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
