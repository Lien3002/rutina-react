import React from 'react';
import ReactDOM from 'react-dom/client';

// Importar Bootstrap CSS (debe ir primero para poder sobrescribir sus estilos)
import 'bootstrap/dist/css/bootstrap.min.css';
// Importar Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Importar estilos de la aplicación
import './styles/index.css';
import './styles/App.css';
import './styles/Navbar.css';
import './styles/Footer.css';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
