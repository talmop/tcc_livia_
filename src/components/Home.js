import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import logo from "../icons/logo.png";      // ajuste o caminho conforme seu projeto
import bottle from "../icons/garrafa.png"; // ajuste o caminho conforme seu projeto

function Home() {
  const navigate = useNavigate();

  return (
    <main className="home">
      <header className="home__header">
        <img src={logo} alt="ecoRefil" className="home__logo" />
      </header>

      <section className="home__hero">
        <div className="home__bottle-wrapper">
          <img src={bottle} alt="garrafa" className="home__bottle" />
          <div className="home__drop-overlay" aria-hidden="true" />
        </div>
      </section>

      <section className="home__cta">
        <h2 className="home__title">Comece a reciclar!</h2>
        <button
          className="home__btn"
          onClick={() => navigate("/login")}
          aria-label="Acessar"
        >
          ACESSAR
        </button>
      </section>
    </main>
  );
}

export default Home;
