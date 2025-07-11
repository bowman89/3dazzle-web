// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MaintenancePage from './pages/MaintenancePage';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Navbar from './components/Navbar';
import Navbar2 from './components/Navbar2';
import Home from './pages/Home';


const isSecret = window.location.pathname.startsWith('/dev-');

function App() {
  return (
    <BrowserRouter>
      {isSecret ? (
        <>
          <Navbar2 />
          <main className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16">
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
