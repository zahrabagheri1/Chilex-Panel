import React, { useState } from 'react';
import './Sidebar.scss'
import { useNavigate } from 'react-router-dom';
import { sideBarMenu } from '../../Data/datalocal';
import Tab from '../../Components/Tab/Tab';


function Sidebar() {

  return (
    <div className='sidebar active'>
      <div className="logo-dash">Chilex</div>
      <div className="menu">
        {sideBarMenu.map((item, index) => (
          <div key={index} >
            <Tab data={item} id={item.id}/>
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default Sidebar;



