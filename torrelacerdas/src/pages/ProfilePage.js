import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import "../styles/profilePage.css"; // Importar estilos específicos para el perfil
import "@fortawesome/fontawesome-free/css/all.min.css";

const ProfilePage = () => {
  const { id } = useParams();
  const [influencer, setInfluencer] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInfluencer = async () => {
      try {
        console.log(`Fetching influencer with ID: ${id}`);
        const response = await axiosInstance.get(`/influencers/id/${id}`);
        console.log("Datos recibidos del servidor:", response.data);
        setInfluencer(response.data);
      } catch (err) {
        console.error("Error al obtener el influencer:", err);
        setError(err.response?.data?.error || err.message);
      }
    };

    fetchInfluencer();
  }, [id]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!influencer) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={influencer.image}
            alt={influencer.name}
            className="profile-picture-large"
          />
          <h1 className="profile-name">{influencer.name}</h1>
          <p className="profile-bio">{influencer.bio}</p>
        </div>
        <div className="profile-content">
          <h3>Redes Sociales</h3>
          <div className="social-links">
            {influencer.instagram ? (
              <a href={influencer.instagram} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram social-icon"></i> Instagram
              </a>
            ) : (
              <p>Instagram no disponible</p>
            )}

            {influencer.twitter ? (
              <a href={influencer.twitter} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter social-icon"></i> Twitter
              </a>
            ) : (
              <p>Twitter no disponible</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
