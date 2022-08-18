import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home">
      <div className="home-logo">
        <div className="triangle" />
        <div className="circle" />
        <div className="square" />
      </div>
      <h1>ShapeShop</h1>
      <Link to="/shop">
        <Button name="Go Shopping" />
      </Link>
    </div>
  );
}

export default Home;
