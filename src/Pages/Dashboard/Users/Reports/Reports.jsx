import React from 'react';
import { Outlet } from 'react-router-dom';
import './Reports.scss';

function Reports() {
  return (
    <div className='reports'>
      <Outlet/>
    </div>
  );
}

export default Reports;
