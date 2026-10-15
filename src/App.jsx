import Carros from "./pages/Carros.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Layout from "./components/Layout.jsx";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "./services/api.js";
import { login, logout } from "./store/slices/authSlice.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function verificarLogin() {
      try {
        const resposta = await api.get("/usuarios/me");
        dispatch(login(resposta.data.user));
      } catch (e) {
        console.log(e);
        dispatch(logout());
      }
    }
    verificarLogin();
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/carros" element={<Carros />} />
          </Route>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
