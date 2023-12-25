import React, { useState } from 'react';
import './Support.scss';
import Conversation from '../../../Components/Conversation/Conversation';
import Messege from '../../../Components/Messege/Messege';
import ChatHeader from '../../../Components/ChatHeader/ChatHeader';
import ButtonActionBlue from '../../../Components/ButtonActionBlue/ButtonActionBlue';
import DetailAccount from '../../../Components/DetailAccount/DetailAccount';

function Index() {

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

  const gotopvuser = (key, value) => {
    setDataAccount(prev => ({ ...prev, [key]: value }))
  }

  const sendNewMessage = (e) => {
    setNewMessage(e.target.value)
  }

  const submitHandler = (e) => {

  }
  const searchUser = () => {

  }

  return (
    <div className='support row'>
      <div className="chatMenu col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
        <div className="chatMenuWrapper">
          <input type="search" className='chatMenuSearchBox' placeholder='Search User' onChange={searchUser} />
          <div className="chatMenuBox">
            <Conversation />
            <Conversation />
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
            <div className="chatboxbody">
              <div className="chatmessage">
                <Messege name='zizi' img='user' gender='female' own={true} time='1 hour ago' />
                <Messege name='zizi' img='user' gender='female' own={false} time='1 hour ago' />
                <Messege name='zizi' img='user' gender='female' own={true} time='1 hour ago' />
                <Messege name='zizi' img='user' gender='female' own={false} time='1 hour ago' />
                <Messege name='zizi' img='user' gender='female' own={true} time='1 hour ago' />
                <Messege name='zizi' img='user' gender='female' own={false} time='1 hour ago' />
                <Messege name='zizi' img='user' gender='female' own={true} time='1 hour ago' />
                <Messege name='zizi' img='user' gender='female' own={false} time='1 hour ago' />
                <Messege name='zizi' img='user' gender='female' own={true} time='1 hour ago' />
                <Messege name='zizi' img='user' gender='female' own={false} time='1 hour ago' />
                <Messege name='zizi' img='user' gender='female' own={true} time='1 hour ago' />
                <Messege name='zizi' img='user' gender='female' own={false} time='1 hour ago' />
                <Messege name='zizi' img='user' gender='female' own={true} time='1 hour ago' />
                <Messege name='zizi' img='user' gender='female' own={false} time='1 hour ago' />
              </div>
            </div>
          </div>
          <div className="chatBoxTextarea">
            <textarea placeholder='write somthing...' value={newMessage} className="chatMessageInput" onChange={(e) => sendNewMessage(e)}></textarea>
            <ButtonActionBlue title={'Send'} className={'chatSubmitButton'} handler={submitHandler} />
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
