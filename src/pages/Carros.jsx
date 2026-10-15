import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, edit, remove, setCars } from "../store/slices/carSlice.js";
import "./Carros.css";

import api from "../services/api.js";

function Carros() {
  const dispatch = useDispatch();

  // Passo A
  useEffect(() => {
    async function buscarCarro() {
      try {
        const resposta = await api.get("/carros");
        dispatch(setCars(resposta.data.cars));
      } catch (e) {
        console.log(e);
      }
    }

    buscarCarro();
  }, []);

  // Passo B
  const colecao = useSelector((state) => state.car.car);
  const baseUrl = "http://localhost:3001";
  console.log(colecao);

  return (
    <>
      <h1>Coleção</h1>
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
              <h4>{carro.name}</h4>
              <p>{carro.color}</p>
              <p>{carro.year}</p>
            </div>
            {carro.collection && (
              <p className="collection">{carro.collection}</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Carros;
