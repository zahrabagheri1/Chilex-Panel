import React, { useState } from 'react';
// import '../../Components/Dropdown/Dropdown.scss';

function Dropdown() {
    const [click, setClick]= useState(false);

    const clickHandler = ()=>{
        setClick(!click)
    }

    return (
    <div className='btn'>
      <div className='btnTitle' onClick={clickHandler}>Dropdown</div>
      <div className='box' style={{display: (click === true? "flex": 'none')}}>
        <div className='more'>More</div>
        <div className='delete'>Delete</div>
      </div>
    </div>
  );
}

export default Dropdown;
