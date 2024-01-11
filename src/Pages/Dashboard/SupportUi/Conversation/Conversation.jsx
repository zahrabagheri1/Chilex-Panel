import React, { useEffect } from 'react'
import './Conversation.scss'
import user from '../../../../Assets/image/user.jpg';

function Conversation(props) {

    useEffect(() => {
        // console.log('Conversation : ' + props.data)
    })

    const OpenChat = (id) => {
        console.log('OpenChat : ' + id)
        props.click(id)
    }

    return (
        <div className={`chatconversolo`} onClick={() => OpenChat(props.data.userId)}>
            <img src={props.data.img ? props.data.img : user} alt="" className='imgUser' />
            <div className="">
                <div className="nameuserconver">{props.data.username}</div>
                <div className="lastmessage">{props.data.message}</div>
            </div>

        </div>

    )
}

export default Conversation;