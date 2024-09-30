// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/header.css';
import '../styles/searchBar.css';
import NameSearchBar from './NameSearchBar';

const Header = () => {
  const { logout, username, token } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Actualiza los enlaces en el menú de navegación
  return (
    <header className="header-container">
      <div className="logo">
        <Link to="/home" className="main-title"><span>Promoción</span> Chicas</Link>
      </div>
      <nav className='nav-header'>
        <ul>
          <li><Link to="/home">Inicio</Link></li>
          <li><Link to="/about">Acerca de</Link></li>
          <li><Link to="/contact">Contacto</Link></li>
        </ul>
      </nav>
        <NameSearchBar />
        {token ? (
          <div className="user-controls">
            <span className="username">Bienvenido, {username}</span>
            <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/register">Registrarse</Link>
          </div>
        )}
      
    </header>
  );
};

export default Header;
