import moment from 'moment-jalaali';
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
    <div className={props.own !== -1 ? 'message' :  'ownMessage'}>
      <div className="messageTextBox">
        <div className="messageText">{props.message}</div>
        <div className="messageTime">
          <div className="messageTimeDate">{moment(props.time).format('YYYY/MM/DD - HH:MM')}</div>
          {/* <div className="messageRead">
            {read ?
              <RiCheckDoubleFill />
              :
              <RiCheckFill />
            }
          </div> */}
        </div>
      </div>
    </div>

  );
}

export default Message;
