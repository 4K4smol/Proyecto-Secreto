// src/components/SearchBar.jsx
import React, { useState } from 'react';
import '../styles/searchBar.css';

const SearchBar = ({ onSearchByName }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearchByName(query.trim());
      setQuery(''); // Limpiar la barra de búsqueda después de la búsqueda
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit} aria-label="Formulario de búsqueda por nombre">
      <input 
        type="text" 
        placeholder="Buscar chicas..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        aria-label="Buscar chicas por nombre"
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default SearchBar;
