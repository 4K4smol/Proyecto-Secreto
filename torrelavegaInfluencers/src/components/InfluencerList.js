import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../estilos/styles.css";
import LazyLoad from 'react-lazyload';
import { BlurhashCanvas } from "react-blurhash";

const InfluencerList = () => {
  const [featured, setFeatured] = useState(null);
  const [secondFeatured, setSecondFeatured] = useState(null);
  const [thirdFeatured, setThirdFeatured] = useState(null);
  const [carouselInfluencers, setCarouselInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null); 

  // Refs para manejar eventos de arrastre
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftAtStart = useRef(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/influencers", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setFeatured(data[0]); // Primer influencer destacado
        }
        if (data.length > 1) {
          setSecondFeatured(data[1]); // Segundo influencer destacado
        }
        if (data.length > 2) {
          setThirdFeatured(data[2]); // Tercer influencer destacado
        }
        if (data.length > 3) {
          setCarouselInfluencers(data.slice(3, 28)); // Siguientes 25 influencers
        }
        setLoading(false); 
      })
      .catch(error => {
        console.error("Error fetching influencers:", error);
        setLoading(false); 
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Cargando...</p>
      </div>
    );
  }

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
    <div className="influencer-list-container">
      <header className="header">
        <h1 className="main-title">TORRE <span>LAS CERDAS</span></h1>
      </header>

      {featured && (
        <section className="featured-influencer">
          <div className="featured-image">
            <img src={featured.image} alt={featured.name} />
          </div>
          <div className="featured-info">
            <h2 className="featured-name">{featured.name}</h2>
            <p className="featured-bio">{featured.bio}</p>
            <Link to={`/perfil/${featured.id}`} className="follow-btn">Ver Perfil</Link>
          </div>
        </section>
      )}

            {/* Sección para el segundo y tercer influencers destacados */}
      <section className="secondary-featured">
        {secondFeatured && (
          <div className="secondary-influencer">
            <div className="featured-image">
              <img src={secondFeatured.image} alt={secondFeatured.name} />
            </div>
            <div className="featured-info">
              <h2 className="featured-name">{secondFeatured.name}</h2>
              <p className="featured-bio">{secondFeatured.bio}</p>
              <Link to={`/perfil/${secondFeatured.id}`} className="follow-btn">Ver Perfil</Link>
            </div>
          </div>
        )}
        {thirdFeatured && (
          <div className="secondary-influencer">
            <div className="featured-image">
              <img src={thirdFeatured.image} alt={thirdFeatured.name} />
            </div>
            <div className="featured-info">
              <h2 className="featured-name">{thirdFeatured.name}</h2>
              <p className="featured-bio">{thirdFeatured.bio}</p>
              <Link to={`/perfil/${thirdFeatured.id}`} className="follow-btn">Ver Perfil</Link>
            </div>
          </div>
        )}
      </section>

      {/* Carrusel de influencers */}
      <div className="carousel-container">
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
        >
          <div className="carousel-wrapper">
            {carouselInfluencers.map((influencer) => (
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
                  }>
                  <img src={influencer.image} alt={influencer.name} className="profile-image" />
                </LazyLoad>
                <h3 className="influencer-name">{influencer.name}</h3>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default InfluencerList;
