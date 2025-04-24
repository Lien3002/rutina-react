import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Sesión cerrada exitosamente
      console.log("Sesión cerrada");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Manejar errores
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="btn btn-outline-light d-flex align-items-center gap-2"
    >
      <i className="bi bi-box-arrow-right"></i>
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;
