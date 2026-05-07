import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
      
      {/* ==================== NAVBAR ==================== */}
      <Navbar />

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="flex-grow flex flex-col pt-20">
        {/* The Outlet renders whatever child route is active (e.g., LandingPage) */}
        <Outlet />
      </main>

      {/* ==================== FOOTER ==================== */}
      <Footer />
      
    </div>
  );
};

export default MainLayout;