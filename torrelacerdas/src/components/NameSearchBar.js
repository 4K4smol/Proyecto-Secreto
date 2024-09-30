// src/components/NameSearchBar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NameSearchBar = () => {
  const [nameQuery, setNameQuery] = useState('');
  const navigate = useNavigate();

  const handleNameSearch = async (e) => {
    e.preventDefault();
    if (nameQuery.trim()) {
      try {
        const response = await fetch(`http://localhost:5000/api/influencers/search?q=${encodeURIComponent(nameQuery.trim())}`);
        if (response.status === 404) {
          alert('No se encontró a la chica con ese nombre.');
          return;
        }

        const data = await response.json();
        if (data && data.id) {
          navigate(`/perfil/${data.id}`); // Actualiza la ruta
        } else {
          alert('No se encontró a la chica con ese nombre.');
        }
      } catch (error) {
        console.error("Error al buscar influencer por nombre:", error);
      }
      setNameQuery('');
    }
  };

  return (
    <form onSubmit={handleNameSearch} className="name-search-form">
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={nameQuery}
        onChange={(e) => setNameQuery(e.target.value)}
        aria-label="Buscar por nombre"
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default NameSearchBar;
