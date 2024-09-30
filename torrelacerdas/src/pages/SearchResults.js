import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import InfluencerCard from '../components/InfluencerCard';
import '../styles/searchResults.css';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const query = useQuery();
  const searchTerm = query.get('q') || ''; // El término de búsqueda para el nombre de la chica
  const locationFilter = query.get('location') || ''; // El filtro del municipio (usando 'location')

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        // Construir la URL para la consulta
        const url = new URL('http://localhost:5000/api/influencers/search');
        
        if (searchTerm) {
          url.searchParams.append('q', searchTerm); // Añade el parámetro 'q' si está presente
        }

        if (locationFilter) {
          url.searchParams.append('location', locationFilter); // Añade el parámetro 'location' si está presente
        }

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${localStorage.getItem('token')}` // Descomentar si se requiere autenticación
          }
        });

        if (!response.ok) {
          throw new Error(`Error HTTP! estado: ${response.status}`);
        }

        const data = await response.json();
        setResults(data);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError('No se pudieron cargar los resultados de búsqueda.');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchTerm, locationFilter]);

  return (
    <div className="search-results-page">
      <div className="search-results-container">
        <h2>Resultados de la Búsqueda</h2>
        {loading ? (
          <div className="loading-container">
            <p>Cargando resultados...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
          </div>
        ) : results.length > 0 ? (
          <div className="results-grid">
            {results.map(influencer => (
              <InfluencerCard key={influencer.id} influencer={influencer} />
            ))}
          </div>
        ) : (
          <p>No se encontraron perfiles que coincidan con tu búsqueda.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
