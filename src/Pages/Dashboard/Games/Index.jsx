import React from 'react';
import { Outlet } from 'react-router-dom';

function Index() {
  return (
    <div>
        <Outlet/>
    </div>
  );
}

export default Index;
