// src/pages/MapPage.js
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import '../styles/mapPage.css';

// Configurar un icono transparente para asegurar que no haya marcadores visibles
L.Marker.prototype.options.icon = L.divIcon({ className: 'leaflet-empty-icon' });

function MapPage() {
  const [geoData, setGeoData] = useState(null);
  const geojsonRef = useRef(); 
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar el GeoJSON desde el backend o desde el frontend
    axios.get('/cantabriaID.geojson')
      .then(response => {
        setGeoData(response.data);
      })
      .catch(error => {
        console.error('Error al cargar el GeoJSON:', error);
      });
  }, []);

  const onEachFeature = (feature, layer) => {
    const municipioName = feature.properties.nombre || feature.properties.name;
    const municipioId = feature.properties.id;

    if (municipioName) {
        // Agregar un tooltip que se mostrará al pasar el ratón por encima del municipio
        layer.bindTooltip(municipioName, {
            permanent: false, 
            direction: 'top',
            className: 'municipio-tooltip' // Clase CSS personalizada para el estilo
        });
    }

    layer.on({
        click: () => {
            navigate(`/influencers?municipio_id=${municipioId}`);
        },
        mouseover: (e) => {
            const targetLayer = e.target;
            if (targetLayer && targetLayer.setStyle && targetLayer.bringToFront) {
                targetLayer.setStyle({
                    weight: 3,
                    color: '#666',
                    fillOpacity: 0.7,
                    fillColor: '#FF5733',
                });
                targetLayer.bringToFront();
                targetLayer.openTooltip(); // Mostrar el tooltip al pasar el ratón
            }
        },
        mouseout: (e) => {
            const targetLayer = e.target;
            if (targetLayer && geojsonRef.current && geojsonRef.current.resetStyle) {
                geojsonRef.current.resetStyle(targetLayer);
                targetLayer.closeTooltip(); // Ocultar el tooltip al quitar el ratón
            }
        },
    });
};

  return (
    <div className="map-page-container">
      <h1 className="map-title">Mapa Interactivo de Influencers en Cantabria</h1>
      <div className="map-wrapper">
        <MapContainer center={[43.1828, -3.9143]} zoom={9.4} className="leaflet-map-container">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {geoData && (
            <GeoJSON
              data={geoData}
              onEachFeature={onEachFeature}
              style={() => ({
                color: '#3388ff',
                weight: 2,
                fillOpacity: 0.4,
                fillColor: '#6c757d',
              })}
              ref={geojsonRef}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
  
}

export default MapPage;
