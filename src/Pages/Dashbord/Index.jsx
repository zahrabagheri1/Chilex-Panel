import React from 'react';
import Navigation from '../../layout/Navigation/Navigation';
import Sidebar from '../../layout/Sidebar/Sidebar';
import './Dashbord.scss';

function Index() {
  return (
    <div className='dashbord'>
      <div className='sidebar'>
        <Sidebar />
      </div>
      <div className='navigation'>
        <Navigation />
      </div>

    </div>
  );
}

export default Index;
