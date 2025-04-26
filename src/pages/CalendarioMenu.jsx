import { useState, useEffect } from "react";
import "../styles/CalendarioMenu.css";
import { diasSemana } from "../constants/dias";
import { db, auth } from "../config/firebase";
import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";

const CalendarioMenu = () => {
  const [mesActual, setMesActual] = useState(new Date().getMonth());
  const [anioActual, setAnioActual] = useState(new Date().getFullYear());
  const [menuSeleccionado, setMenuSeleccionado] = useState(null);
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);
  const [esPantallaPequena, setEsPantallaPequena] = useState(
    window.innerWidth <= 480
  );
  const [menus, setMenus] = useState({});

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

  // Cargar menús de Firestore
  useEffect(() => {
    const cargarMenus = async () => {
      if (!auth.currentUser) return;
      
      try {
        const menusCollection = collection(db, `users/${auth.currentUser.uid}/menus`);
        const menusSnapshot = await getDocs(menusCollection);
        const menusData = {};
        
        menusSnapshot.forEach((doc) => {
          menusData[doc.id] = doc.data();
        });
        
        setMenus(menusData);
      } catch (error) {
        console.error("Error al cargar menús:", error);
      }
    };

    cargarMenus();
  }, [auth.currentUser]);

  const agregarMenu = async (fecha, menu) => {
    if (!auth.currentUser) {
      alert("Debes iniciar sesión para guardar menús");
      return;
    }

    try {
      const menuRef = doc(db, `users/${auth.currentUser.uid}/menus/${fecha}`);
      await setDoc(menuRef, menu);
      
      setMenus(prevMenus => ({
        ...prevMenus,
        [fecha]: menu
      }));
    } catch (error) {
      console.error("Error al guardar el menú:", error);
      alert("Error al guardar el menú. Por favor intenta de nuevo.");
    }
  };

  useEffect(() => {
    // Seleccionar el día actual al cargar el componente
    const hoy = new Date();
    handleDiaClick(hoy);
    setDiaSeleccionado(hoy.getDate());

    // Añadir listener para redimensionamiento
    const handleResize = () => {
      setEsPantallaPequena(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
              {diasSemana.map((dia) => ( // Usar la constante importada
                <th key={dia.id}> {/* Usar dia.id como key */}
                  {esPantallaPequena ? dia.inicial : dia.texto} {/* Lógica condicional */}
                </th>
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
            <button
              className="btn btn-primary mt-3"
              onClick={() => {
                if (diaSeleccionado) {
                  const fecha = new Date(anioActual, mesActual, diaSeleccionado);
                  const fechaStr = fecha.toISOString().split('T')[0];
                  const nuevoMenu = {
                    titulo: "",
                    descripcion: prompt("Ingrese el menú para este día (use <br> para nuevas líneas):\nEjemplo:\nDesayuno: Avena\nAlmuerzo: Pollo\nCena: Sopa") || "No hay menú registrado para este día."
                  };
                  agregarMenu(fechaStr, nuevoMenu);
                }
              }}
            >
              {menus[new Date(anioActual, mesActual, diaSeleccionado).toISOString().split('T')[0]] ? 'Editar Menú' : 'Agregar Menú'}
            </button>
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
