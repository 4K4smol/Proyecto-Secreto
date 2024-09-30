// src/components/Footer.jsx
import React from 'react';
import '../styles/footer.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} TORRE LAS CERDAS. Todos los derechos reservados.</p>
      <div className="social-links">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
