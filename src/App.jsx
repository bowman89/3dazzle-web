// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MaintenancePage from './pages/MaintenancePage';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Navbar2 from './components/Navbar2';
import Home from './pages/Home';

const isSecret = window.location.pathname.startsWith('/dev-');

function App() {
  return (
    <BrowserRouter>
      {isSecret ? (
        <>
          <Navbar2 />
          <main className="">
            <Routes>
              <Route path="/dev-home2" element={<Home />} />
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
