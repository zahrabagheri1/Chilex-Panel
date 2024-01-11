import React, { useEffect, useState } from 'react'
import './Support.scss'
import { HiBars3, HiEllipsisVertical, HiMagnifyingGlass } from "react-icons/hi2";
import { RiCheckDoubleFill, RiCheckFill, RiSendPlaneFill } from "react-icons/ri";
import { socket } from '../../../Socket';
import Conversation from './Conversation/Conversation';
import Chatroom from './ChatRoom/ChatRoom';
import AlrtConnetion from '../../../layout/AlrtConnetion/AlrtConnetion';

function Index() {
    const [listChats, setListChats] = useState()
    const [idChat, setIdChat] = useState({ status: false, userId: null })
    const [connection, setConnection] = useState(false)

    const searchUser = () => {
        console.log('searchUser')
    }

    useEffect(() => {
        socket.connect()
        GetResiveAllChats()

        socket.on('connect', () => {
            setConnection(true)
            console.log('connected')
            GetResiveAllChats()
        })

        socket.on('disconnect', () => {
            setConnection(false)
            console.table('Disconnected')
        })
    })

    function GetResiveAllChats() {
        socket.emit('adminMessage', 'get-all-support-chats', (response) => { setListChats(response) })
    }

    console.log('list : ' + JSON.stringify(listChats))

    const showChat = (id) => {
        console.log('show chat : ' + id)
        setIdChat({ status: true, userId: id })
    }

    return (
        <div className='supportUi'>
            <AlrtConnetion status={connection}/>

            {listChats === null || listChats === undefined ?
                <div className='supportUi'>
                    {console.log('Not Load')}
                </div>
                :
                <div className='supportUi'>
                    <div className="conversations">
                        <div className="conversationswallper">
                            <div className="searchBox">
                                <input type='search' className='searchinp' placeholder='Search user...' onChange={searchUser} />
                                <HiMagnifyingGlass />
                            </div>

                            <div className="chatconvers">
                                {
                                    listChats?.map((chat, index) => (
                                        <div key={index}>
                                            <Conversation data={chat} click={showChat} />
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    </div>

                    {
                        idChat.status ?
                            <Chatroom id={idChat.userId} /> : ''
                    }

                </div>
            }
        </div>
    )

}

export default Index