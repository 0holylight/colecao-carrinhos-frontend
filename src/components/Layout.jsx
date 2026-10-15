import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import api from "../services/api.js";

function Layout() {
  const user = useSelector((state) => state.auth.user);
  const checked = useSelector((state) => state.auth.checked);

  async function sair() {
    try {
      await api.delete("/tokens");
      window.location.href = "/";
    } catch (e) {
      console.log(e);
      alert("Não foi possível sair. Tente novamente");
    }
  }

  return (
    <>
      <header>
        Coleção de Carrinhos
        {checked &&
          (user ? (
            <>
              <Link to="/carros">Minha coleção</Link>
              <button onClick={sair}>Sair</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Registro</Link>
            </>
          ))}
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
