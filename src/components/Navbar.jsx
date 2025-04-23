import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success w-100">
      <div className="container-fluid px-4">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/imagenes/logo.png" alt="Logo" className="logo-img me-2" />
          <span>Neil</span>
        </Link>
        <h1>Estilo De Vida</h1>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/rutina' ? 'active' : ''}`} 
                to="/rutina"
              >
                Rutina
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/calendario-menu' ? 'active' : ''}`} 
                to="/calendario-menu"
              >
                Calendario de Menús
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/ingesta-calorica' ? 'active' : ''}`} 
                to="/ingesta-calorica"
              >
                Ingesta Calórica
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/alimentacion' ? 'active' : ''}`} 
                to="/alimentacion"
              >
                Alimentación
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/recomendaciones' ? 'active' : ''}`} 
                to="/recomendaciones"
              >
                Recomendaciones
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
