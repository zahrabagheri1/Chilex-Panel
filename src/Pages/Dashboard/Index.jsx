import React from 'react';
import Navigation from '../../layout/Navigation/Navigation';
import Sidebar from '../../layout/Sidebar/Sidebar';
import './Dashboard.scss';
import { Outlet } from 'react-router-dom';
import Switch from '../../Components/Switch/Switch';

function Index() {
  return (
    <div className='dashbord'>
      <Sidebar />
      <div className='layout1 active'>
        <Navigation />
        <div className='outlet'><Outlet /></div>
      </div>
    </div>
  );
}

export default Index;
