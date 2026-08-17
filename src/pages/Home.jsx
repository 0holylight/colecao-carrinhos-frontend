import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <h1> Coleção de Carrinhos </h1>
      <p>
        {' '}
        Esse app foi idealizado por mim, com o objetivo de demonstrar minhas
        habilidades como programador. Nele, tentei desenvolver as estruturas que
        mais são desejadas pelo mercado de trabalho de desenvolvedores, como
        Construção de Banco de Dados, criação e execução de uma API-REST, além
        de uma boa estrutura de front-end, prezando por um bom visual,
        velocidade e primordialmente segurança, com as ferramentas de dentro do
        meu alcance.
      </p>
      <Link to="/login"> Entrar </Link>
      <Link to="/register"> Criar conta</Link>
    </>
  );
}

export default Home;
