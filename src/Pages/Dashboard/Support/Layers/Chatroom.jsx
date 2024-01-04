
import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import ButtonActionBlue from "../../../../Components/ButtonActionBlue/ButtonActionBlue";
import Messege from '../../../../Components/Messege/Messege';
import { socket } from "../../../../Socket";

function Chatroom(props) {
    const [data, setData] = useState(props.data)
    const inputMsg = useRef()
    const [chat, setChats] = useState()

    useEffect(() => {
        ResiveChts(props.id)
    }, [props.id])

    const ResiveChts = (id) => {
        console.log(id);
        console.log('show chat : ' + id)
        const data = { anotherPersonId: id, limit: 300, offset: 0 }
        socket.emit('adminMessage', 'get-a-support-chat', data, (response) => {
            setChats(response)
            console.log(response)
        });
    }
    console.log('chhhhhhhhhhhhh :', chat)
    const sendNewMessage = (e) => {
        console.log(e.target.value, inputMsg.current.value)
    }

    const SendMessage = (e) => {
        console.log('Sended Message : ' + inputMsg.current.value)
        socket.emit('adminMessage', 'chat', {
            message: inputMsg.current.value,
            anotherPersonId: 201,
            messageType: 0
        }, (response) => { console.log('response:', response); });
    }

    return (
        <div className="chatBox col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <div className="chatBoxWrapper">
                <div className="chatBoxMain">
                    <div className="chatboxheader">
                        <div className='chatHeader'>
                            <img className='chatHeaderImg'  alt="" />
                            <div className="chatHeaderName">
                                <div className="chatHeaderusername">{chat?.userName}</div>
                                <div className="chatHeaderactivity">{chat?.status ? 'Online' : ''}</div>
                            </div>
                        </div>
                    </div>
                    <div className="chatboxbody">
                        <div className="chatmessage">
                            {chat?.chatBoxes.map((msg ,index)=>(
                                <div key={index}>
                                    {console.log('sender : '  + msg?.senderId)}
                                    <Messege message={msg.message} name={chat?.userName} img='user' gender='female' receiverId={msg?.receiverId} own={msg?.senderId } time={msg?.date} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="chatBoxTextarea">
                    <textarea
                        className="chatMessageInput"
                        placeholder='write somthing...'
                        ref={inputMsg}
                        onChange={(e) => sendNewMessage(e)}
                    >
                    </textarea>

                    <ButtonActionBlue
                        title={'Send'}
                        className={'chatSubmitButton'}
                        handler={SendMessage}
                    />
                </div>
            </div>
        </div>

    )
}

export default Chatroom;