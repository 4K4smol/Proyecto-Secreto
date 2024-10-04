// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/notFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h2>404 - Página No Encontrada</h2>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/" className="home-link">Volver al Inicio</Link>
    </div>
  );
};

export default NotFound;
