import './Conversation.scss';
import React, { useState } from 'react';
import user from '../../Assets/image/user.jpg';
import { useEffect } from 'react';


function Conversation(props) {

  useEffect(() => {
    // console.log('Conversation : ' + props.data)
  })
  const OpenChat = (id) => {
    console.log('OpenChat : ' + id)
    props.click(id)
  }

  return (
    <div className='conversation' onClick={() => OpenChat(props.data.userId)}>
      <img className='conversationImg' src={props.data.img ? props.data.img : user} alt={`img of user ${props.data.name}`} srcSet="" />
      <div className='data'>
        <div className="username">{props.data.username}</div>
        <div className="msg">{props.data.message}</div>
      </div>
    </div>
  );
}

export default Conversation;
