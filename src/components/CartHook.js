import React, { useState } from 'react';

const CartHook = () => {
  const [cart, setCartHook] = useState([]);

  const addItemToCart = (qty, item) => {
    let isAlreadyInCart = false;
    let cartIndex;
    const cartCopy = [...cart];

    // Check if the item is already in the cart
    cartCopy.forEach((cartItem, index) => {
      if (cartItem[1].id === item.id) {
        isAlreadyInCart = true;
        cartIndex = index;
      }
    });

    if (isAlreadyInCart) {
      cartCopy[cartIndex][0] += qty;
    } else {
      cartCopy.push([qty, item]);
    }

    setCartHook(cartCopy);
  };

  const removeItemFromCart = (item) => {
    let isInCart = false;
    let cartIndex;
    const cartCopy = [...cart];

    // Check if the item is already in the cart
    cartCopy.forEach((cartItem, index) => {
      if (cartItem[1].id === item.id) {
        isInCart = true;
        cartIndex = index;
      }
    });

    if (isInCart) {
      cartCopy.splice(cartIndex, 1);
      setCartHook(cartCopy);
    }
  };

  const updateItemQty = (qty, item) => {
    let isInCart = false;
    let cartIndex;
    const cartCopy = [...cart];

    // Check if the item is already in the cart
    cartCopy.forEach((cartItem, index) => {
      if (cartItem[1].id === item.id) {
        isInCart = true;
        cartIndex = index;
      }
    });

    if (isInCart) {
      cartCopy[cartIndex][0] = qty;
      setCartHook(cartCopy);
    }
  };

  return {
    cart, addItemToCart, removeItemFromCart, updateItemQty,
  };
};

export default CartHook;
