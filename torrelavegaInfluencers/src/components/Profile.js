import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../estilos/profile.css"; // Importar estilos específicos para el perfil
import "@fortawesome/fontawesome-free/css/all.min.css";


const Profile = () => {
  const { id } = useParams();
  const [influencer, setInfluencer] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/influencers/${id}`)
      .then((response) => response.json())
      .then((data) => setInfluencer(data))
      .catch((error) => console.error("Error fetching influencer:", error));
  }, [id]);

  if (!influencer) {
    return <h2>Cargando perfil...</h2>;
  }

  const { socialLinks } = influencer;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-header">
          <img src={influencer.image} alt={influencer.name} className="profile-picture-large" />
          <h1 className="profile-name">{influencer.name}</h1>
          <p className="profile-bio">{influencer.bio}</p>
        </div>
        <div className="profile-content">
          <h3>Redes Sociales</h3>
          <div className="social-links">
            {socialLinks?.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram social-icon"></i>
              </a>
            )}
            {socialLinks?.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter social-icon"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
