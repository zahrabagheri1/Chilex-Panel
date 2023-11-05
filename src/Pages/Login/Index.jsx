import React, { useEffect } from 'react';
import './Login.scss';
import Input from '../../Components/Input/Input';
import data from '../../Data/datalocal';
import Button from '../../Components/Button/Button';
import loginPhoto from '../../Assets/image/loginPhoto.svg';
import userPhoto from '../../Assets/image/photoUser-removebg-preview.png';

function Index() {

  useEffect(() => {
    const colors = ["#FFD500", "#FDC500", "#5C0099", "#510087", "#3D0066"];
    const numBalls = 25;
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
  })




  return (
    <div className='loginPage'>
      <div className="loginForm">
        <div className='userPhoto'>
          <img src={userPhoto} className='photo' />
          <div className='text' >Log In</div>
        </div>
        <div className='username'>
          <Input type={"text"} inputclassname='loginInput' placeholder={"type your username"} required={true} name={'user'} title={"UserName:"} icon={'HiUser'}/>
        </div>
        <div className='password'>
          <Input type={"password"} inputclassname='loginInput' placeholder={"type your password"} required={true} title={"PassWord:"} icon={'HiLockClosed'} />
        </div>
        <Button title="Login" path='/dashboard' className='loginbtn'/>
      </div>
    </div>
  );
}

export default Index;

