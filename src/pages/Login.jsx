import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/slices/authSlice.js";

import api from "../services/api.js";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    try {
      const resposta = await api.post("/tokens", { username, password });
      dispatch(login(resposta.data.user));
      navigate("/carros");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <h1>Login</h1>;
      <form>
        Login
        <input
          type="text"
          placeholder="collector123"
          value={username}
          onChange={setUsername}
        ></input>
        <input
          type="password"
          placeholder="*******"
          value={password}
          onChange={setPassword}
        ></input>
        <button type="submit">Entrar</button>
      </form>
    </>
  );
}

export default Login;
