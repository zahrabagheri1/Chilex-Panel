import React from 'react';
import { Outlet } from 'react-router-dom';

function ShoppingHistory() {
  return (
    <div className='shoppingHistory'>
      <Outlet/>
    </div>
  );
}

export default ShoppingHistory;
