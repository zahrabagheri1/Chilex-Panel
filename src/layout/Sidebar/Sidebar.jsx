import React from 'react';
import './Sidebar.scss'
import Logo from '../../Assets/image/logo/logo.png'
import { HiMiniCreditCard, HiMiniArrowDownTray, HiPuzzlePiece, HiMiniUsers, HiOutlineArrowLeftOnRectangle, HiInboxArrowDown, HiComputerDesktop} from "react-icons/hi2";
import { Link } from 'react-router-dom';
import {sideBarMenu} from '../../Data/datalocal';


function Sidebar() {
  const icons = {
    HiMiniUsers: <HiMiniUsers/>,
    HiPuzzlePiece: <HiPuzzlePiece/>,
    HiMiniCreditCard: <HiMiniCreditCard/>,
    HiComputerDesktop: <HiComputerDesktop/>,
    HiInboxArrowDown: <HiInboxArrowDown/>,
    HiMiniArrowDownTray: <HiMiniArrowDownTray/>,
    HiOutlineArrowLeftOnRectangle: <HiOutlineArrowLeftOnRectangle/>,
  }
  return (
    <div className='sidebarBox'>
      <div className="logo-dash"><img className='logo' src={Logo}/></div>
      <div className="menu">
        {
          sideBarMenu.map((item, key)=>(
            <Link to={item.link} key={key} className='item'><div className='icon'>{icons[item.icon]}</div><div className=''>{item.name}</div></Link>
          ))
        }
      </div>
    </div>
  );
}

export default Sidebar;
