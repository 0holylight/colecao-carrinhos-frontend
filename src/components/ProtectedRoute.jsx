import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice.js";

import api from "../services/api.js";

function ProtectedRoute() {
  const dispatch = useDispatch();

  const [check, setCheck] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    async function verificarLogin() {
      try {
        const resposta = await api.get("/usuarios/me");
        setAuth(true);
        dispatch(login(resposta.data.user));
      } catch (e) {
        console.log(e);
        setAuth(false);
      } finally {
        setCheck(false);
      }
    }

    verificarLogin();
  }, []);

  if (check) {
    return <p>Carregando...</p>;
  }

  return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
