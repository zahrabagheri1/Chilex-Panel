import React, { useRef } from 'react';
import './ButtonActionRed.scss';

function ButtonActionRed(props) {
  //** props => id , className , handler, title */

  const handler = (e) => {
    props.handler(e)
  }

  return (
    <button id={props.id} className={`redbtn ${props.className}`} onClick={e => handler(e)} >
        {props.title}
    </button>
  );
}

export default ButtonActionRed;
