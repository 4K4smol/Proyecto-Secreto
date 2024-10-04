// src/pages/Contact.jsx
import React from 'react';
import '../styles/contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
    <div className="contact-container">
      <h2>CONTACTO</h2>
      <p>Si tienes alguna pregunta o deseas colaborar con nosotros, no dudes en ponerte en contacto.</p>
      <form className="contact-form">
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" placeholder="Tu nombre" required />
  
        <label htmlFor="email">Correo Electrónico:</label>
        <input type="email" id="email" placeholder="Tu correo electrónico" required />
  
        <label htmlFor="message">Mensaje:</label>
        <textarea id="message" placeholder="Tu mensaje" required></textarea>
  
        <button type="submit">Enviar</button>
      </form>
    </div>
  </div>
  );
};

export default Contact;
