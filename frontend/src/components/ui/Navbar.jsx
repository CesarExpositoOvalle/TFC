import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/Navbar.css';
import logo from '../../assets/logo/Diseño sin título.png'; // Importa la imagen del logo

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="HOME" className="navbar-logo" />
      </Link>
      <ul>
        <li><Link to="/allDishes">Todos los platos</Link></li>
        <li><Link to="/favorites">Favoritos</Link></li>
        <li><Link to="/myDishes">Mis platos</Link></li>
        <li><Link to="/profile">Perfil</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;