// src/components/Carousel.jsx
import React, { useRef } from 'react';
import InfluencerCard from './InfluencerCard'; // Importamos el componente
import '../styles/carousel.css';
import '../styles/influencerCard.css';

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

  // Funciones para manejar el scroll con los botones
  const handleScrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="carousel-container">
      <h2>Otras Influencers Destacadas</h2>
      <button className="carousel-button left" onClick={handleScrollLeft}>&lt;</button>
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
            <InfluencerCard influencer={influencer} key={influencer.id} />
          ))}
        </div>
      </section>
      <button className="carousel-button right" onClick={handleScrollRight}>&gt;</button>
    </div>
  );
};

export default Carousel;
