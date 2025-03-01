import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/recetas">Recetas</Link></li>
        <li><Link to="/about">About</Link></li>
        <li className="dropdown">
          <Link to="/profile">Usuario</Link> {/* Cambiado a /profile */}
          <div className="dropdown-content">
            <Link to="/register">Registrarse</Link>
            <Link to="/login">Iniciar Sesión</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;