import React from 'react';
import { Outlet } from 'react-router-dom';
import './Banuser.scss';

function Banuser() {
  return (
    <div className='banuser'>
      <Outlet/>
    </div>
  );
}

export default Banuser;
