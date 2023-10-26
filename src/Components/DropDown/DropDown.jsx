import React, { useState } from 'react';
import './DropDown.scss';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Link  } from 'react-router-dom';



function DropDown(props) {
    const [open, setOpen] = useState(false);

    const openHandler = ()=>{
        setOpen(!open)
    }

    const deleteHandler = (id) => {
    props.x(id)
    }


  return (
    <div className='dropdwon'>
        <div className='dropTitle' onClick={openHandler} >
            <div>Dropdown</div>
            <div>{open ? <FaAngleUp/> : <FaAngleDown/> }</div>
        </div>
        <div className={`drop ${open ? " active" : ""}`}>
            <Link to={`/user/${props.id}`} className='more'>More</Link>
            <div className='delete' onClick={()=>deleteHandler(props.id)}>Delete</div>
        </div>
    </div>
  );
}

export default DropDown;
