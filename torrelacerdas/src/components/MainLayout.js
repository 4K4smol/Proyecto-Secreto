// src/layouts/MainLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/mainLayout.css'; // Asegúrate de importar los estilos CSS

const MainLayout = () => {
  const [loading, setLoading] = useState(true);

  // Simularemos un tiempo de carga, puedes reemplazarlo con tu lógica de carga
  useEffect(() => {
    // Aquí puedes manejar la lógica de carga de datos de tu aplicación principal si es necesario
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simula un tiempo de carga de 1 segundo

    return () => clearTimeout(timeout); // Limpiar el timeout al desmontar
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div> {/* Spinner de carga */}
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="main-layout">
      <Header />
      <main>
        <Outlet /> {/* Aquí es donde se renderizan los componentes hijos */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
