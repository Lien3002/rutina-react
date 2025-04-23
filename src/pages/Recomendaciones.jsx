import { useState, useEffect } from 'react';
import '../styles/Recomendaciones.css';

const Recomendaciones = () => {
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    mensaje: ''
  });

  useEffect(() => {
    // Cargar recomendaciones guardadas al montar el componente
    const savedRecomendaciones = JSON.parse(localStorage.getItem('recomendaciones') || '[]');
    setRecomendaciones(savedRecomendaciones);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaRecomendacion = {
      ...formData,
      fecha: new Date().toLocaleDateString()
    };

    // Agregar al principio y mantener solo las últimas 10
    const updatedRecomendaciones = [nuevaRecomendacion, ...recomendaciones].slice(0, 10);
    
    setRecomendaciones(updatedRecomendaciones);
    localStorage.setItem('recomendaciones', JSON.stringify(updatedRecomendaciones));
    
    // Limpiar el formulario
    setFormData({
      nombre: '',
      tipo: '',
      mensaje: ''
    });
  };

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
            <div key={index} className="recomendacion-item mb-3">
              <strong>{recomendacion.nombre}</strong> - {recomendacion.tipo}
              <small className="text-muted d-block">{recomendacion.fecha}</small>
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