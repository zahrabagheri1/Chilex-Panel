import React from 'react';
import Navigation from '../../layout/Navigation/Navigation';
import Sidebar from '../../layout/Sidebar/Sidebar';
import './Dashbord.scss';
import { Outlet } from 'react-router-dom';

function Index() {
  return (
    <div className='dashbord'>
      <Sidebar/>
      <div className='layout'>
        <Navigation />
        <div className='outlet'><Outlet/></div>
      </div>
    </div>
  );
}

export default Index;
