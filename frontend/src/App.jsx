// filepath: /C:/Users/demxo/Desktop/TFC/TFC/frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Recetas from './components/Recetas';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import './App.css'; // Importa el archivo CSS

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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;