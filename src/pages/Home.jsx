import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Home.css";

function Home() {
  const user = useSelector((state) => state.auth.user);
  const checked = useSelector((state) => state.auth.checked);


  return (
    <div className="home">
      <section className="home-hero">
        <p className="home-selo">Sua garagem digital</p>
        <h1>Coleção de Carrinhos</h1>
        <p className="home-subtitulo">
          Registre cada carrinho da sua coleção com foto, cor, ano e coleção de
          lançamento. Tudo organizado num lugar só.
        </p>

        <div className="home-acoes">
          {checked && ( user ? (
            <>
              <p className="home-boas-vindas">Boas-vindas de volta, {user.name}!</p>
              <Link to="/carros" className="btn-primario">Minha garagem</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secundario">Entrar</Link>
              <Link to="/register" className="btn-primario">Criar conta</Link>
            </>
          ))}          

        </div>
      </section>

      <section className="home-sobre">
        <h2>Sobre o projeto</h2>
        <p>
          Projeto de portfólio full-stack, construído do zero para praticar o
          que o mercado espera de um desenvolvedor: modelagem de banco, API
          REST, autenticação segura e um front-end organizado.
        </p>

        <ul className="home-stack">
          <li>React</li>
          <li>Redux Toolkit</li>
          <li>Node.js</li>
          <li>Express</li>
          <li>PostgreSQL</li>
          <li>Sequelize</li>
        </ul>

        <ul className="home-destaques">
          <li>Autenticação com JWT em cookie httpOnly</li>
          <li>Proteção contra força bruta no login</li>
          <li>Senhas criptografadas com bcrypt</li>
          <li>Upload de fotos com validação de tipo e tamanho</li>
        </ul>
      </section>
    </div>
  );
}

export default Home;
