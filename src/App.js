import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Nav from './components/Nav';
import CartHook from './components/CartHook';
import './styles/App.css';

function App() {
  const {
    cart,
    addItemToCart,
    removeItemFromCart,
    updateItemQty,
  } = CartHook();

  return (
    <BrowserRouter>
      <div className="App">
        <Nav cartLength={cart.length} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop onAddToCart={addItemToCart} />} />
          <Route
            path="/cart"
            element={(
              <Cart
                cart={cart}
                onRemoveItem={removeItemFromCart}
                onUpdateQuantity={updateItemQty}
              />
            )}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
