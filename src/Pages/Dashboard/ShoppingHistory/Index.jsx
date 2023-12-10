import React from 'react';
import { Outlet } from 'react-router-dom';
import './shoppingHistory.scss';

function Index() {
  return (
    <div className='shoppingHistory'>
      <Outlet/>
    </div>
  );
}

export default Index;
