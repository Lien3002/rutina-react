import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYzDGzg6Fh9w25mZaWGt-y-vw-LXUlqwM",
  authDomain: "higiene-vital.firebaseapp.com",
  projectId: "higiene-vital",
  storageBucket: "higiene-vital.firebasestorage.app",
  messagingSenderId: "42295148377",
  appId: "1:42295148377:web:0dfe3d8a613fc6899a9648"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const microsoftProvider = new OAuthProvider("microsoft.com");
// Configuración adicional para Microsoft si es necesaria
microsoftProvider.setCustomParameters({
  prompt: "select_account",
});
