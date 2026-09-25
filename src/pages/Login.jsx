import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/slices/authSlice.js";

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
      navigate("/carros");
    } catch (e) {
      console.log(e);
      setErro("Usuário ou senha incorretos.");
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        Login
        <input
          type="text"
          placeholder="collector123"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="*******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Entrar</button>
        {erro && <p>{erro}</p>}
      </form>
    </>
  );
}

export default Login;
