import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Recetas from './pages/Recetas';
import Home from './pages/Home';
import About from './pages/About';
import PaginaReceta from './pages/PaginaReceta';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';
import './assets/styles/App.css'; // Importa el archivo CSS

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recetas" element={<Recetas />} />
            <Route path="/about" element={<About />} />
            <Route path="/receta/:id" element={<PaginaReceta />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;