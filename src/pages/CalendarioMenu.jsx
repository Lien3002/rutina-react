import { useState, useEffect } from "react";
import "../styles/CalendarioMenu.css";

const CalendarioMenu = () => {
  const [mesActual, setMesActual] = useState(new Date().getMonth());
  const [anioActual, setAnioActual] = useState(new Date().getFullYear());
  const [menuSeleccionado, setMenuSeleccionado] = useState(null);
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);

  const nombresMeses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const menus = {
    "2025-04-19": {
      titulo: "",
      descripcion:
        "Desayuno: Avena con frutas.<br>Almuerzo: Pollo a la plancha con ensalada.<br>Cena: Sopa de verduras.",
    },
    "2025-04-20": {
      titulo: "",
      descripcion:
        "Desayuno: Tostadas integrales con aguacate.<br>Almuerzo: Pescado al horno con arroz.<br>Cena: Ensalada de atún.",
    },
    "2025-04-21": {
      titulo: "",
      descripcion:
        "Desayuno: Omelette de espinaca.<br>Almuerzo: Lentejas guisadas con verduras.<br>Cena: Ensalada de atún y tomate.",
    },
  };

  useEffect(() => {
    // Seleccionar el día actual al cargar el componente
    const hoy = new Date();
    handleDiaClick(hoy);
    setDiaSeleccionado(hoy.getDate());
  }, []); // Se ejecuta solo al montar el componente

  const generarDiasCalendario = () => {
    const fecha = new Date(anioActual, mesActual, 1);
    const dias = [];

    // Añadir días vacíos al principio
    for (let i = 0; i < fecha.getDay(); i++) {
      dias.push(null);
    }

    // Añadir días del mes
    while (fecha.getMonth() === mesActual) {
      dias.push(new Date(fecha));
      fecha.setDate(fecha.getDate() + 1);
    }

    return dias;
  };

  const handleDiaClick = (fecha) => {
    if (!fecha) return;
    setDiaSeleccionado(fecha.getDate());

    const fechaStr = fecha.toISOString().split("T")[0];
    const [anio, mes, dia] = fechaStr.split("-");
    const mesNombre = nombresMeses[parseInt(mes, 10) - 1];
    const fechaFormateada = `${dia} de ${mesNombre} de ${anio}`;

    if (menus[fechaStr]) {
      const titulo =
        menus[fechaStr].titulo &&
        menus[fechaStr].titulo.trim() !== "Menu del" &&
        menus[fechaStr].titulo.trim() !== "Menu del "
          ? menus[fechaStr].titulo
          : `Menú del ${fechaFormateada}`;

      setMenuSeleccionado({
        titulo,
        descripcion: menus[fechaStr].descripcion,
      });
    } else {
      setMenuSeleccionado({
        titulo: `Menú para ${fechaFormateada}`,
        descripcion: "No hay menú registrado para este día.",
      });
    }
  };

  const handleMesAnterior = () => {
    if (mesActual === 0) {
      setMesActual(11);
      setAnioActual(anioActual - 1);
    } else {
      setMesActual(mesActual - 1);
    }
    setMenuSeleccionado(null);
  };

  const handleMesSiguiente = () => {
    if (mesActual === 11) {
      setMesActual(0);
      setAnioActual(anioActual + 1);
    } else {
      setMesActual(mesActual + 1);
    }
    setMenuSeleccionado(null);
  };

  return (
    <div className="calendario-container">
      <div className="calendario-header">
        <button className="btn btn-primary" onClick={handleMesAnterior}>
          &lt; Anterior
        </button>
        <h2 id="mes-actual">{`${nombresMeses[mesActual]} ${anioActual}`}</h2>
        <button className="btn btn-primary" onClick={handleMesSiguiente}>
          Siguiente &gt;
        </button>
      </div>

      <div className="calendario">
        <table className="calendario-tabla">
          <thead>
            <tr>
              {diasSemana.map((dia) => (
                <th key={dia}>{dia}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chunk(generarDiasCalendario(), 7).map((semana, i) => (
              <tr key={i}>
                {semana.map((dia, j) => (
                  <td key={`${i}-${j}`}>
                    {dia && (
                      <button
                        className={`btn-dia ${
                          dia.getDate() === diaSeleccionado
                            ? "seleccionado"
                            : ""
                        }`}
                        onClick={() => handleDiaClick(dia)}
                      >
                        {dia.getDate()}
                      </button>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div id="menu-dia" className="menu-dia">
        {menuSeleccionado && (
          <>
            <strong>{menuSeleccionado.titulo}</strong>
            <div
              dangerouslySetInnerHTML={{ __html: menuSeleccionado.descripcion }}
            />
          </>
        )}
      </div>
    </div>
  );
};

// Función auxiliar para dividir el array en chunks
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

export default CalendarioMenu;
