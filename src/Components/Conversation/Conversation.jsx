import './Conversation.scss';
import React, { useState } from 'react';
import user from '../../Assets/image/user.jpg';
const props ={
    name: "Zahra Bagheri",
    gender: 'female',
    img: user,
}

function Conversation() {

    const [data, setData] = useState({})
  
    const gotopv = () => {
    }
   
    return (
      <div className='conversation' onClick={() => gotopv()}>
        <img className='conversationImg' src={props.img ? props.img : user} alt={`img of user ${props.name}`} srcset="" />
        <div className="conversationName">{props.name}</div>
      </div>
    );
  }
  
  export default Conversation;
  