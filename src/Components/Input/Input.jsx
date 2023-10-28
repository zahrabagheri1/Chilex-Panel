import React, { useState } from 'react';
import './Input.scss'
import { HiUser, HiOutlineUser, HiMiniMagnifyingGlass, HiOutlineEye, HiLockClosed, HiOutlineEyeSlash, HiMiniEyeSlash, HiMiniEye } from "react-icons/hi2";

function Input(props) {
  const [value,setValue] = useState(props.value)
  const [eye, setEye] = useState(false)

  const icons = {
    HiUser: <HiUser />,
    HiOutlineUser: <HiOutlineUser />,
    HiOutlineEye: <HiOutlineEye />,
    HiLockClosed: <HiLockClosed />,
    HiOutlineEyeSlash: <HiOutlineEyeSlash />,
    HiMiniEyeSlash: <HiMiniEyeSlash />,
    HiMiniEye: <HiMiniEye />,
    HiMiniMagnifyingGlass: <HiMiniMagnifyingGlass/>,
  }

  const eyeHandler = () => {
    setEye(!eye)
  }


  const changeInputHandler = (e) => {
    setValue(e.target.value)
    props.changeInputValue(e)
  }


  return (
    <div className='inputBox'>
      <div className="lable">
        <div id=''>{props.title}</div>
      </div>
      <div className="input">
        <div className='inputIcon'>{icons[props.icon]}</div>
        {props.type === "textarea" ?
          <textarea
            name={props.name}
            className={`inputControl ${props.classname}`}
            disabled={props.disabled}
            value={value}
            dir={props.dir}
            id={props.title}
            maxlength={props.maxlength}
            readOnly={props.readOnly}
            onChange={changeInputHandler}
          ></textarea>
          :
          <input
            type={props.type === 'password'? (eye === true ? 'text': 'password') : props.type}
            className={`inputControl ${props.classname}`}
            name={props.name}
            value={value}
            placeholder={props.placeholder}
            readOnly={props.readOnly}
            dir={props.dir}
            disabled={props.disabled}
            checked={props.checked}
            onChange={changeInputHandler}
            ref={props.ref}
          />}
        <div className={`passwordEye ${props.type === 'password' ? 'active' : ''}`} onClick={eyeHandler}>
          {eye === true ?<HiMiniEye/>:<HiMiniEyeSlash/>}
        </div>
      </div>
      <div className="error">
        <div className="errorText">
          {props.error}
        </div>
      </div>
    </div>
  );
}

export default Input;






