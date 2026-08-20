import { Outlet, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../services/api.js';

function ProtectedRoute() {
  const [check, setCheck] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    async function verificarLogin() {
      try {
        await api.get('/carros');
        setAuth(true);
      } catch (e) {
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
