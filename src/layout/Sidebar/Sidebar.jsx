import React, { useState } from 'react';
import './Sidebar.scss'
import Logo from '../../Assets/image/logo/logo.png'
import { HiMiniCreditCard, HiMiniArrowDownTray, HiMiniSwatch, HiPuzzlePiece, HiMiniUsers, HiOutlineArrowLeftOnRectangle, HiInboxArrowDown, HiComputerDesktop } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import { sideBarMenu } from '../../Data/datalocal';


function Sidebar() {
  const [child, setChild] = useState(false)
  const [click, setClick] = useState(false)
  const icons = {
    HiMiniUsers: <HiMiniUsers />,
    HiPuzzlePiece: <HiPuzzlePiece />,
    HiMiniCreditCard: <HiMiniCreditCard />,
    HiMiniSwatch: <HiMiniSwatch />,
    HiComputerDesktop: <HiComputerDesktop />,
    HiInboxArrowDown: <HiInboxArrowDown />,
    HiMiniArrowDownTray: <HiMiniArrowDownTray />,
    HiOutlineArrowLeftOnRectangle: <HiOutlineArrowLeftOnRectangle />,
  }

  const clickHandler = () =>{
    setClick(!click)
  }

  const showChild = () => {
    setChild(!child)
  }

  return (
    <div className='sidebar'>
      <div className="logo-dash"><img className='logo' src={Logo} /></div>
      <div className="menu">
        {sideBarMenu.map((item, key) => (
          <div key={key} >
            {/* <Link to={item.link} key={key} className={`item ${click === true ? 'active' : '' }`} onClick={item.children ? showChild : (e) => clickHandler(e)}> */}
            
            <Link to={item.link} className='tab' onClick={item.children ? showChild : clickHandler}>
              <div className='icon'>{icons[item.icon]}</div>
              <div className=''>{item.name}</div>
            </Link>

            <div className='child'>
              {child === true ?
                item.children?.map((childItem , index) => (
                  <Link to={childItem.link} key={index} className='childItem'>
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



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';

// const SubMenu = ({ item }) => {
//   const [subnav, setSubnav] = useState(false);

//   const showSubnav = () => setSubnav(!subnav);

//   return (
//     <>
//       <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
//         <div>
//           {item.icon}
//           <SidebarLabel>{item.title}</SidebarLabel>
//         </div>
//         <div>
//           {item.subNav && subnav
//             ? item.iconOpened
//             : item.subNav
//             ? item.iconClosed
//             : null}
//         </div>
//       </SidebarLink>

//       {subnav &&
//         item.subNav.map((item, index) => {
//           return (
//             <DropdownLink to={item.path} key={index}>
//               {item.icon}
//               <SidebarLabel>{item.title}</SidebarLabel>
//             </DropdownLink>
//           );
//         })}
//     </>
//   );
// };

// export default SubMenu;