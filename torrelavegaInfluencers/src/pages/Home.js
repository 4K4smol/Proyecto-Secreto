// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from '../contexts/AuthContext'; // Importa useAuth
import FeaturedInfluencer from '../components/FeaturedInfluencer';
import SecondaryInfluencer from '../components/SecondaryInfluencer';
import Carousel from '../components/Carousel';
import '../styles/home.css';

const Home = () => {
  const [featured, setFeatured] = useState(null);
  const [secondFeatured, setSecondFeatured] = useState(null);
  const [thirdFeatured, setThirdFeatured] = useState(null);
  const [carouselInfluencers, setCarouselInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth(); // Obtén el token del contexto

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:5000/api/influencers", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Usa el token del contexto
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los influencers');
        }
        return response.json();
      })
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
  }, [token]); // Agrega token como dependencia

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div> {/* Puedes usar un spinner aquí */}
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      {featured && <FeaturedInfluencer influencer={featured} />}

      <section className="secondary-featured">
        {secondFeatured && <SecondaryInfluencer influencer={secondFeatured} />}
        {thirdFeatured && <SecondaryInfluencer influencer={thirdFeatured} />}
      </section>

      <Carousel influencers={carouselInfluencers} />
    </div>
  );
};

export default Home;
