import React from 'react';
import './Button.scss';
import { Link } from 'react-router-dom';

function Button(props) {
  const handler = (e) => {
    // props.handler()
  }

  return (
    <Link to={props.path} className={`btnBox ${props.classnameBtn}`}>
      <button className={`btn ${props.className} ${props.disabled === true ? 'disableBtn': ''}`} disabled={props.disabled} onClick={e => handler(e)}>{props.title}</button>
    </Link>
  );
}

export default Button;
