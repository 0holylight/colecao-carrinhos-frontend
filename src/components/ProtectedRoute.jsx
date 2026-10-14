import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute() {
  const user = useSelector((state) => state.auth.user);
  const checked = useSelector((state) => state.auth.checked);

  if (!checked) {
    return <p>Carregando...</p>;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
