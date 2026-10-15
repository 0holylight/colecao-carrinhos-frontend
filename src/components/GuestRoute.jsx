import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function GuestRoute() {
  const user = useSelector((state) => state.auth.user);
  const checked = useSelector((state) => state.auth.checked);

  if (!checked) {
    return <p>Carregando...</p>;
  }

  return user ? <Navigate to="/carros" replace/> : <Outlet />; 
}

export default GuestRoute;
