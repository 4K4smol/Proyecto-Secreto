// src/pages/About.jsx
import React from 'react';
import '../styles/about.css';

const About = () => {
  return (
    <div className="about-container">
      <h2>Acerca de TORRE LAS CERDAS</h2>
      <p>
        TORRE LAS CERDAS es una plataforma que nace con la misión de destacar y promover a mujeres talentosas e inspiradoras de Cantabria. Nuestro objetivo es crear un espacio donde las chicas de la región puedan mostrar sus talentos, habilidades y logros, y así recibir el reconocimiento que merecen.
      </p>
      <p>
        Ya sea en el ámbito de la moda, la tecnología, la música, el arte, el deporte o cualquier otra disciplina, en TORRE LAS CERDAS creemos que cada chica tiene una historia única que merece ser contada. Nos esforzamos por ofrecer una plataforma que celebre la diversidad y el empoderamiento femenino, ayudando a nuestras influencers a conectar con una audiencia más amplia.
      </p>
      <p>
        Trabajamos día a día para proporcionar a nuestras chicas las herramientas y recursos necesarios para destacar en sus respectivas áreas. A través de perfiles detallados, contenido interactivo y una comunidad comprometida, buscamos inspirar y motivar a otras mujeres a seguir sus sueños y alcanzar sus metas.
      </p>
      <p>
        Además de promover a nuestras influencers, también organizamos eventos, talleres y colaboraciones con marcas y empresas locales para brindar oportunidades de crecimiento y visibilidad a nuestras chicas.
      </p>
      <p>
        Si quieres saber más sobre cómo unirte a nuestra comunidad o cómo colaborar con nosotras, no dudes en <a className="a" href="/contact">ponerte en contacto</a>. ¡Gracias por ser parte de esta aventura de empoderamiento y visibilidad para las mujeres de Cantabria!
      </p>
    </div>
  );
};

export default About;
