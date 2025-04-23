import { useState } from 'react';
import '../styles/IngestaCalorica.css';

const IngestaCalorica = () => {
  const [formData, setFormData] = useState({
    peso: '',
    altura: '',
    edad: '',
    genero: 'masculino',
    actividad: 'sedentario'
  });
  const [resultado, setResultado] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const calcularCalorias = (e) => {
    e.preventDefault();
    
    const { peso, altura, edad, genero, actividad } = formData;
    let tmb;

    // Cálculo de la Tasa Metabólica Basal (TMB)
    if (genero === 'masculino') {
      tmb = (10 * parseFloat(peso)) + (6.25 * parseFloat(altura)) - (5 * parseInt(edad)) + 5;
    } else {
      tmb = (10 * parseFloat(peso)) + (6.25 * parseFloat(altura)) - (5 * parseInt(edad)) - 161;
    }

    // Factor de actividad
    const factoresActividad = {
      sedentario: 1.2,
      ligero: 1.375,
      moderado: 1.55,
      activo: 1.725,
      muy_activo: 1.9
    };

    const ingestaCalorica = tmb * factoresActividad[actividad];
    setResultado(ingestaCalorica.toFixed(2));
  };

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
            <option value="sedentario">Sedentario</option>
            <option value="ligero">Ligero</option>
            <option value="moderado">Moderado</option>
            <option value="activo">Activo</option>
            <option value="muy_activo">Muy Activo</option>
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