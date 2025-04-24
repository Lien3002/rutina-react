import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
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
  const [user, setUser] = useState(null);
  const navbarCollapse = useRef(null);

  const handleLinkClick = () => {
    // Verifica si el navbar está expandido y si estamos en modo móvil
    if (window.innerWidth < 992 && navbarCollapse.current) {
      // Usa Bootstrap 5 collapse para cerrar el menú
      const bsCollapse = new bootstrap.Collapse(navbarCollapse.current, {
        toggle: false,
      });
      bsCollapse.hide();
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

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
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
          ref={navbarCollapse}
        >
          <ul className="navbar-nav ms-auto">
            {navLinks.map(({ path, text }) => (
              <li key={path} className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === path ? "active" : ""
                  }`}
                  to={path}
                  onClick={handleLinkClick}
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
          {/* Botones de autenticación */}
          <div className="d-flex align-items-center ms-3">
            {user ? (
              <div className="d-flex align-items-center gap-3">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="rounded-circle"
                    style={{
                      width: "35px",
                      height: "35px",
                      objectFit: "cover",
                    }}
                  />
                )}
                <span className="text-light">
                  {user.displayName || user.email}
                </span>
                <LogoutButton />
              </div>
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
