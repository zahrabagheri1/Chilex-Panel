import React, { useContext, useState } from 'react';
import './Support.scss';
import Conversation from '../../../Components/Conversation/Conversation';
import { useEffect } from 'react';
import { connectSocketWithToken, socket } from '../../../Socket';
import Chatroom from './Layers/Chatroom';
import { LoadingContext } from '../../Loading/LoadingContext';
import { LoginContext } from '../../Login/LoginContext';
import { useCookies } from 'react-cookie';

function Index() {
  const [listChats, setListChats] = useState(null)
  const [idChat, setIdChat] = useState({ status: false, userId: null, image: null, username: null })
  const { setLoading } = useContext(LoadingContext);
  const { goToLoginPage } = useContext(LoginContext);

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

  const [cookie] = useCookies(['accessToken']);
  const searchUser = (e) => {
    console.log('searchUser')
  }

  useEffect(() => {
    console.log(" USE EFF",cookie.accessToken)
    socket.on("connect", () => {
      console.table('Connected in support');
      GetResiveAllChats();
    });

    if (!socket.active)
      connectSocketWithToken(cookie.accessToken)
    GetResiveAllChats();

    socket.on("disconnect", () => {
      console.table('Disconnected');
    });

  }, []);

  console.log(listChats)
  function GetResiveAllChats() {
    setLoading(true);
    console.log("EMIT GET ALL SUPPORT CHATS",socket)
    socket.emit('adminMessage', 'get-all-support-chats', (response) => {
      console.log("res",response)
      setLoading(false);
      setListChats(response)
    });
  }

  const showChat = (id, img, username) => {
    setIdChat({ status: true, userId: id, image: img, username: username })
  }

  // if (listChats === null || listChats === undefined) {
  //   console.log('Not Load')
  // } else {
    return (
      <div className='support'>
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input type="search" className='chatMenuSearchBox' placeholder='Search User' onChange={searchUser} />
            <div className="chatMenuBox">
              <div className="conversations">
                {listChats?.map((chat, index) => (
                  <div key={index}>
                    <Conversation data={chat} click={showChat} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {
          idChat.status ?
            <Chatroom id={idChat.userId} data={idChat} limit={15} />
            :
            <div className="clearChatRoom">
              <div className="clearChatRoomtext">
                Click on One of the Users
              </div>
              <div className="clearChatRoomsubtext">
                they waiting you to answer them!
              </div>
            </div>
        }
      </div>
    );
  }
// }


export default Index;





