// src/components/Footer.jsx
import React from 'react';
import '../styles/footer.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} TORRE LAS CERDAS. Todos los derechos reservados.</p>
      <div className="social-links">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">TW</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
        {/* Añade más enlaces según necesidad */}
      </div>
    </footer>
  );
};

export default Footer;
