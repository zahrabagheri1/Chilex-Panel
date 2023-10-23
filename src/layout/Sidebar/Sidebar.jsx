import React, { useState } from 'react';
import './Sidebar.scss'
import Logo from '../../Assets/image/logo/logo.png'
import { HiMiniCreditCard, HiMiniArrowDownTray, HiMiniSwatch, HiPuzzlePiece, HiMiniUsers, HiOutlineArrowLeftOnRectangle, HiInboxArrowDown, HiComputerDesktop } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import { sideBarMenu } from '../../Data/datalocal';


function Sidebar() {
  const [child, setChild] = useState(false)
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

  const showChild = () => {

    setChild(!child)
  }

  sideBarMenu.map((item, key) => (
    item.children?.map((child) => (
      console.log(child)
    ))
  ))

  return (
    <div className='sidebar'>
      <div className="logo-dash"><img className='logo' src={Logo} /></div>
      <div className="menu">
        {sideBarMenu.map((item, key) => (
          <div>
            <Link to={item.link} key={key} className='item' onClick={item.children ? showChild : item.name}>
              <div className='icon'>{icons[item.icon]}</div>
              <div className=''>{item.name}</div>
            </Link>

            <div className=''>
              {child === true ?
                item.children?.map((childItem) => (
                  <Link to={childItem.link} key={key} className='childItem'>
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