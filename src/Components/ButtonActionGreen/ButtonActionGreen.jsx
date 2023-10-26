import React, { useRef } from 'react';
import './ButtonActionGreen.scss';
import { Link } from 'react-router-dom';

function ButtonActionGreen(props) {

  //** props => id , className , handler, title */

  const handler = (e) => {
    props.handler()
  }


  return (
    <button id={props.id} className={`greenbtn ${props.className}`} onClick={e => handler(e)} >
      {props.title}
    </button>
  );
}

export default ButtonActionGreen;
