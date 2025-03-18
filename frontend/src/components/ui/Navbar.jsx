import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/Navbar.css';
import logo from '../../assets/logo/Diseño sin título.png';
import accountLogo from '../../assets/icons/user.png'; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="HOME" className="navbar-logo" />
        </Link>
      </div>
      <div className={`navbar-center ${menuOpen ? 'open' : ''}`}>
        <ul className="navbar-links">
          <li><Link to="/all-dishes">Todos los platos</Link></li>
          <li><Link to="/make-dish">Crear plato</Link></li>
          <li><Link to="/favorites">Favoritos</Link></li>
          <li><Link to="/my-dishes">Mis platos</Link></li>
        </ul>
      </div>
      <div className="navbar-hamburger" onClick={toggleMenu}>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </div>
      <div className="navbar-right">
        <Link to="/profile">
          <img src={accountLogo} alt="Perfil" className="navbar-account-logo" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;