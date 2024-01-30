import React from 'react';
import './Conversation.scss';
import user from '../../Assets/image/user.jpg';

function Conversation(props) {

  const OpenChat = (id, img, username) => {
    props.click(id, img, username)
  }

  return (
    <div className='conversation' onClick={() => OpenChat(props.data.userId, props.data.img, props.data.username)}>
      <img className='conversationImg' src={props.data.img ? props.data.img : user} alt={`img of user ${props.data.name}`} srcSet="" />
      <div className='data'>
        <div className="username">{props.data.username}</div>
        <div className="lastmsg">{props.data.message}</div>
      </div>
    </div>
  );
}

export default Conversation;
