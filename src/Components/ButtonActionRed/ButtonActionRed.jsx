import React, { useRef } from 'react';
import './ButtonActionRed.scss';
import { Link } from 'react-router-dom';

function ButtonActionRed(props) {

  const handler = (e) => {
    props.handler()
  }

  return (
    <button id={props.id} className={`redbtn ${props.className}`} onClick={e => handler(e)} >
        {props.title}
    </button>
  );
}

export default ButtonActionRed;
