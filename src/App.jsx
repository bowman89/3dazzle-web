// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MaintenancePage from './pages/MaintenancePage';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Navbar from './components/Navbar';

const isSecret = window.location.pathname.startsWith('/dev-');

function App() {
  return (
    <BrowserRouter>
      {isSecret ? (
        <>
          <Navbar />
          <main>
            <Routes>
              <Route path="/dev-home" element={<LandingPage />} />
              <Route path="/dev-about" element={<AboutPage />} />
              <Route path="/dev-contact" element={<ContactPage />} />
            </Routes>
          </main>
        </>  
      ) : (
        <MaintenancePage />
      )}
    </BrowserRouter>
  );
}

export default App;
