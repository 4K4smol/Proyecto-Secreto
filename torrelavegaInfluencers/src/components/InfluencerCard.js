// src/components/InfluencerCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { BlurhashCanvas } from "react-blurhash";
import '../styles/influencerCard.css';

const InfluencerCard = ({ influencer }) => {
  return (
    <div className="custom-influencer-card">
      <LazyLoad 
        height={130} 
        offset={100} 
        placeholder={
          <BlurhashCanvas 
            hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj" 
            width={130} 
            height={130} 
            punch={1} 
          />
        }
      >
        <img src={influencer.image} alt={`Foto de perfil de ${influencer.name}`} className="custom-profile-image" />
      </LazyLoad>
      <div className="custom-card-content">
        <div className="custom-influencer-name">{influencer.name}</div>
        <div className="custom-influencer-bio">{influencer.bio}</div>
        <Link to={`/perfil/${influencer.id}`} className="custom-ver-perfil">
          VER PERFIL
        </Link>
      </div>
    </div>
  );
};

export default InfluencerCard;
