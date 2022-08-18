import React, { useState, useEffect } from 'react';
import '../styles/QuantitySelector.css';

function QuantitySelector(props) {
  const [itemQTY, setItemQTY] = useState(1);

  useEffect(() => {
    if (props.quantity !== undefined) {
      setItemQTY(props.quantity);
    }
  }, []);

  const inputHandler = (event) => {
    let input = event.target.value;

    if (input !== '') {
      input = Math.abs(Number(input));
      setItemQTY(input);
      props.onQuantityChange(input);
    } else {
      const previousValue = itemQTY;
      setItemQTY(previousValue);
    }
  };

  const increaseQty = () => {
    setItemQTY(itemQTY + 1);
    props.onQuantityChange(itemQTY + 1);
  };

  const decreaseQty = () => {
    if (itemQTY <= 1) return;
    setItemQTY(itemQTY - 1);
    props.onQuantityChange(itemQTY - 1);
  };

  return (
    <div className="quantity-selector">
      <button onClick={decreaseQty}>-</button>
      <label htmlFor="qty">QTY:</label>
      <input onChange={inputHandler} type="number" name="qty" id="qty" min="1" max="99" value={itemQTY} />
      <button onClick={increaseQty}>+</button>
    </div>
  );
}

export default QuantitySelector;
