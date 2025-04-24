import { useState, useEffect } from "react";
import { alimentosPorDia } from "./data/alimentos";
import { diasSemana } from "../constants/dias";
import "../styles/Alimentacion.css";

const Alimentacion = () => {
  const [diaSeleccionado, setDiaSeleccionado] = useState("lunes");
  // Mantenemos una copia local de los datos de alimentos con estado de completado por día
  const [alimentosConEstado, setAlimentosConEstado] = useState({});
  // Mantenemos una lista global para mostrar en los resultados, permitiendo duplicados
  const [alimentosCompletadosGlobal, setAlimentosCompletadosGlobal] = useState(
    []
  );
  const [esPantallaPequena, setEsPantallaPequena] = useState(
    window.innerWidth <= 480
  );

  useEffect(() => {
    const handleResize = () => {
      setEsPantallaPequena(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Inicializar alimentosConEstado si está vacío o si falta el día seleccionado
    if (
      Object.keys(alimentosConEstado).length === 0 ||
      !alimentosConEstado[diaSeleccionado]
    ) {
      const initialState = { ...alimentosConEstado };
      if (!initialState[diaSeleccionado]) {
        initialState[diaSeleccionado] = alimentosPorDia[diaSeleccionado].map(
          (alimento) => ({
            ...alimento,
            completado: false, // Añadir estado de completado por defecto
          })
        );
      }
      setAlimentosConEstado(initialState);
    }
  }, [diaSeleccionado, alimentosConEstado]); // Dependencia para asegurar que se inicialice

  const handleDiaClick = (dia) => {
    setDiaSeleccionado(dia);
  };

  const handleAlimentoCompletado = (alimentoIndex, isChecked) => {
    setAlimentosConEstado((prevState) => {
      const nuevosAlimentosDelDia = [...prevState[diaSeleccionado]];
      const alimentoActualizado = {
        ...nuevosAlimentosDelDia[alimentoIndex],
        completado: isChecked,
      };
      nuevosAlimentosDelDia[alimentoIndex] = alimentoActualizado;

      // Actualizar la lista global de alimentos completados
      setAlimentosCompletadosGlobal((prevGlobal) => {
        if (isChecked) {
          // Verificar si el alimento ya existe en la lista global
          const existeAlimento = prevGlobal.some(
            (a) =>
              a.alimento === alimentoActualizado.alimento &&
              a.dia === diaSeleccionado // Agregar día para diferenciar
          );

          // Solo agregar si no existe
          if (!existeAlimento) {
            return [
              ...prevGlobal,
              { ...alimentoActualizado, dia: diaSeleccionado },
            ];
          }
          return prevGlobal;
        } else {
          // Eliminar el alimento específico del día seleccionado
          return prevGlobal.filter(
            (a) =>
              !(
                a.alimento === alimentoActualizado.alimento &&
                a.dia === diaSeleccionado
              )
          );
        }
      });

      return {
        ...prevState,
        [diaSeleccionado]: nuevosAlimentosDelDia,
      };
    });
  };

  // Obtener la lista de alimentos para el día actual desde el estado local
  const alimentosDelDiaActual = alimentosConEstado[diaSeleccionado] || [];

  // Determinar si mostrar el mensaje de progreso
  const mostrarMensajeProgreso = alimentosCompletadosGlobal.length === 0;

  return (
    <div className="alimentacion-container">
      {/* Tabla de días de la semana */}
      <table id="dias-semana-alimentacion">
        <tbody>
          <tr>
            {diasSemana.map((dia) => (
              <th
                key={dia.id}
                data-dia={dia.id}
                className={diaSeleccionado === dia.id ? "dia-seleccionado" : ""}
                onClick={() => handleDiaClick(dia.id)}
              >
                {esPantallaPequena ? dia.inicial : dia.texto}
              </th>
            ))}
          </tr>
        </tbody>
      </table>

      {/* Tabla de alimentos */}
      <div className="tabla-container">
        <table id="tabla-alimentos">
          <thead>
            <tr>
              <th>✓</th>
              <th>Alimento</th>
              <th>Porción</th>
              <th>Notas</th>
            </tr>
          </thead>
          <tbody>
            {alimentosDelDiaActual.map((alimento, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={alimento.completado} // Usamos el estado local de completado
                    onChange={(e) =>
                      handleAlimentoCompletado(index, e.target.checked)
                    }
                  />
                </td>
                <td>{alimento.alimento}</td>
                <td>{alimento.porcion}</td>
                <td>{alimento.notas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sección de resultados */}
      <section id="resultadosAlimentosCompletados">
        <h2>Alimentos Consumidos de la Semana</h2> {/* Título general */}
        {alimentosCompletadosGlobal.map((alimento, index) => (
          <p key={index}>✓ {alimento.alimento}</p>
        ))}
        {mostrarMensajeProgreso && (
          <p className="progress-note">
            Su Alimentación quedará registrado en este espacio. Podrá monitorear
            su desayuno y evolución con el paso del tiempo.
          </p>
        )}
      </section>
    </div>
  );
};

export default Alimentacion;
