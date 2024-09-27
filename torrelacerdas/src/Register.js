import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "./estilos/auth.css"; // Importar el archivo CSS de estilos

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const { login, user } = useContext(AuthContext); // Importa la función login del AuthContext
  const navigate = useNavigate();

  // Si el usuario ya está autenticado, redirigir a la página principal
  if (user) {
    navigate('/influencers');
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === "Usuario registrado con éxito") {
          // Si el registro es exitoso, llama a la función login y redirige
          login(formData.username); // Llama a la función login del contexto para autenticar al usuario
          navigate('/influencers'); // Redirige a la página de influencers
        } else {
          alert(data.message); // Muestra el mensaje de error si el registro falla
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="auth-form">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Nombre de usuario" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
