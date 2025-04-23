import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const RootLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="mt-4 flex-grow-1"> {/* Eliminada la clase 'container' */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;