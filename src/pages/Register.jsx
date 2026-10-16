import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../store/slices/authSlice.js";
import "./Auth.css";

import api from "../services/api.js";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [erro, setErro] = useState("");
  const [erroSenha, setErroSenha] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setErroSenha("");
    if (password !== confirmPassword) {
      setErroSenha("As senhas não coincidem");
      console.log("As senhas não coincidem.");
      return;
    }
    try {
      const resposta = await api.post("/usuarios", {
        name,
        username,
        password,
      });
      dispatch(login(resposta.data.user));
      navigate("/carros", { replace: true });
      console.log("Usuário registrado com sucesso! Boas vindas à sua coleção!");
    } catch (e) {
      console.log(e);
      setErro(
        e?.response?.data?.message ||
          "Há algum erro no seu formulário de registro, tente novamente em instantes.",
      );
    }
  }

  return (
    <div className="auth">
      <h1>Criar conta</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          type="text"
          placeholder="Gabriel"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="username">Usuário</label>
        <input
          id="username"
          type="text"
          placeholder="gabrielgpop"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          placeholder="Mínimo de 8 caracteres"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="confirmPassword">Confirmar senha</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Repita a senha"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {erroSenha && <p className="auth-erro">{erroSenha}</p>}
        {erro && <p className="auth-erro">{erro}</p>}

        <button type="submit" className="btn-primario">
          Criar conta
        </button>
      </form>

      <p className="auth-rodape">
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </div>
  );
}

export default Register;
