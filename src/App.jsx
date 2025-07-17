// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MaintenancePage from './pages/MaintenancePage';

import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Navbar2 from './components/Navbar2';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import Editor from './pages/Editor';
import AllCategoriesPage from './pages/AllCategoriesPage';


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
              
              <Route path="/dev-about" element={<AboutPage />} />
              <Route path="/dev-contact" element={<ContactPage />} />
              <Route path="/dev-category/:slug" element={<CategoryPage />} />
              <Route path="/produkt/:productId" element={<ProductPage />} />
              <Route path="/dev-editor" element={<Editor />} />
              <Route path="/dev-produkter" element={<AllCategoriesPage />} />

              
              
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
