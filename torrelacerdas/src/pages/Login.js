// src/pages/Login.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('auth-body');

    return () => {
      document.body.classList.remove('auth-body');
    };
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estado para manejar errores
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Iniciar Sesión</h2>
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Ingresa tu correo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Contraseña:</label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <button type="submit" className="auth-button">Iniciar Sesión</button>
      </form>
      
      <p className="register-link">
        ¿No tienes una cuenta? <Link to="/register" className="register-link-text">Regístrate aquí</Link>.
      </p>
    </div>
  );
};

export default Login;
