import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import logo from "../icons/logo.png";
import bottleIcon from "../icons/icon_garrafa.png";
import iconProfile from "../icons/icon_perfil.png";
import iconMap from "../icons/icon_mapa.png";

function Profile({ user }) {
  // Inicializa o contador do localStorage, ou usa user.refills, ou 0
  const [refills, setRefills] = useState(() => {
    const saved = localStorage.getItem("refills");
    return saved !== null ? parseInt(saved, 10) : user?.refills ?? 0;
  });

  // Salva o contador no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("refills", refills);
  }, [refills]);

  // Função que incrementa o contador
  const handleRefill = () => {
    setRefills(refills + 1);
  };

  return (
    <div className="profile-container">
      {/* Logo no topo */}
      <img src={logo} alt="ecoRefil" className="logo-img" />

      {/* Card central */}
      <div className="card">
        <p className="subtitle">Você já reciclou:</p>
        <div className="stats">
          <img src={bottleIcon} alt="garrafa" className="bottle" />
          <span className="count">{refills}</span>
          <span className="unit">garrafas</span>
        </div>
      </div>

      {/* Botão que aumenta o contador */}
      <button className="refill-btn" onClick={handleRefill}>
        FIZ UM REFIL!
      </button>

      {/* Rodapé fixo com ícones para navegação */}
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

export default Profile;
