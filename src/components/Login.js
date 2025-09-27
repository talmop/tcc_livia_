import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";       // CSS está na mesma pasta do Login.js
import logo from "../icons/logo.png"; // logo está em src/icons


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("Nenhum usuário cadastrado!");
      return;
    }

    if (email === storedUser.email && password === storedUser.password) {
      alert("Login realizado com sucesso!");
      navigate("/map");
    } else {
      alert("E-mail ou senha inválidos!");
    }
  };

  return (
    <div className="login">
      <img src={logo} alt="ecoRefil" className="login__logo" />

      <div className="login__form">
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
        <button onClick={handleLogin} className="login__btn">
          ENTRAR
        </button>
        <a href="/forgot" className="login__forgot">
          Esqueci minha senha
        </a>
      </div>

      <div className="login__footer">
        <p>
          Não tem uma conta? <a href="/signup">Cadastre-se agora!</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
