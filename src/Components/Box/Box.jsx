import React, { useState } from 'react';
import './Box.scss';

function Box(props) {
    const [markAsRead, setmarkAsRead] = useState(false)

    const readHandler = () => {
        setmarkAsRead(true)
    }

    return (
        <div className='ntf' >
            <div className='textBox'>
                <p>{props.text}</p>
                <div className='dateread'>
                    <p>{props.date}</p>
                    <p className='read' style={{ display: markAsRead === true ? 'none' : '' }} onClick={readHandler}>Mark as read</p>
                </div>
            </div>
            <div className='mark' style={{ display: markAsRead === true ? 'none' : '' }}></div>
        </div>
    );
}

export default Box;
