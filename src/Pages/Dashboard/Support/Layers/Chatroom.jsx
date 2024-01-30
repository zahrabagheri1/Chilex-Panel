
import React, { useContext, useId, useRef } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import ButtonActionBlue from "../../../../Components/ButtonActionBlue/ButtonActionBlue";
import Messege from '../../../../Components/Messege/Messege';
import { socket } from "../../../../Socket";
import user from '../../../../Assets/image/user.jpg';
import { LoadingContext } from "../../../Loading/LoadingContext";
import { LoginContext } from "../../../Login/LoginContext";

function Chatroom(props) {
    const inputMsg = useRef()
    const [chat, setChats] = useState([])
    const scrollEnd = useRef(null)
    const [limit, setLimit] = useState(15)
    const [saveMessages, setSaveMessage] = useState([])
    const [userId, setUserId] = useState()
    const { loading, setLoading } = useContext(LoadingContext);
    const { goToLoginPage } = useContext(LoginContext);

    
    console.log(chat.length)
    console.log(limit)
    
    useEffect(() => {
        ResiveChts(props.id, limit);
        scrollEnd.current.addEventListener('scroll', handleScroll);
        socket.off("chat")
        socket.on("chat", (data) => {
            if (data.senderId == userId) {
                let temp = JSON.parse(JSON.stringify(chat))
                temp.reverse()
                temp.push(data)
                temp.reverse()
                setChats(temp)
            }
        })
        return () => {
            // scrollEnd.current.removeEventListener('scroll', handleScroll);
        };
    }, [props.id, limit]);

    const handleScroll = (counter) => {
        if (counter === 15) {
            if (scrollEnd.current.scrollTop === 0) {
                scrollEnd.current.scrollTop = scrollEnd.current.scrollHeight
                console.log('limit xaz :', limit)
            }
        } else {
            if (scrollEnd.current.scrollTop === 0) {
                // setLimit(counter + 15)
                console.log('limit  :', limit)
                // ResiveChts(props.id, limit)

            }
        }

    };

    const ResiveChts = (id, counter) => {
        const data = { anotherPersonId: id, limit: counter, offset: 0 };
        socket.emit('adminMessage', 'get-a-support-chat', data, (response) => {
            if (useId !== props.id) {
                data.offset = 0;
                setLimit(0);
            }
            console.log('conterrrrrrrrrr', counter)
            console.log('userID', userId)
            handleScroll(counter);
            setChats(response.chatBoxes);
        });
    };

    const ReadMoreMessages = () => {
        setLimit(limit + 15)
        ResiveChts(props.id, limit)
        // saveMessages.push()
        // chat.map((SaveChat) => { saveMessages.push(SaveChat) })
    }

    const SendMessage = () => {
        socket.emit('adminMessage', 'chat', {
            message: inputMsg.current.value,
            anotherPersonId: props.id,
            messageType: 0
        }, (response) => {
            ResiveChts(props.id, 0)
            inputMsg.current.value = ''
        });
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            SendMessage()
        }
    }

    return (
        <div className="chatBox">
            <div className="chatBoxWrapper">
                <div className="chatBoxMain">
                    <div className="chatboxheader">
                        <div className='chatHeader'>
                            <img className='chatHeaderImg' src={props.data.image || user} alt="" />
                            <div className="chatHeaderName">
                                <div className="chatHeaderusername">{props.data.username || chat?.userName}</div>
                                <div className="chatHeaderactivity">{props.data.status || chat?.status ? 'Online' : ''}</div>
                            </div>
                        </div>
                    </div>

                    <div ref={scrollEnd} className="chatboxbody">
                        {
                            chat.length - 1 > limit ?
                                <button className="readmoremessages" onClick={ReadMoreMessages}>
                                    <div className="textlineright"></div>
                                    <div className="readmore">read more messages</div>
                                    <div className="textlinelift"></div>
                                </button>
                                : ''
                        }

                        {chat?.map((msg, index) => (
                            <div key={index}>
                                <Messege message={msg.message} name={chat?.userName} receiverId={msg?.receiverId} own={msg?.senderId} time={msg?.date} />
                            </div>
                        )).reverse()
                        }

                        {saveMessages?.map((msg, index) => (
                            <div key={index}>
                                <Messege message={msg.message} name={chat?.userName} receiverId={msg?.receiverId} own={msg?.senderId} time={msg?.date} />
                            </div>
                        )).reverse()}

                    </div>
                </div>


                <div className="sendtextBox">

                    <div className="chatBoxTextarea">
                        <textarea
                            className="chatMessageInput"
                            placeholder='write somthing...'
                            ref={inputMsg}
                            onKeyDown={handleKeyPress}
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
        </div>

    )
}

export default Chatroom;
