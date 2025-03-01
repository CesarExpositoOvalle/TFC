import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/recetas">Recetas</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/usuario">Usuario</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;