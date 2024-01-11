import moment from 'moment-jalaali'
import React from 'react'

function Message(props) {
  return (
    <div className={props.own !== -1 ? 'ownMessage' : 'message'}>
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

  )
}

export default Message