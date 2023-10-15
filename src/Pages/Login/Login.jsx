import React, { useEffect } from 'react';
import './Login.scss';
import Input from '../../Components/Input/Input';
import data from '../../Data/datalocal';
import Button from '../../Components/Button/Button';
import { Link } from 'react-router-dom';
import loginPhoto from '../../Assets/image/loginPhoto.svg';

function Login() {
  return (
    <div className='loginPage'>
      <div className='loginPhoto'>
        <img src={loginPhoto}></img>
      </div>
      <div className="loginForm">
        <div className='userPhoto'>
          <div className='text' >Log In</div>
        </div>
        <div className='username'>
          <Input type={"text"} placeholder={"type your username"} required={true} name={'user'} title={"UserName:"} icon={'HiUser'} />
        </div>
        <div className='password'>
          <Input type={"password"} placeholder={"type your password"} required={true} title={"PassWord:"} icon={'HiLockClosed'} />
        </div>
        <Link to='/dashboard' className='loginbtn'><Button title={"Login"} /></Link>
      </div>
    </div>
  );
}

export default Login;
