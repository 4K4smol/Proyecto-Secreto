// src/components/InfluencerCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { BlurhashCanvas } from "react-blurhash";
import '../styles/influencerCard.css';

const InfluencerCard = ({ influencer }) => {
  return (
    <Link to={`/perfil/${influencer.id}`} className="influencer-card">
      <LazyLoad 
        height={400} 
        offset={100} 
        placeholder={
          <BlurhashCanvas 
            hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj" 
            width={300} 
            height={400} 
            punch={1} 
          />
        }
      >
        <img src={influencer.image} alt={`Foto de perfil de ${influencer.name}`} className="profile-image" />
      </LazyLoad>
      <div className="influencer-name">{influencer.name}</div>
    </Link>
  );
};

export default InfluencerCard;
