import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, edit, remove, setCars } from "../store/slices/carSlice.js";

import "./Carros.css";

import api from "../services/api.js";

function Carros() {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const [carregando, setCarregando] = useState(true);
  // const [modalState, setModalState]= useState(true); // true-false pra aberto/fechado?

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

  function closeModal() {
    modalRef.current.close();
  }

  return (
    <>
      <h1>Coleção</h1>
      {colecao.length === 0 ? (
        <dialog ref={modalRef} className="modal">
          <h2>Sua garagem está vazia</h2>
          <p>Registre seu primeiro carrinho: nome, cor e ano, e uma foto pra deixar ele com a sua cara.</p>
          <div className="modal-acoes">
            <button className="btn-secundario" onClick={closeModal}>
              Agora não
            </button>
            <button className="btn-primario" onClick={closeModal}>
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
              {carro.collection && (
                <p className="collection">{carro.collection}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Carros;
