
import React, { useRef } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import ButtonActionBlue from "../../../../Components/ButtonActionBlue/ButtonActionBlue";
import Messege from '../../../../Components/Messege/Messege';
import { socket } from "../../../../Socket";

function Chatroom(props) {
    const [data, setData] = useState(props.data)
    const inputMsg = useRef()
    const [chat, setChats] = useState()
    const scrollEnd = useRef(null)
    const [counterChats, setCounterChats] = useState(20)

    useEffect(() => {
        ResiveChts(props.id)
        
        scrollEnd.current.addEventListener('scroll', handleScroll);
        return () => {
            scrollEnd.current.removeEventListener('scroll', handleScroll);
        };
    console.log('chat : ', counterChats)

    }, [props.id])

    const saveMessages = useMemo(() => ({ chat, setChats }), [])

    const handleScroll = () => {
        console.log(counterChats)
        setCounterChats(counterChats + 5)

        if (counterChats === 20) {
            return ''
        } else {
            if (scrollEnd.current.scrollTop === 0) {
                console.log(11)
                ResiveChts(props.id)
                console.log('counter sended :' , counterChats)

            }
        }

    };
    const ResiveChts = (id) => {
        console.log('------------------------- 1 -------------------------',counterChats , counterChats -5)
        const data = { anotherPersonId: id, limit: counterChats, offset: 0 }
        socket.emit('adminMessage', 'get-a-support-chat', data, (response) => {
            setChats(response.chatBoxes)
            saveMessages.chat === undefined || saveMessages.chat === null ? setChats(response.chatBoxes) : response.chatBoxes.map((Newchat) => { console.log('------------------------- 2 -------------------------',Newchat) })
            console.log('new : ', saveMessages)

            if (counterChats === 20 || scrollEnd.current) {
                scrollEnd.current.scrollTop = scrollEnd.current.scrollHeight;
            }
        });
    }
    const sendNewMessage = (e) => {
        // console.log(e.target.value, inputMsg.current.value)
    }

    const SendMessage = (e) => {
        // console.log('Sended Message : ' + inputMsg.current.value)
        socket.emit('adminMessage', 'chat', {
            message: inputMsg.current.value,
            anotherPersonId: props.id,
            messageType: 0
        }, (response) => {
            // console.log('response:', response)   
            ResiveChts(props.id)
            inputMsg.current.value = ''
        });
    }

    console.log("saveed :  ", saveMessages)
    console.log('chat : ', chat)
    const log = () => {
        console.log(scrollEnd.current.scrollTop, scrollEnd.current.scrollHeight, scrollEnd.current.scrollHeight)

    }
    return (
        <div className="chatBox col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <div className="chatBoxWrapper">
                <div className="chatBoxMain">
                    <div className="chatboxheader">
                        <div className='chatHeader'>
                            <img className='chatHeaderImg' src="" alt="" />
                            <div className="chatHeaderName">
                                <div className="chatHeaderusername">{chat?.userName}</div>
                                <div className="chatHeaderactivity">{chat?.status ? 'Online' : ''}</div>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleScroll}>log</button>
                    <div ref={scrollEnd} className="chatboxbody">
                        {chat?.map((msg, index) => (
                            <div key={index}>
                                <Messege message={msg.message} name={chat?.userName} img='user' gender='female' receiverId={msg?.receiverId} own={msg?.senderId} time={msg?.date} />
                            </div>
                        )).reverse()
                        }
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