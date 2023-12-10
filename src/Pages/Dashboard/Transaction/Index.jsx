import React from 'react';
import { Outlet } from 'react-router-dom';
import './Transaction.scss'
function Index() {
  return (
    <div className='transaction'>
      <Outlet />
    </div>
  );
}

export default Index;
