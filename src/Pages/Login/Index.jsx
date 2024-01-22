import React, { useContext, useEffect, useRef, useState } from 'react';
import './Login.scss';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import userPhoto from '../../Assets/image/photoUser-removebg-preview.png';
import { Value } from 'sass';
import axios from 'axios';
import Alert from '../../layout/Alert/Alert';
import { useNavigate } from 'react-router-dom';
import { Cookies, useCookies } from 'react-cookie';
import { LoadingContext } from '../Loading/LoadingContext';
import {API_URL} from '../../API_URL';

function Index() {
  const navigate = useNavigate()
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken'])
  const [user, setUser] = useState({
    username: null,
    password: null,
  });
  const [showAlert, setShowAlert] = useState({
    status: false, msg: '', success: null
  });
  const { loading, setLoading } = useContext(LoadingContext)

  useEffect(() => {
    // balls in background
    const colors = ["#2A85FF", "#0C499B", "#272A2F"];
    const numBalls = 35;
    const balls = [];
    for (let i = 0; i < numBalls; i++) {
      let ball = document.createElement("div");
      ball.classList.add("ball");
      ball.style.background = colors[Math.floor(Math.random() * colors.length)];
      ball.style.left = `${Math.floor(Math.random() * 86)}%`;
      ball.style.top = `${Math.floor(Math.random() * 70)}%`;
      ball.style.transform = `scale(${Math.random()})`;
      ball.style.width = `${Math.random()}em`;
      ball.style.height = ball.style.width;
      balls.push(ball);
      document.getElementsByClassName('loginPage')[0].append(ball);
    }

    balls.forEach((el) => {
      let to = {
        x: Math.random() * 12,
        y: Math.random() * 12
      };

      let anim = el.animate(
        [
          { transform: "translate(0, 0)" },
          { transform: `translate(${to.x}em, ${to.y}em)` }
        ],
        {
          duration: (Math.random() + 1) * 2000,
          direction: "alternate",
          fill: "both",
          iterations: Infinity,
          easing: "ease-in-out"
        }
      );
    });

    // if cookies set dont need login 
    cookies.accessToken ? navigate('/dashboard') : navigate('/');
    setLoading(false)
  }, [])


  const submitData = () => {
    // axios.defaults.withCredentials = true;
    axios.post(`${API_URL === undefined ? '' : API_URL}/auth/admin/login`, {
      username: user.username,
      password: user.password
    }).then(
      res => {
        setCookie('accessToken', res.data.accessToken)
        navigate('/dashboard');
      }
    ).catch(
      err => {
        if (user.password === null && user.username === null) {
          setShowAlert({ status: true, msg: 'filling the blank box', success: false })
          setTimeout(() => {
            setShowAlert({ status: false })
          }, 2000)
        }
        else if (user.password === null) {
          setShowAlert({ status: true, msg: 'fill the password box', success: false })
          setTimeout(() => {
            setShowAlert({ status: false })
          }, 2000)
        } else if (user.username === null) {
          setShowAlert({ status: true, msg: 'fill the username box', success: false })
          setTimeout(() => {
            setShowAlert({ status: false })
          }, 2000)
        } else {
          setShowAlert({ status: true, msg: 'Username or password is not correct! Try again.', success: false })
          setTimeout(() => {
            setShowAlert({ status: false })
          }, 2000)
        }
      }
    )


  }


  const changeValueInput = (e) => {
    setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
    event.preventDefault()
      if (document.activeElement === usernameRef.current) {
        passwordRef.current.focus()
      } else if(document.activeElement === passwordRef.current){
        submitData()
      } 
      
    }
  }

  return (
    <div className='loginPage'>
      {showAlert.status === true ?
        <Alert message={showAlert.msg} success={showAlert.success} />
        :
        ''
      }


      <div className="loginForm">
        <div className='userPhoto'>
          <img src={userPhoto} className='photo' />
          <div className='text' >Log In</div>
        </div>
        <div className='username'>
          <Input type={"text"} inputclassname='loginInput' inputRef={usernameRef} placeholder={"type your username"} required={true} name={'username'} readOnly={false} title={"UserName:"} icon={'HiUser'} changeInputValue={changeValueInput} onKeyDown={handleKeyPress} />
        </div>
        <div className='password'>
          <Input type={"password"} inputclassname='loginInput' inputRef={passwordRef} placeholder={"type your password"} required={true} name={'password'} title={"PassWord:"} icon={'HiLockClosed'} changeInputValue={changeValueInput} onKeyDown={handleKeyPress} />
        </div>
        <Button title="Login" path='/dashboard' className='loginbtn' handler={submitData} />
      </div>
    </div>
  );
}

export default Index;

