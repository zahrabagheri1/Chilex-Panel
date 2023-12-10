import React from 'react';
import { Outlet } from 'react-router-dom';
import './Items.scss';


function Index() {
  return (
    <div className='items'>
      <Outlet/>
    </div>

  );
}

export default Index;
