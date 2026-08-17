import Carros from './pages/Carros.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/carros" element={<Carros />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
