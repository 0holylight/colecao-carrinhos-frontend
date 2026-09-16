import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import carReducer from './slices/carSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    car: carReducer
  },
})

export default store; 