import React from 'react';
import './Button.scss';

function Button(props) {
  return (
    <div className='btnBox'>
      <button className={`btn ${props.className}`}>{props.title}</button>
    </div>
  );
}

export default Button;
