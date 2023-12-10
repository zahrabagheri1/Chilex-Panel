import React from 'react';
import { Outlet } from 'react-router-dom';
import './Alluser.scss';

function Alluser() {
  return (
    <div className='alluser'>
      <Outlet/>
    </div>
  );
}

export default Alluser;
