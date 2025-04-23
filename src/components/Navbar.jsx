import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const navLinks = [
  { path: "/rutina", text: "Rutina" },
  { path: "/calendario-menu", text: "Calendario de Menús" },
  { path: "/ingesta-calorica", text: "Ingesta Calórica" },
  { path: "/alimentacion", text: "Alimentación" },
  { path: "/recomendaciones", text: "Recomendaciones" },
];

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
            {navLinks.map(({ path, text }) => (
              <li key={path} className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === path ? "active" : ""
                  }`}
                  to={path}
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
