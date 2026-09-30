import { createSlice } from "@reduxjs/toolkit";

const carSlice = createSlice({
  name: "car",
  initialState: {
    car: [],
  },
  reducers: {
    register: (state, action) => {
      state.car.push(action.payload);
    },
    edit: (state, action) => {
      const posicao = state.car.findIndex(
        (carro) => carro.id === action.payload.id,
      );
      state.car[posicao] = action.payload;
    },
    remove: (state, action) => {
      state.car = state.car.filter((carro) => carro.id !== action.payload.id);
    },
    setCars: (state, action) => {
      state.car = action.payload;
    },
  },
});

export const { register, edit, remove, setCars } = carSlice.actions;
export default carSlice.reducer;
