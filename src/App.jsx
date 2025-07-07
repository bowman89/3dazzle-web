import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="space-y-32">
        <Routes>
          
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Tilføj flere sider her */}
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
