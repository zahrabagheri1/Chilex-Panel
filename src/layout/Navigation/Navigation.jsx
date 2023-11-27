import React, { useState } from 'react';
import './Navigation.scss';
import imgUseer from '../../Assets/image/photoUser-removebg-preview.png';
import { Link } from 'react-router-dom';

function Navigation() {

  return (
    <div className='navigation'>
      <Link to={'admin'} className='username'>User Name</Link>
      <img className='imgUser' src={imgUseer} />
    </div>
  );
}

export default Navigation;
