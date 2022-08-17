import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Nav.css';

function Nav() {
  return (
    <div className="nav">
      <ul>
        <Link to="/">
          <div className="logo">
            <div className="triangle" />
            <div className="circle" />
            <div className="square" />
          </div>

        </Link>
        <Link to="/shop">
          <li>Shop</li>
        </Link>
        <Link to="/cart">
          <li>Cart</li>
        </Link>
      </ul>
    </div>
  );
}

export default Nav;
