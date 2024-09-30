// src/components/Carousel.jsx
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { BlurhashCanvas } from "react-blurhash";
import '../styles/carousel.css';

const Carousel = ({ influencers }) => {
  const carouselRef = useRef(null);

  // Refs para manejar eventos de arrastre
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftAtStart = useRef(0);

  const handleMouseDown = (e) => {
    e.preventDefault();
    isDown.current = true;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftAtStart.current = carouselRef.current.scrollLeft;
    carouselRef.current.classList.add('active');
  };

  const handleTouchStart = (e) => {
    isDown.current = true;
    startX.current = e.touches[0].pageX - carouselRef.current.offsetLeft;
    scrollLeftAtStart.current = carouselRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    carouselRef.current.classList.remove('active');
  };

  const handleMouseUp = () => {
    isDown.current = false;
    carouselRef.current.classList.remove('active');
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return; 
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; 
    carouselRef.current.scrollLeft = scrollLeftAtStart.current - walk;
  };

  const handleTouchMove = (e) => {
    if (!isDown.current) return; 
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; 
    carouselRef.current.scrollLeft = scrollLeftAtStart.current - walk;
  };

  return (
    <div className="carousel-container">
      <h2>Otras Influencers Destacadas</h2>
      <section 
        className="influencers-carousel"
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleTouchMove}
        aria-label="Carrusel de influencers"
      >
        <div className="carousel-wrapper">
          {influencers.map((influencer) => (
            <Link to={`/perfil/${influencer.id}`} key={influencer.id} className="influencer-card">
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
          ))}
        </div>
      </section>
    </div>
  );
};

export default Carousel;
