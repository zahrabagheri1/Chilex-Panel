import React, { useRef, useState } from 'react';
import './Switch.scss';

// const props = {
//   id: '2',
//   error: false,
//   defaultChecked: false,
//   errorText: '',
//   disabled: true,
//    onChange: function
// }

function Switch(props) {
  const [value, setValue] = useState(props.defaultChecked)
  const inputValue = useRef('')


  const changeSwitchHandler = () => {
    // console.log(props.defaultChecked, !value, props.id)
    setValue(!value);
    props.onChange(!value, props.id)
  }

  return (
    <div className={`switchCheckbox ${props.classname}`}>
      <div className={`header-title ${props.disabledDiv ? 'disabledTitle': ''}`}>
        <div>{props.title}</div>
      </div>
      <label className='switch'>
        <input
          type='checkbox'
          checked={value}
          disabled={props.disabled}
          ref={inputValue}
          onChange={() => changeSwitchHandler()}
        />
        <span className='slider round'></span>
      </label>
      <div className={`error ${props.disabledDiv ? 'disabledError': ''}`}>{props.errorText}</div>

    </div>
  );
}

export default Switch;
