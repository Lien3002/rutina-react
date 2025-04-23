import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Importar estilos comunes primero
import "./styles/common.css";
import "./styles/index.css";
// Eliminar App.css ya que su contenido se movió a common.css
import "./styles/Navbar.css";
import "./styles/Footer.css";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
