// src/components/SecondaryInfluencer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { BlurhashCanvas } from "react-blurhash";
import '../styles/secondaryInfluencer.css';

const SecondaryInfluencer = ({ influencer }) => {
  return (
    <div className="secondary-influencer">
      <div className="featured-image">
        <LazyLoad 
          height={200} 
          offset={100} 
          placeholder={
            <BlurhashCanvas 
              hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj" 
              width={200} 
              height={200} 
              punch={1} 
            />
          }
        >
          <img 
            src={influencer.image} 
            alt={`Foto de perfil de ${influencer.name}`} 
            loading="lazy" // Añadido para optimización
          />
        </LazyLoad>
      </div>
      <div className="featured-info">
        <h3 className="featured-name">{influencer.name}</h3>
        <p className="featured-bio">{influencer.bio}</p>
        <Link to={`/perfil/${influencer.id}`} className="follow-btn">Ver Perfil</Link>
      </div>
    </div>
  );
};

export default SecondaryInfluencer;
