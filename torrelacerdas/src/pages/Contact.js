// src/pages/Contact.jsx
import React from 'react';
import '../styles/contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h2>Contacto</h2>
      <p>
        Si tienes alguna pregunta o deseas colaborar con nosotros, no dudes en ponerte en contacto.
      </p>
      <form className="contact-form">
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Correo Electrónico:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="message">Mensaje:</label>
        <textarea id="message" name="message" rows="5" required></textarea>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Contact;
