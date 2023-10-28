import React from 'react';
import './Bandels.scss';
import { Outlet } from 'react-router-dom';

function Index() {

  return (
    <div className='bandels'>
      <Outlet/>
    </div>
  );
}

export default Index;
