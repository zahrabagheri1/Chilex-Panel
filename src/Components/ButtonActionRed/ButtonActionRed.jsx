import React, { useRef } from 'react';
import './ButtonActionRed.scss';
import { Link } from 'react-router-dom';

function Button(props) {
  
  const backHandler =(e)=>{

  }
  return (
    <div to={props.path} className='btnBox'>
      <button id={props.id} className={`btn ${props.className}`} onClick={e => backHandler(e) } >{props.title}</button>
    </div>
  );
}

export default Button;
