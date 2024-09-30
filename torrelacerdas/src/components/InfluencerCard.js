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
        height={200} 
        offset={100} 
        placeholder={
          <BlurhashCanvas 
            hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj" 
            width={200} 
            height={300} 
            punch={1} 
          />
        }
      >
        <img src={influencer.image} alt={`Foto de perfil de ${influencer.name}`} className="profile-image" />
      </LazyLoad>
      <h3 className="influencer-name">{influencer.name}</h3>
    </Link>
  );
};

export default InfluencerCard;
