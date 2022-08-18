import React from 'react';
import Button from './Button';
import QuantitySelector from './QuantitySelector';
import '../styles/Cart.css';

function Cart(props) {
  const calculateCartTotal = (cart) => {
    if (cart.length === 1) return cart[0][1].price * cart[0][0];
    const initialValue = 0;
    const sum = cart.reduce((previousValue, currentValue) => (
      previousValue) + (currentValue[1].price * currentValue[0]
    ), initialValue);
    return sum;
  };

  const checkCart = () => {
    if (props.cart.length === 0) {
      return (
        <div className="cart">
          <div className="cart-header">
            <h1>Your shopping cart is empty</h1>
          </div>
        </div>
      );
    }

    return (
      <div className="cart">
        <div className="cart-header">
          <h1>Your shopping cart</h1>
          <p>PRODUCT</p>
          <p>PRICE</p>
          <p>SUBTOTAL</p>
        </div>
        <div className="cart-items">
          {props.cart.map((cartItem) => (
            <div className="cart-item" key={cartItem[1].id}>
              <p>
                {cartItem[1].name}
              </p>
              <p>
                $
                {cartItem[1].price}
              </p>
              <p>
                $
                {cartItem[1].price * cartItem[0]}
              </p>
              <div className="cart-item-modifier">
                <Button name="Remove" onButtonClick={() => { props.onRemoveItem(cartItem[1]); }} />
                <QuantitySelector
                  onQuantityChange={(itemQty) => {
                    props.onUpdateQuantity(itemQty, cartItem[1]);
                  }}
                  quantity={cartItem[0]}

                />
              </div>
            </div>
          ))}
        </div>
        <div className="cart-total">
          <p>
            TOTAL
            {' '}
            <span>
              $
              {calculateCartTotal(props.cart)}
            </span>
          </p>
          <Button name="Checkout" />
        </div>
      </div>
    );
  };

  return (
    checkCart()
  );
}

export default Cart;
