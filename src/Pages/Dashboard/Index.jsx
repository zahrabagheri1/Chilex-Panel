import React from 'react';
import Navigation from '../../layout/Navigation/Navigation';
import Sidebar from '../../layout/Sidebar/Sidebar';
import './Dashboard.scss';
import { Outlet } from 'react-router-dom';
// import ScrollContainer from 'react-indiana-drag-scroll';

function Index() {
  return (
    <div className='dashbord'>
      <Sidebar/>
      <div className='layout1'>
        <Navigation />
        <div className='outlet'><Outlet/></div>
      </div>
    </div>
  );
}

export default Index;
