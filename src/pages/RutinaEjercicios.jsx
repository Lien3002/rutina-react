import { useState, useEffect } from 'react';
import { ejerciciosPorDia } from './data/ejercicios';
import '../styles/RutinaEjercicios.css';

const RutinaEjercicios = () => {
  const [diaSeleccionado, setDiaSeleccionado] = useState('lunes');
  const [ejerciciosCompletados, setEjerciciosCompletados] = useState([]);
  const [ejerciciosActuales, setEjerciciosActuales] = useState([]);
  const [calentamientoCompletado, setCalentamientoCompletado] = useState(false);

  const diasSemana = [
    { id: 'lunes', texto: 'Lunes', inicial: 'L' },
    { id: 'martes', texto: 'Martes', inicial: 'M' },
    { id: 'miercoles', texto: 'Miércoles', inicial: 'X' },
    { id: 'jueves', texto: 'Jueves', inicial: 'J' },
    { id: 'viernes', texto: 'Viernes', inicial: 'V' },
    { id: 'sabado', texto: 'Sábado', inicial: 'S' },
    { id: 'domingo', texto: 'Domingo', inicial: 'D' }
  ];

  useEffect(() => {
    setEjerciciosActuales(ejerciciosPorDia[diaSeleccionado] || []);
  }, [diaSeleccionado]);

  const handleDiaClick = (dia) => {
    setDiaSeleccionado(dia);
  };

  const handleEjercicioCompletado = (ejercicio, isChecked) => {
    if (isChecked) {
      setEjerciciosCompletados([...ejerciciosCompletados, ejercicio]);
    } else {
      setEjerciciosCompletados(
        ejerciciosCompletados.filter((e) => e.ejercicio !== ejercicio.ejercicio)
      );
    }
  };

  // Determinar si mostrar el mensaje de progreso
  const mostrarMensajeProgreso = !calentamientoCompletado && ejerciciosCompletados.length === 0;

  return (
    <div className="container mt-4">
      <section id="rutina-ejercicios">
        <h2>Rutina de Ejercicios Diaria</h2>
        
        {/* Tabla de días de la semana */}
        <table id="dias-semana">
          <tbody>
            <tr>
              {diasSemana.map((dia) => (
                <th
                  key={dia.id}
                  onClick={() => handleDiaClick(dia.id)}
                  className={diaSeleccionado === dia.id ? 'selected' : ''}
                  data-inicial={dia.inicial}
                >
                  {dia.texto}
                </th>
              ))}
            </tr>
          </tbody>
        </table>

        {/* Sección de calentamiento */}
        <p className="calentamiento-section">
          <input
            type="checkbox"
            id="check-calentamiento"
            checked={calentamientoCompletado}
            onChange={(e) => setCalentamientoCompletado(e.target.checked)}
          />
          <strong>Calentamiento:</strong><br />
          5 minutos de cardio ligero (ej. caminar en el lugar), 5 minutos de
          estiramientos dinámicos (ej. círculos de brazos, balanceo de piernas),
          10 minutos de movilidad articular (ej. rotaciones de tobillos,
          rodillas, caderas, hombros).
        </p>

        {/* Tabla de ejercicios */}
        <div id="tabla-ejercicios">
          <table>
            <thead>
              <tr>
                <th>✓</th>
                <th>Tipo</th>
                <th>Ejercicio</th>
                <th>Duración</th>
                <th>Intensidad</th>
              </tr>
            </thead>
            <tbody>
              {ejerciciosActuales.map((ejercicio, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={ejerciciosCompletados.some(
                        (e) => e.ejercicio === ejercicio.ejercicio
                      )}
                      onChange={(e) =>
                        handleEjercicioCompletado(ejercicio, e.target.checked)
                      }
                    />
                  </td>
                  <td>{ejercicio.tipo}</td>
                  <td>{ejercicio.ejercicio}</td>
                  <td>{ejercicio.duracion}</td>
                  <td>{ejercicio.intensidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="rutina-note">
          * Seguir este plan le ayudará a mejorar su salud física, reforzar su
          sistema inmunológico y mantener una circulación sanguínea saludable.
        </p>

        {/* Sección de resultados */}
        <section id="resultados">
          <h2>Ejercicios Completados de la Semana</h2>
          {calentamientoCompletado && (
            <p>✓ Calentamiento inicial</p>
          )}
          {ejerciciosCompletados.map((ejercicio, index) => (
            <p key={index}>✓ {ejercicio.ejercicio}</p>
          ))}
          {mostrarMensajeProgreso && (
            <p className="progress-note">
              Su progreso se registrará aquí. Puede rastrear sus logros y mejoras
              a lo largo del tiempo.
            </p>
          )}
        </section>
      </section>
    </div>
  );
};

export default RutinaEjercicios;