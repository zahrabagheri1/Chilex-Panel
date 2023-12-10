import React from 'react';
import { Outlet } from 'react-router-dom';
import './Bundles.scss';

function Index() {

  return (
    <div className='bundles'>
      <Outlet/>
    </div>
  );
}

export default Index;
