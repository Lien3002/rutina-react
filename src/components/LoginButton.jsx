import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebase';

const LoginButton = () => {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Usuario logueado exitosamente
      console.log("Usuario logueado con Google");
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      // Manejar errores (ej. usuario cerró la ventana emergente)
    }
  };

  return (
    <button 
      onClick={signInWithGoogle}
      className="btn btn-light d-flex align-items-center gap-2 border"
    >
      <img 
        src="https://www.google.com/favicon.ico" 
        alt="Google Icon" 
        style={{ width: '20px', height: '20px' }} 
      />
      Iniciar Sesión con Google
    </button>
  );
};

export default LoginButton;