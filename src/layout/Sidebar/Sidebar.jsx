import React, { useState } from 'react';
import './Sidebar.scss'
import Logo from '../../Assets/image/logo/logo.png'
import { HiRocketLaunch, HiMiniUser, HiMiniShoppingCart, HiMiniCreditCard, HiMiniArrowDownTray, HiMiniSwatch, HiCurrencyDollar, HiMiniChatBubbleLeftRight, HiOutlineArrowLeftOnRectangle, HiInboxArrowDown, HiComputerDesktop } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import { sideBarMenu } from '../../Data/datalocal';


function Sidebar() {
  const [child, setChild] = useState(false)
  const [click, setClick] = useState(false)
  const icons = {
    HiRocketLaunch: <HiRocketLaunch />,
    HiCurrencyDollar: <HiCurrencyDollar />,
    HiMiniCreditCard: <HiMiniCreditCard />,
    HiMiniSwatch: <HiMiniSwatch />,
    HiComputerDesktop: <HiComputerDesktop />,
    HiInboxArrowDown: <HiInboxArrowDown />,
    HiMiniArrowDownTray: <HiMiniArrowDownTray />,
    HiMiniChatBubbleLeftRight: <HiMiniChatBubbleLeftRight />,
    HiOutlineArrowLeftOnRectangle: <HiOutlineArrowLeftOnRectangle />,
    HiMiniShoppingCart: <HiMiniShoppingCart />,
    HiMiniUser: <HiMiniUser/>
    
  }

  const clickHandler = (key) => {
    setClick(key)
  }

  const showChild = () => {
    setChild(!child)
  }



  return (
    <div className='sidebar'>
      <div className="logo-dash">D</div>
      <div className="menu">
        {sideBarMenu.map((item, key) => (
          <div key={key} >
            <Link to={item.link} className={`tab ${click === true ? 'active' : ''}`} onClick={item.children ? showChild : clickHandler}>
              <div className='icon'>{icons[item.icon]}</div>
              <div className='tabText'>{item.name}</div>
            </Link>

            <div className='child'>
              {child === true ?
                item.children?.map((childItem, index) => (
                  <Link to={childItem.link} key={index} className={`childItem ${click === true ? 'active' : ''}`}>
                    <div className='icon'>{icons[childItem.icon]}</div>
                    <div className=''>{childItem.name}</div>
                  </Link>
                ))
                : null
              }
            </div>
          </div>

        ))
        }
      </div>
    </div>
  );
}

export default Sidebar;



