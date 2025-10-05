import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
  Polyline,
} from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import Ratings from "./Ratings";
import "leaflet/dist/leaflet.css";
import "./Map.css";

import iconProfile from "../icons/icon_perfil.png";
import iconMap from "../icons/icon_mapa.png";
import locationIcon from "../icons/icon_localizacao.png";

// 🧭 Ícones personalizados
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const pointIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// 📍 Botão "Minha Localização"
function FlyToUser({ position }) {
  const map = useMap();
  const handleClick = () => {
    if (position) map.setView(position, 15);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1000,
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        border: "none",
        backgroundColor: "#4CAF50",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
      }}
      title="Minha Localização"
    >
      <img src={locationIcon} alt="Localização" style={{ width: 24, height: 24 }} />
    </button>
  );
}

// 🗺️ Recentraliza o mapa automaticamente ao obter a localização
function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView([position.lat, position.lng], 15);
    }
  }, [position, map]);
  return null;
}

// ➕ Captura duplo clique e adiciona ponto
function AddPoint({ onAddPoint }) {
  useMapEvents({
    dblclick(e) {
      const name = prompt("Digite o nome do ponto:");
      if (!name) return;

      const newPoint = {
        id: Date.now(),
        name,
        coords: [e.latlng.lat, e.latlng.lng],
        reviews: [],
      };
      onAddPoint(newPoint);
    },
  });
  return null;
}

function Map() {
  const [points, setPoints] = useState([]);
  const [userPosition, setUserPosition] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);

  // 🔑 Chave da API ORS (verifique se está no .env)
  const ORS_API_KEY = process.env.REACT_APP_ORS_API_KEY;
  console.log("🔑 Chave ORS_API_KEY:", ORS_API_KEY);

  // Carregar pontos do localStorage
  useEffect(() => {
    const savedPoints = JSON.parse(localStorage.getItem("points") || "[]");
    setPoints(savedPoints);
  }, []);

  const savePoints = (newPoints) => {
    localStorage.setItem("points", JSON.stringify(newPoints));
  };

  // 📍 Obter localização do usuário com alta precisão
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const position = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        console.log("📍 Localização do usuário (alta precisão):", position);
        setUserPosition(position);
      },
      (err) => console.error("Erro ao obter localização:", err),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  // ⭐ Adicionar avaliação
  const handleAddReview = (pointId, review) => {
    const updatedPoints = points.map((p) =>
      p.id === pointId ? { ...p, reviews: [...(p.reviews || []), review] } : p
    );
    setPoints(updatedPoints);
    savePoints(updatedPoints);
  };

  // ➕ Adicionar novo ponto
  const handleAddPoint = (newPoint) => {
    const updatedPoints = [...points, newPoint];
    setPoints(updatedPoints);
    savePoints(updatedPoints);
  };

  // 🚗 Traçar rota usando OpenRouteService
  const handleRoute = async (destination) => {
    if (!userPosition) {
      console.warn("⚠️ Localização do usuário não disponível!");
      return;
    }

    const start = [userPosition.lng, userPosition.lat]; // ORS usa [lng, lat]
    const end = [destination[1], destination[0]];

    try {
      const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${start[0]},${start[1]}&end=${end[0]},${end[1]}`;
      console.log("🌐 Requisição:", url);

      const response = await fetch(url);
      const data = await response.json();

      if (!data.features || data.features.length === 0) {
        console.error("❌ Nenhuma rota encontrada:", data);
        return;
      }

      const coords = data.features[0].geometry.coordinates.map((c) => [c[1], c[0]]);
      setRouteCoords(coords);
    } catch (error) {
      console.error("🚨 Erro ao buscar rota:", error);
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <h1>ecoRefil</h1>
      <p>🖱️ Dê um duplo clique no mapa para adicionar um ponto.</p>
      <p>🗺️ Clique no botão do ponto para traçar rota até ele.</p>

      <MapContainer
        center={userPosition || [-15.78, -47.93]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
        doubleClickZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userPosition && <RecenterMap position={userPosition} />}
        {userPosition && <FlyToUser position={userPosition} />}

        {userPosition && (
          <Marker position={userPosition} icon={userIcon}>
            <Popup>
              <h2>📍 Você está aqui</h2>
            </Popup>
          </Marker>
        )}

        {points.map((ponto) => (
          <Marker key={ponto.id} position={ponto.coords} icon={pointIcon}>
            <Popup>
              <h2>{ponto.name}</h2>
              <Ratings point={ponto} onSubmit={handleAddReview} />
              {ponto.reviews && ponto.reviews.length > 0 && (
                <h4>
                  Média:{" "}
                  {(
                    ponto.reviews.reduce((sum, r) => sum + r.stars, 0) /
                    ponto.reviews.length
                  ).toFixed(1)}{" "}
                  ⭐
                </h4>
              )}
              {userPosition && (
                <button
                  style={{
                    marginTop: 5,
                    padding: "5px 10px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: 5,
                    cursor: "pointer",
                  }}
                  onClick={() => handleRoute(ponto.coords)}
                >
                  Ir até este ponto
                </button>
              )}
            </Popup>
          </Marker>
        ))}

        <AddPoint onAddPoint={handleAddPoint} />

        {routeCoords.length > 0 && (
          <Polyline positions={routeCoords} color="blue" weight={5} />
        )}
      </MapContainer>

      <footer className="footer-nav">
        <Link to="/profile" className="footer-icon">
          <img src={iconProfile} alt="Profile" />
        </Link>
        <div className="divider"></div>
        <Link to="/map" className="footer-icon">
          <img src={iconMap} alt="Map" />
        </Link>
      </footer>
    </div>
  );
}

export default Map;
