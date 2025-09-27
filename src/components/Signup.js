import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";               // porque Signup.js e Login.css estão na mesma pasta
import logo from "../icons/logo.png";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!username || !email || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    // Salva no localStorage
    const user = { username, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Cadastro realizado com sucesso!");
    navigate("/login"); // redireciona para login
  };

  return (
    <div className="login">
      <img src={logo} alt="ecoRefil" className="login__logo" />

      <div className="login__form">
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login__input"
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login__input"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login__input"
        />
        <button onClick={handleSignup} className="login__btn">
          CADASTRAR
        </button>
      </div>

      <div className="login__footer">
        <p>
          Já tem uma conta? <a href="/login">Entrar agora</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
