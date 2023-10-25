import React from 'react';
import './Button.scss';
import { Link } from 'react-router-dom';

function Button(props) {
  return (
    <Link to={props.path} className='btnBox'>
      <button className={`btn ${props.className}`}>{props.title}</button>
    </Link>
  );
}

export default Button;
