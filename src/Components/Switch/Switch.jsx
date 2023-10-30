import React, { useRef, useState } from 'react';
import './Switch.scss';

// const props = {
//   id: 'checkbox_X',
//   error: false,
//   defaultChecked: false,
//   errorText: '',
//   disabled: true,
//    onChange
// }

function Switch(props) {
  const [value, setValue] = useState(props.defaultChecked)
  const inputValue = useRef('')

  console.log(props.defaultChecked)
  const changeSwitchHandler = () => {
    setValue(!value);
    props.onChange(!value, inputValue.current.id)
  }

  return (
    <div className={`switchCheckbox ${props.className}`}>

      <label className='switch'>
        <input
          type='checkbox'
          id={props.id}
          checked={value}
          disabled={props.disabled}
          ref={inputValue}
          onChange={() => changeSwitchHandler()}
        />

        <span className='slider round'></span>
      </label>
      <div className='error'>{props.errorText}</div>

    </div>
  );
}

export default Switch;
