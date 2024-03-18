import React from 'react';
import './ButtonActionBlue.scss';

function ButtonActionBlue(props) {

  const handler = (e) => {
    props.handler(e)
  }

  return (
    <button id={props.id} className={`greenbtn ${props.className}`} onClick={e => handler(e)} >
      {props.title}
    </button>
  );
}

export default ButtonActionBlue;
