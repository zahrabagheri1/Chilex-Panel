import React from 'react';
import { Outlet } from 'react-router-dom';

function Index() {
  return (
    <div className='transaction'>
      <Outlet />
    </div>
  );
}

export default Index;
