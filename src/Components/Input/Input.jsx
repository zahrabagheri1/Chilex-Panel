import React, { useEffect, useState } from 'react';
import './Input.scss';
import { HiUser, HiOutlineUser, HiMiniMagnifyingGlass, HiOutlineEye, HiLockClosed, HiOutlineEyeSlash, HiMiniEyeSlash, HiMiniEye } from "react-icons/hi2";

// const props = {
//   title: 'name',
//   name: '',
//   icon: 'HiUser',
//   classname: 'name',
//   type: '',
//   dir: '',
//   disabled: '',
//   maxlength: '',
//   inputclassname: '',
//   readOnly: true,
//   checked: false,
//   ref: '',
//   error: 'errorrrrr! you shitting on it',
// }

function Input(props) {
  const [value, setValue] = useState(props.value)
  const [eye, setEye] = useState(false)
  
  const icons = {
    HiUser: <HiUser />,
    HiOutlineUser: <HiOutlineUser />,
    HiOutlineEye: <HiOutlineEye />,
    HiLockClosed: <HiLockClosed />,
    HiOutlineEyeSlash: <HiOutlineEyeSlash />,
    HiMiniEyeSlash: <HiMiniEyeSlash />,
    HiMiniEye: <HiMiniEye />,
    HiMiniMagnifyingGlass: <HiMiniMagnifyingGlass />,
  }

  const eyeHandler = () => {
    setEye(!eye)
  }


  const changeInputHandler = (e) => {
    setValue(e.target.value)
    props.changeInputValue(e, props.id)
  }

  useEffect(() => {
   setValue(props.value)
  }, [props.value])

  return (
    <div className={`inputBox ${props.classname}`}>
      <div className="header-title">
        <div id='' className='title' >{props.title}</div>
        {
          props.important === true ?
            <div className="shouldfill"></div>
            :
            ''

        }
      </div>
      <div className="input">
        <div className='inputIcon'>{icons[props.icon]}</div>
        {props.type === "textarea" ?
          <textarea
            name={props.name}
            className={`inputControl ${props.inputclassname}`}
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
            type={props.type === 'password' ? (eye === true ? 'text' : 'password') : props.type}
            className={`inputControl ${props.inputclassname} ${props.readOnly === true ? 'readonlytext' : 'notreadonlytext'}`}
            name={props.name}
            value={value}
            placeholder={props.placeholder}
            readOnly={props.readOnly}
            dir={props.dir}
            disabled={props.disabled}
            checked={props.checked}
            min={props.min}
            max={props.max}
            onChange={changeInputHandler}
            ref={props.inputRef}
            onKeyDown={props.onKeyDown}
            autoComplete='off'
          />}
        <div className={`passwordEye ${props.type === 'password' ? 'active' : ''}`} onClick={eyeHandler}>
          {eye === true ? <HiMiniEye /> : <HiMiniEyeSlash />}
        </div>
      </div>
      {/* <div className="error">
        <div className="errorText">
          {props.error}
        </div>
      </div> */}
    </div>
  );
}

export default Input;






