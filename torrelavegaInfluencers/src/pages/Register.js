// src/pages/Register.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('auth-body');
    
    return () => {
      document.body.classList.remove('auth-body');
    };
  }, []);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estado para manejar errores
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(username, email, password);
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Error al registrar. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Registro</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Ingresa tu nombre de usuario"
          />
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Ingresa tu correo"
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Ingresa tu contraseña"
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
      <p>
        ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión aquí</Link>.
      </p>
    </div>
  );
};

export default Register;
