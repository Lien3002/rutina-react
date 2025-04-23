import { useState, useCallback } from "react";
import "../styles/IngestaCalorica.css";

const FACTORES_ACTIVIDAD = {
  sedentario: { valor: 1.2, texto: "Sedentario" },
  ligero: { valor: 1.375, texto: "Ligero" },
  moderado: { valor: 1.55, texto: "Moderado" },
  activo: { valor: 1.725, texto: "Activo" },
  muy_activo: { valor: 1.9, texto: "Muy Activo" },
};

const calcularTMB = (peso, altura, edad, genero) => {
  const tmb = 10 * peso + 6.25 * altura - 5 * edad;
  return genero === "masculino" ? tmb + 5 : tmb - 161;
};

const IngestaCalorica = () => {
  const [formData, setFormData] = useState({
    peso: "",
    altura: "",
    edad: "",
    genero: "masculino",
    actividad: "sedentario",
  });
  const [resultado, setResultado] = useState(null);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const calcularCalorias = useCallback(
    (e) => {
      e.preventDefault();
      const { peso, altura, edad, genero, actividad } = formData;

      const tmb = calcularTMB(
        parseFloat(peso),
        parseFloat(altura),
        parseInt(edad),
        genero
      );

      const ingestaCalorica = tmb * FACTORES_ACTIVIDAD[actividad].valor;
      setResultado(ingestaCalorica.toFixed(2));
    },
    [formData]
  );

  return (
    <div className="ingesta-calorica-container">
      <h2>Calculadora de Ingesta Calórica</h2>
      <form id="calculadora-calorias" onSubmit={calcularCalorias}>
        <div className="form-group">
          <label htmlFor="peso">Peso (kg):</label>
          <input
            type="number"
            id="peso"
            name="peso"
            value={formData.peso}
            onChange={handleInputChange}
            required
            min="30"
            max="300"
            step="0.1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="altura">Altura (cm):</label>
          <input
            type="number"
            id="altura"
            name="altura"
            value={formData.altura}
            onChange={handleInputChange}
            required
            min="100"
            max="250"
          />
        </div>

        <div className="form-group">
          <label htmlFor="edad">Edad:</label>
          <input
            type="number"
            id="edad"
            name="edad"
            value={formData.edad}
            onChange={handleInputChange}
            required
            min="15"
            max="100"
          />
        </div>

        <div className="form-group">
          <label htmlFor="genero">Género:</label>
          <select
            id="genero"
            name="genero"
            value={formData.genero}
            onChange={handleInputChange}
          >
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="actividad">Nivel de Actividad:</label>
          <select
            id="actividad"
            name="actividad"
            value={formData.actividad}
            onChange={handleInputChange}
          >
            {Object.entries(FACTORES_ACTIVIDAD).map(([key, { texto }]) => (
              <option key={key} value={key}>
                {texto}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Calcular
        </button>
      </form>

      <div id="resultado-calorias" className="resultado">
        {resultado && (
          <>
            <h3>Tu ingesta calórica diaria estimada es:</h3>
            <p>{resultado} calorías</p>
          </>
        )}
      </div>
    </div>
  );
};

export default IngestaCalorica;
