import { useState, useEffect, useCallback } from "react";
import "../styles/Recomendaciones.css";

const INITIAL_FORM_STATE = {
  nombre: "",
  tipo: "",
  mensaje: "",
};

const MAX_RECOMENDACIONES = 10;

const Recomendaciones = () => {
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    const savedRecomendaciones = JSON.parse(
      localStorage.getItem("recomendaciones") || "[]"
    );
    setRecomendaciones(savedRecomendaciones);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const nuevaRecomendacion = {
        ...formData,
        fecha: new Date().toLocaleDateString(),
        id: Date.now(), // Añadir un id único
      };

      setRecomendaciones((prev) => {
        const updated = [nuevaRecomendacion, ...prev].slice(
          0,
          MAX_RECOMENDACIONES
        );
        localStorage.setItem("recomendaciones", JSON.stringify(updated));
        return updated;
      });

      setFormData(INITIAL_FORM_STATE);
    },
    [formData]
  );

  return (
    <div className="recomendaciones-container">
      <div className="form-section">
        <h2>Nueva Recomendación</h2>
        <form id="recomendacionForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tipo">Tipo:</label>
            <select
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleInputChange}
              required
              className="form-control"
            >
              <option value="">Seleccione un tipo</option>
              <option value="Ejercicio">Ejercicio</option>
              <option value="Alimentación">Alimentación</option>
              <option value="Salud">Salud</option>
              <option value="Otros">Otros</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="mensaje">Mensaje:</label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleInputChange}
              required
              className="form-control"
              rows="4"
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Enviar Recomendación
          </button>
        </form>
      </div>

      <div className="recomendaciones-section">
        <h2>Recomendaciones Recientes</h2>
        <div id="recomendacionesRecientes">
          {recomendaciones.map((recomendacion, index) => (
            <div key={recomendacion.id} className="recomendacion-item mb-3">
              <strong>{recomendacion.nombre}</strong> - {recomendacion.tipo}
              <small className="text-muted d-block">
                {recomendacion.fecha}
              </small>
              <p className="mb-0">{recomendacion.mensaje}</p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recomendaciones;
