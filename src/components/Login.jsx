import React from "react";
import { auth, googleProvider, microsoftProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithMicrosoft = async () => {
    try {
      await signInWithPopup(auth, microsoftProvider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <button onClick={signInWithGoogle}>Iniciar sesión con Google</button>
      <button onClick={signInWithMicrosoft}>
        Iniciar sesión con Microsoft
      </button>
    </div>
  );
};

export default Login;
