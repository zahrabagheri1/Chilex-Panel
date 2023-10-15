import React, { useState } from 'react';
import './Navigation.scss';
import imgUseer from '../../Assets/image/photoUser-removebg-preview.png';
import { Link } from 'react-router-dom';

function Navigation() {

  return (
    <div className='navigationBox'>
      <img className='imgUser' src={imgUseer} />
      <Link to={'admin'} className='username'>User Name</Link>
    </div>
  );
}

export default Navigation;
