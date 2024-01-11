import React, { useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import { socket } from '../../../../Socket'
import Message from '../Message/Message'

function ChatRoom(props) {

    const inputMsg = useRef()
    const scrollEnd = useRef(null)
    const [chat, setChat] = useState()
    const [limit, setLimit] = useState(0)
    const [saveMessages, setSaveMessage] = useState([])

    useEffect(() => {
        ResiveChts(props.id, limit)
        scrollEnd.current.addEventListener('scroll', handleScroll)
        return () => {
            scrollEnd.current.removeEventListener('scroll', handleScroll)
        }
    }, [props.id])


    const handleScroll = (counter) => {
        if (counter === 0) {
            if (scrollEnd.current.scrollTop === 0) {
                scrollEnd.current.scrollTop = scrollEnd.current.scrollHeight
            }
        } else {
            if (scrollEnd.current.scrollTop === 0) {
                // setLimit(counter + 15)
                console.log('limit: ', limit)
                // ResiveChts(props.id, limit)
            }
        }
        console.log('handleScroll : ', scrollEnd.current.scrollHeight)
    }


    const ResiveChts = (id, counter) => {
        const data = { anotherPersonId: id, limit: 15, offset: counter }
        socket.emit('adminMessage', 'get-a-support-chat', data, (response) => {
            setChat(response.chatBoxes)
            handleScroll(counter + 15)
            setLimit(counter + 15)
        })
    }

    console.log("Saved :  ", saveMessages)
    console.log('Chat : ', chat)

    const ReadMoreMessages = (data) => {
        setLimit(limit + 15)
        ResiveChts(props.id, limit)
        saveMessages.push()
        chat.map((saveChat) => { saveMessages.push(saveChat) })
    }

    const SendMessage = () => {
        socket.emit('', 'chat', {
            message: inputMsg.current.value,
            anotherPersonId: props.id,
            messageType: 0
        }, (response) => {
            console.log('response:', response)
            ResiveChts(props.id, limit)
            inputMsg.current.value = ''
        })
    }

    return (
        <div className='chatroom'>
            <div className="headerchat">
                <div className="headerchatWrapper">

                    <div className="infoheader">
                        <img src={ninja} alt="" className='imgUser' />
                        <div className="usernamelastseen">
                            <div className="username">{chat?.userName}</div>
                            <div className="lastseen">{chat?.status ? 'Online' : ''}</div>
                        </div>
                    </div>

                    <div className="threeline " onclick={fullscreenchat}> <HiBars3 /></div>
                </div>
            </div>

            <div className="mainchatBox">
                <div className="mainchatBoxWrapper">
                    
                    {
                        chat ?
                            <div className="mainchat" >

                                {/* <div className="readmoremessage">
                                    <div className="textlineright"></div>
                                    <div className="readmore" onclick={showmoremessage}>read more</div>
                                    <div className="textlinelift"></div>
                                </div> */}

                                <button className='readmoremessages' onclick={ReadMoreMessages}>read more</button>

                                <div className="chattss" ref={scrollEnd}>
                                    {
                                        chat?.map((msg, index) => (
                                            <div key={index}>
                                                <Message message={msg.message} receiverId={msg?.receiverId} own={msg?.senderId} time={msg?.date} />
                                            </div>
                                        )).reverse()
                                    }

                                    {
                                        saveMessages?.map((msg, index) => (
                                            <div key={index}>
                                                <Message message={msg.message} receiverId={msg?.receiverId} own={msg?.senderId} time={msg?.date} />
                                            </div>
                                        )).reverse()
                                    }

                                </div>
                            </div>

                            :
                            <div className="noChat">
                                <div className="noChatTitle">
                                    You Don't Have Any Conversation
                                </div>
                                <div className="noChatSubTitle">
                                    Let's Start Chat
                                </div>
                            </div>
                    }


                    <div className="sendtextBox">

                        <div className="sendtext">
                            <textarea className='textareamesseg' name="text" placeholder='Type a message ...' ref={inputMsg}></textarea>
                            <button className='sendmessegbtn' onclick={SendMessage}>
                                Send
                                <RiSendPlaneFill />
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ChatRoom