import React from 'react';

function Button(props) {
  return (
    <button onClick={props.onButtonClick}>
      {props.name}
    </button>
  );
}

export default Button;
