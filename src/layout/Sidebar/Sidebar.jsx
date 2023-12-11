import React, { useState } from 'react';
import './Sidebar.scss'
import { useNavigate } from 'react-router-dom';
import { sideBarMenu } from '../../Data/datalocal';
import Tab from '../../Components/Tab/Tab';


function Sidebar() {

  return (
    <div className='sidebar'>
      <div className="logo-dash">D</div>
      <div className="menu">
        {sideBarMenu.map((item, index) => (
          <div key={index} >
            <Tab data={item}/>
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default Sidebar;



