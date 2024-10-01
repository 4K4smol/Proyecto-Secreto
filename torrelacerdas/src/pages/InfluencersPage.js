import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/influencersPage.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function InfluencersPage() {
  const query = useQuery();
  const municipioId = query.get('municipio_id');
  const [municipioName, setMunicipioName] = useState('');
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!municipioId) {
      setError('ID de municipio no proporcionado.');
      setLoading(false);
      return;
    }

    // Obtener el nombre del municipio
    fetch(`http://localhost:5000/api/municipios/${municipioId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener el municipio');
        }
        return response.json();
      })
      .then(data => {
        console.log('Datos del municipio:', data);
        setMunicipioName(data.nombre || data.name);
      })
      .catch(err => {
        console.error('Error al obtener el municipio:', err);
        setMunicipioName('Desconocido');
        setError('No se pudo obtener la información del municipio.');
        setLoading(false);
      });

    // Obtener las influencers
    fetch(`http://localhost:5000/api/influencers/municipio/${municipioId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener las influencers');
        }
        return response.json();
      })
      .then(data => {
        console.log('Datos de influencers:', data);
        setInfluencers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al obtener las influencers:', err);
        setError('No se pudo obtener la lista de influencers.');
        setLoading(false);
      });
  }, [municipioId]);

  if (loading) {
    return <div className="loading-spinner">Cargando influencers...</div>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="influencers-page">
      <header className="header">
        <h1 className="municipio-title">Influencers de {municipioName}</h1>
        <Link to="/map" className="back-to-map">← Volver al Mapa</Link>
      </header>
      <main className="content">
        {influencers.length === 0 ? (
          <p className="no-influencers">No hay influencers en este municipio.</p>
        ) : (
          <div className="influencers-grid">
            {influencers.map(influencer => (
              <div key={influencer.id} className="influencer-card">
                <div className="card-header">
                  <img
                    src={influencer.image}
                    alt={influencer.name}
                    className="influencer-image"
                    loading="lazy"
                    onError={(e) => (e.target.src = 'default-image.jpg')}
                  />
                </div>
                <div className="card-body">
                  <h3 className="influencer-name">{influencer.name}</h3>
                  <p className="influencer-bio">{influencer.bio}</p>
                </div>
                <div className="card-footer">
                  <div className="influencer-links">
                    {influencer.instagram && (
                      <a href={influencer.instagram} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i> Instagram
                      </a>
                    )}
                    {influencer.twitter && (
                      <a href={influencer.twitter} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i> Twitter
                      </a>
                    )}
                    {/* Añadir otros enlaces si es necesario */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default InfluencersPage;
