import React, { useRef } from 'react';
import './ButtonActionGreen.scss';
import { Link } from 'react-router-dom';

function Button(props) {

  const btn = useRef();
  const submitHandler =(e)=>{

  }
  return (
    <div to={props.path} className='greenbtnBox'>
      <button id={props.id} className={`greenbtn ${props.className}`} onClick={e => submitHandler(e) } >{props.title}</button>
    </div>
  );
}

export default Button;
