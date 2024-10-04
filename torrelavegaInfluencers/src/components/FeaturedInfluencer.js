// src/components/FeaturedInfluencer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { BlurhashCanvas } from "react-blurhash";
import '../styles/featuredInfluencer.css';

const FeaturedInfluencer = ({ influencer }) => {

  return (
    <section className="featured-influencer">
      <div className="featured-image">
        <LazyLoad 
          height={300} 
          offset={100} 
          placeholder={
            <BlurhashCanvas 
              hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj" 
              width={300} 
              height={300} 
              punch={1} 
            />
          }
        >
          <img src={influencer.image} alt={`Foto de perfil de ${influencer.name}`} />
        </LazyLoad>
      </div>
      <div className="featured-info">
        <h2 className="featured-name">{influencer.name}</h2>
        <p className="featured-bio">{influencer.bio}</p>
        <Link to={`/perfil/${influencer.id}`} className="follow-btn">Ver Perfil</Link>
      </div>
    </section>
  );
};

export default FeaturedInfluencer;
