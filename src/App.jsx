import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout.jsx';
import Home from './pages/Home.jsx';
import RutinaEjercicios from './pages/RutinaEjercicios.jsx';
import CalendarioMenu from './pages/CalendarioMenu.jsx';
import IngestaCalorica from './pages/IngestaCalorica.jsx';
import Alimentacion from './pages/Alimentacion.jsx';
import Recomendaciones from './pages/Recomendaciones.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="rutina" element={<RutinaEjercicios />} />
          <Route path="calendario-menu" element={<CalendarioMenu />} />
          <Route path="ingesta-calorica" element={<IngestaCalorica />} />
          <Route path="alimentacion" element={<Alimentacion />} />
          <Route path="recomendaciones" element={<Recomendaciones />} />
          <Route path="*" element={<div>Página no encontrada</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
