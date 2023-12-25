import React from 'react';
import user from '../../Assets/image/user.jpg';
import './Messege.scss';
// import { format } from 'timeago.js';
const propss = {
  name: 'zizi',
  img: user,
  gender: 'female',
  own: true,
  message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.Voluptas nostrum labore sit laborum nulla corporis minus asperiores vitae impedit? Ullam!',
  time: '1 hour ago',
}

function Message(props) {
  return (
    <div className={props.own ? 'ownMessage' : 'message'}>
        <img src={props.img} className={'messageImg'} alt="" srcset="" />
        <div className="messageTextBox">
          <div className="messageText">{propss.message}</div>
          <div className="messageTime">{props.time}</div>
        </div>
      </div>
  );
}

export default Message;
