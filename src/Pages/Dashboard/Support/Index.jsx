import React, { useState } from 'react';
import './Support.scss';
import Conversation from '../../../Components/Conversation/Conversation';
import Messege from '../../../Components/Messege/Messege';
import ChatHeader from '../../../Components/ChatHeader/ChatHeader';
import ButtonActionBlue from '../../../Components/ButtonActionBlue/ButtonActionBlue';
import DetailAccount from '../../../Components/DetailAccount/DetailAccount';
import { useEffect } from 'react';
import { socket ,getCookie} from '../../../Socket';
import { useCookies } from 'react-cookie';
import { useRef } from 'react';
import Chatroom from './Layers/Chatroom';

function Index() {
  const inputMsg = useRef()
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [emptyChat, setEmptyChat] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [dataAccount, setDataAccount] = useState({
    pv: null,
    img: null,
    name: null,
    status: null,
    lastseen: null,
    chat: null
  })
  const [cookies, setCookie] = useCookies(["accessToken"]);

  const gotopvuser = (key, value) => {
    setDataAccount(prev => ({ ...prev, [key]: value }))
  }

  const sendNewMessage = (e) => {
    console.log(e.target.value,inputMsg.current.value)
  }
  const searchUser = (e) => {
    console.log('searchUser')
  }
  const SendMessage = (e) => {
    console.log('Sended Message : ' + inputMsg.current.value)
    socket.emit('adminMessage','chat',{
      message : inputMsg.current.value,
      anotherPersonId:201,
      messageType : 0
    } , (response) => { console.log('response:', response);GetResiveAllChats() });
  }
  
  useEffect(()=>{
    socket.connect()
    socket.on("connect", () => {
      console.table('Connected')
    })
    socket.on('connect',GetResiveAllChats);
    socket.on("disconnect", () => {
        console.table('Disconnected')
    })
  },[])

function GetResiveAllChats() {
  socket.emit('adminMessage','get-all-support-chats', (response) => {console.log('get-all-support-chats :', response);});
}
  return (
    <div className='support row'>
      <div className="chatMenu col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
        <div className="chatMenuWrapper">
          <input type="search" className='chatMenuSearchBox' placeholder='Search User' onChange={searchUser} />
          <div className="chatMenuBox">
            <Conversation />
          </div>
        </div>
      </div>
      <div className="chatBox col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
        <div className="chatBoxWrapper">
          <div className="chatBoxMain">
            <div className="chatboxheader">
              <ChatHeader />
            </div>
            <Chatroom />
          </div>
          <div className="chatBoxTextarea">
            <textarea ref={inputMsg} placeholder='write somthing...' className="chatMessageInput" onChange={(e) => sendNewMessage(e)}></textarea>
            <ButtonActionBlue title={'Send'} className={'chatSubmitButton'} handler={SendMessage} />
            <button onClick={GetResiveAllChats} >Connect </button>
          </div>
        </div>
      </div>
      <div className="chatDetials col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
        <div className="chatDetialsWrapper">
          <DetailAccount />
        </div>
      </div>
    </div>
  );
}

export default Index;
