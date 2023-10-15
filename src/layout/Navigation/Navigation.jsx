import React, { useState } from 'react';
import './Navigation.scss';
import {HiBellAlert, HiSun, HiMoon} from "react-icons/hi2";
import Input from '../../Components/Input/Input';
import imgUseer from '../../Assets/image/photoUser-removebg-preview.png';
import { Link } from 'react-router-dom';

function Navigation() {
  const [theme , setTheme] = useState(true)
  const themeHandler =() =>{
    setTheme(!theme)
  }


  return (
    <div className='navigationBox'>
      <div className='iconbtns'>
      <div className='switchTheme' onClick={themeHandler}>
        <div className="themeicon">{theme === true ? <HiMoon/> : <HiSun/>}</div>
      </div>
      <div className='notifBox'><HiBellAlert/></div>
      <div className='notifBox'><HiBellAlert/></div>
      </div>
      {/* <div className='searchBox'><Input type={"search"} icon={'HiMiniMagnifyingGlass'}/></div> */}
      <div className='logOutUser'>
        <div className='userBox'>
          <img className='imgUser' src={imgUseer}/>
        </div>
        <Link to={"/"} className='logout'><div>Log Out</div></Link>
      </div>
    </div>
  );
}

export default Navigation;
