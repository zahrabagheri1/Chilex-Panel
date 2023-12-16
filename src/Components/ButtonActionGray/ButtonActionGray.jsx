import React, { useRef } from 'react';
import './ButtonActionGray.scss';

function ButtonActionGray(props) {
  //** props => id , className , handler, title */

  const handler = (e) => {
    props.handler(e)
  }

  return (
    <button id={props.id} className={`graybtn ${props.className}`} onClick={e => handler(e)} >
        {props.title}
    </button>
  );
}

export default ButtonActionGray;
