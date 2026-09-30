/* Pensamentos sobre esse documento:
Imports: useState com certeza, Dispatch com certeza, Navigate com certeza, 
login me tá fazendo pensar, porque ao registrar eu posso proceder o login

api com certeza

*/

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/slices/authSlice.js";

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
      navigate("/carros");
      console.log("Usuário registrado com sucesso! Boas vindas à sua coleção!");
    } catch (e) {
      console.log(e);
      setErro(e?.response?.data?.message || "Mensagem");
    }
  }

  return (
    <>
      <h1>Formulário de Registro</h1>
      <form onSubmit={handleSubmit}>
        Registre-se!
        <input
          type="text"
          placeholder="Gabriel"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="gabrielgpop"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Insira uma senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Repita a senha inserida"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></input>
        {erroSenha && <p>{erroSenha}</p>}
        <button type="submit">Registrar</button>
        {erro && <p>{erro}</p>}
      </form>
    </>
  );
}

export default Register;
