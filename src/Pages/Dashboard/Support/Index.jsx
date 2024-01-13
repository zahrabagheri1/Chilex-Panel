import React, { useState } from 'react';
import './Support.scss';
import Conversation from '../../../Components/Conversation/Conversation';
import { useEffect } from 'react';
import { socket, getCookie } from '../../../Socket';
import { useCookies } from 'react-cookie';
import Chatroom from './Layers/Chatroom';

function Index() {
  const [listChats, setListChats] = useState()
  const [idChat, setIdChat] = useState({ status: false, userId: null, image: null, username: null })
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
    GetResiveAllChats()

    socket.on("connect", () => {
      console.table('Connected')
      GetResiveAllChats()
    })
    socket.on("disconnect", () => {
      console.table('Disconnected')
    })
  }, [])

  function GetResiveAllChats() {
    socket.emit('adminMessage', 'get-all-support-chats', (response) => { setListChats(response) });
  }
  // console.log('list : ' + JSON.stringify(listChats))
  const showChat = (id, img, username) => {
    console.log('show chat : ' + id)
    setIdChat({ status: true, userId: id, image: img, username: username })
  }

  if (listChats === null || listChats === undefined) {
    console.log('Not Load')
  } else {
    return (
      <div className='support'>
        <div className="chatMenu">
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
          idChat.status ?
            <Chatroom id={idChat.userId} data={idChat} /> : ''
        }
      </div>
    );
  }
}


export default Index;
