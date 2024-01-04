import React, { useState } from 'react';
import './Support.scss';
import Conversation from '../../../Components/Conversation/Conversation';
import DetailAccount from '../../../Components/DetailAccount/DetailAccount';
import { useEffect } from 'react';
import { socket, getCookie } from '../../../Socket';
import { useCookies } from 'react-cookie';
import Chatroom from './Layers/Chatroom';
import Information from './Layers/Information';

function Index() {
  const [listChats, setListChats] = useState()
  const [idChat, setIdChat] = useState({status : false,userId : null})
  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [emptyChat, setEmptyChat] = useState(false)
  // const [newMessage, setNewMessage] = useState('')
  // const [dataAccount, setDataAccount] = useState({
  //   pv: null,
  //   img: null,
  //   name: null,
  //   status: null,
  //   lastseen: null,
  //   chat: null
  // })
  // const [cookies, setCookie] = useCookies(["accessToken"]);
  // const gotopvuser = (key, value) => {
  //   setDataAccount(prev => ({ ...prev, [key]: value }))
  // }

  const searchUser = (e) => {
    console.log('searchUser')
  }

  useEffect(() => {
    socket.connect()
    socket.on("connect", () => {
      console.table('Connected')
    })
    socket.on('connect', GetResiveAllChats);
    socket.on("disconnect", () => {
      console.table('Disconnected')
    })
  },[])

  function GetResiveAllChats() {
    socket.emit('adminMessage', 'get-all-support-chats', (response) => { setListChats(response) });
  }
  // console.log('list : ' + JSON.stringify(listChats))
  const showChat =(id)=>{
    console.log('show chat : '+ id)
    setIdChat({status:true,userId :id})
  }

  if (listChats === null || listChats === undefined) {
    console.log('Not Load')
  } else {
    return (
      <div className='support row'>
        <div className="chatMenu col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
          <div className="chatMenuWrapper">
            <input type="search" className='chatMenuSearchBox' placeholder='Search User' onChange={searchUser} />
            <div className="chatMenuBox">
              {listChats?.map((chat, index) => (
                <div key={index}>
                  <Conversation data={chat} click={showChat} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {
          idChat.status? 
          <Chatroom id={idChat.userId} /> : ''
        }
       {/* <Information /> */}
      </div>
    );
  }
}


export default Index;
