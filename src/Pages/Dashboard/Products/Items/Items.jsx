import React from 'react';
import './Items.scss';

import { Outlet } from 'react-router-dom';



function Index() {
  return (
    <div className='items'>
      <Outlet/>
    </div>

  );
}

export default Index;
