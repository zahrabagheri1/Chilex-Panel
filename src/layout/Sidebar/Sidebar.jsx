import React, { useState } from 'react';
import './Sidebar.scss'
import { useNavigate } from 'react-router-dom';
import { sideBarMenu } from '../../Data/datalocal';
import Tab from '../../Components/Tab/Tab';
import { useCookies } from 'react-cookie';

function Sidebar() {
  const [isActive, setActive] = useState(null)
  const [removeCookie] = useCookies(['accessToken']);
  const navigate = useNavigate()

  const activeTab = (item) => {
    if (item.logout === true) {
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      removeCookie('accessToken', {
        expires: 'Thu, 01 Jan 1970 00:00:00 UTC',
        path: '/',
      })
      navigate(item.path)
    } else if (item.children === null) {
      setActive(item.id)
      navigate(item.path)
    } else {
      setActive(item.id)
    }
  }

  return (
    <div className='sidebar active'>
      <div className="logo-dash">Chilex</div>
      <div className="menu">
        {sideBarMenu.map((item, index) => (
          <div key={index} >
            <Tab data={item} id={item.id} active={isActive === item.id} activeHandler={activeTab} />
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default Sidebar;