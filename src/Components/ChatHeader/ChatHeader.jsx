import React from 'react';
import user from '../../Assets/image/user.jpg';
import './ChatHeader.scss';
const props = {
    data: {
        name: 'Zohre',
        img: user,
        status: true,
        lastseen: '2 hours ago'
    }
}
function ChatHeader() {
    return (
        <div className='chatHeader'>
            <img className='chatHeaderImg' src={props.data.img ? props.data.img : user} alt="" />
            <div className="chatHeaderName">
                <div className="chatHeaderusername">{props.data.name ? props.data.name : 'Zohreh'}</div>
                <div className="chatHeaderactivity">{props.data.status ? 'Online' : props.data.lastseen ? ('last seen ' + props.data.lastseen) : 'last seen long time'}</div>
            </div>
        </div>
    );
}

export default ChatHeader;
