// filepath: /C:/Users/demxo/Desktop/TFC/TFC/frontend/src/components/layout/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/Navbar.css'; // Importa el archivo CSS para la barra de navegación

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/recetas">Recetas</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;