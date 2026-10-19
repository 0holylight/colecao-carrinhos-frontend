import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, edit, remove, setCars } from "../store/slices/carSlice.js";
import { Trash2, Pencil } from "lucide-react";

import "./Carros.css";

import api from "../services/api.js";

function Carros() {
  const criarRef = useRef(null);
  const excluirRef = useRef(null);
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const [nome, setNome] = useState("");
  const [cor, setCor] = useState("");
  const [ano, setAno] = useState("");
  const [collection, setCollection] = useState("");
  const [photo, setPhoto] = useState(null);

  const [carregando, setCarregando] = useState(true);
  const [carroSelecionado, setCarroSelecionado] = useState(null);

  const colecao = useSelector((state) => state.car.car);
  const baseUrl = "http://localhost:3001";
  console.log(colecao);

  // Passo A
  useEffect(() => {
    async function buscarCarro() {
      try {
        const resposta = await api.get("/carros");
        dispatch(setCars(resposta.data.cars));
      } catch (e) {
        console.log(e);
      } finally {
        setCarregando(false);
      }
    }

    buscarCarro();
  }, []);

  // useEffect do Modal
  useEffect(() => {
    if (!carregando && colecao.length === 0) {
      modalRef.current.showModal();
    }
  }, [carregando, colecao]);

  if (carregando) {
    return <p>Carregando...</p>;
  }

  function closeModal(base) {
    base.current.close();
  }

  function abrirModalExcluirCarro(carro) {
    setCarroSelecionado(carro);
    excluirRef.current.showModal();
  }

  function abrirModalCriar() {
    criarRef.current.showModal();
  }

  function limparStateModal() {
    setCarroSelecionado(null);
  }

  const anoAtual = new Date().getFullYear();

  async function excluirCarro() {
    try {
      await api.delete(`/carros/${carroSelecionado.id}`);
      dispatch(remove(carroSelecionado));
      closeModal(excluirRef);
    } catch (e) {
      console.log(e);
      alert("Não foi possível excluir o carrinho, tente novamente.");
    }
  }

  return (
    <>
      <div className="colecao-topo">
        <div>
          <h1>Coleção</h1>
          <span className="contador">{colecao.length}/25</span>
        </div>
        <button
          className="btn-primario"
          disabled={colecao.length >= 25}
          onClick={abrirModalCriar}
        >
          + Adicionar carrinho
        </button>
      </div>

      {colecao.length === 0 ? (
        <dialog ref={modalRef} className="modal">
          <h2>Sua garagem está vazia</h2>
          <p>
            Registre seu primeiro carrinho: nome, cor e ano, e uma foto pra
            deixar ele com a sua cara.
          </p>
          <div className="modal-acoes">
            <button
              className="btn-secundario"
              onClick={() => closeModal(modalRef)}
            >
              Agora não
            </button>
            <button
              className="btn-primario"
              onClick={() => {
                closeModal(modalRef);
                abrirModalCriar();
              }}
            >
              Registrar meu primeiro carrinho
            </button>
          </div>
        </dialog>
      ) : (
        <div className="grid">
          {colecao.map((carro) => (
            <div className="grid-item" key={carro.id}>
              <img
                src={
                  carro.photoUrl
                    ? `${baseUrl}/uploads/${carro.photoUrl}`
                    : "/wheel.svg"
                }
                alt={carro.name}
              />
              <div className="main-infos">
                <h2>{carro.name}</h2>
                <p>{carro.color}</p>
                <p>{carro.year}</p>
              </div>
              <div className="card-acoes">
                <button aria-label={`Editar ${carro.name}`}>
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => abrirModalExcluirCarro(carro)}
                  aria-label={`Excluir ${carro.name}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              {carro.collection && (
                <p className="collection">{carro.collection}</p>
              )}
            </div>
          ))}
        </div>
      )}
      <dialog ref={criarRef} className="modal">
        <h2>Novo carrinho</h2>
        <form onSubmit={(e) => e.preventDefault()} className="modal-form">
          <label htmlFor="nome">Nome</label>
          <input
            required
            id="nome"
            type="text"
            placeholder="Modelo do seu HotWheels"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label htmlFor="cor">Cor</label>
          <input
            required
            id="cor"
            type="text"
            placeholder="Cor do modelo"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
          />

          <label htmlFor="ano">Ano</label>
          <input
            required
            id="ano"
            type="number"
            placeholder="Ano de fabricação"
            value={ano}
            min={1968}
            max={anoAtual}
            onChange={(e) => setAno(e.target.value)}
          />

          <label htmlFor="collection">Coleção</label>
          <input
            id="collection"
            type="text"
            placeholder="Ex.: Faster Than Ever (Opcional)"
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
          />

          <label htmlFor="foto">Foto</label>
          <input
            id="foto"
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
          />

          <div className="modal-acoes">
            <button
              className="btn-secundario"
              onClick={() => closeModal(criarRef)}
              type="button"
              accept="image/jpeg,image/png,image/gif"
            >
              Cancelar
            </button>
            <button className="btn-primario" type="submit">
              Registrar carrinho
            </button>
          </div>
        </form>
      </dialog>
      <dialog ref={excluirRef} className="modal" onClose={limparStateModal}>
        <h2>Deseja excluir o carrinho?</h2>
        <p>
          Ao aceitar, você removerá o carro:{" "}
          <strong>{carroSelecionado?.name}</strong>
        </p>
        <div className="modal-acoes">
          <button
            className="btn-secundario"
            onClick={() => closeModal(excluirRef)}
          >
            Cancelar
          </button>
          <button className="btn-perigo" onClick={excluirCarro}>
            Excluir
          </button>
        </div>
      </dialog>
    </>
  );
}

export default Carros;
