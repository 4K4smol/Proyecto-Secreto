import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "./estilos/auth.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          // Guarda el token y el nombre de usuario en localStorage
          localStorage.setItem('token', data.token);
          login(data.username);
          navigate('/influencers'); // Redirige a la página de influencers después del inicio de sesión
        } else {
          alert(data.message);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="auth-form">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>¿No tienes una cuenta?</p>
      <button onClick={() => navigate('/register')}>Regístrate</button>
    </div>
  );
};

export default Login;
