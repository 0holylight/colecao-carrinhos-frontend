import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoute() {

  const token = localStorage.getItem('token');

  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;