import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Layout.css";

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
      <header className="cabecalho">
        <Link to="/" className="marca">
          Coleção de Carrinhos
        </Link>
        {checked && (
          <nav className="nav">
            {user ? (
              <>
                <Link to="/carros">Minha coleção</Link>
                <button className="btn-secundario" onClick={sair}>
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Entrar</Link>
                <Link to="/register" className="btn-primario">
                  Criar conta
                </Link>
              </>
            )}
          </nav>
        )}
      </header>
      <main className="conteudo">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
