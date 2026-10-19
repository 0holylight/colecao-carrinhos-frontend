import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, edit, remove, setCars } from "../store/slices/carSlice.js";
import { Trash2, Pencil } from "lucide-react";

import "./Carros.css";

import api from "../services/api.js";

function Carros() {
  const excluirRef = useRef(null);
  const modalRef = useRef(null);
  const dispatch = useDispatch();
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

  function limparStateModal() {
    setCarroSelecionado(null);
  }

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
      <h1>Coleção</h1>
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
              onClick={() => closeModal(modalRef)}
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
      <dialog ref={excluirRef} className="modal" onClose={limparStateModal}>
        <h2>Deseja excluir o carrinho?</h2>
        <p>Ao aceitar, você removerá o carro:  <strong>{carroSelecionado?.name}</strong></p>
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
