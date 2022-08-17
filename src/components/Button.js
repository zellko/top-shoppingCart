import React from 'react';

function Button(props) {
  return (
    <button onClick={props.onAddToCart}>
      {props.name}
    </button>
  );
}

export default Button;
