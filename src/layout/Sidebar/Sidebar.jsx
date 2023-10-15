import React from 'react';
import './Sidebar.scss'
import Logo from '../../Assets/image/logo/logo.png'
import {HiCreditCard, HiComputerDesktop, HiChartBar, HiEnvelope, HiHeart, HiGlobeAmericas, HiUser} from "react-icons/hi2";

function Sidebar() {
  return (
    <div className='sidebarBox'>
      <div className="logo-dash"><img className='logo' src={Logo}/></div>
      <div className="menu">
        <ul>
          <li className=''><HiChartBar/> <div className="">DASHBOARD</div></li>
          <li className=''><HiUser/> <div className="">USER PROFILE</div></li>
          <li className=''><HiComputerDesktop/> <div className="">TABLE LIST</div></li>
          <li className=''><HiCreditCard/> <div className="">TYPOGRAPHY</div></li>
          <li className=''><HiHeart/> <div className="">ICONS</div></li>
          <li className=''><HiGlobeAmericas/> <div className="">MAPS</div></li>
          <li className=''><HiEnvelope/> <div className="">NOTIFICATIONS</div></li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
