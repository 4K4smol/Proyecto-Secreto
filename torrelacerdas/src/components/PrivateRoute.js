import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext"; 

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
  if (!user) {
    return <Navigate to="/" />; // Redirige siempre a la página de inicio de sesión
  }

  // Si el usuario está autenticado, renderiza el componente hijo
  return children;
};

export default PrivateRoute;
