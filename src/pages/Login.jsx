import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/slices/authSlice.js";
import { Link } from "react-router-dom";
import "./Auth.css";

import api from "../services/api.js";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    try {
      const resposta = await api.post("/tokens", { username, password });
      dispatch(login(resposta.data.user));
      navigate("/carros", { replace: true });
    } catch (e) {
      console.log(e);
      setErro(
        e?.response?.data?.message ||
          "Ocorreu um erro com o Login, tente novamente em instantes.",
      );
    }
  }

  return (
    <div className="auth">
      <h1>Entrar</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Usuário</label>
        <input
          id="username"
          type="text"
          placeholder="collector123"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {erro && <p className="auth-erro">{erro}</p>}

        <button type="submit" className="btn-primario">Entrar</button>
      </form>

      <p className="auth-rodape">
        Ainda não tem conta? <Link to="/register">Criar conta</Link>
      </p>
    </div>
  );
}

export default Login;
