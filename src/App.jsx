import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import UnderUdvikling from './pages/UnderUdvikling'

function AppContent() {
  const location = useLocation();

  // Hvis vi er på forsiden "/", så vis kun "UnderUdvikling" siden
  if (location.pathname === "/") {
    return <UnderUdvikling />;
  }

  // Ellers vis navbar + sider
  return (
    <>
      <Navbar />
      <main className="space-y-32">
        <Routes>
          <Route path="/home" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Tilføj flere sider her */}
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
