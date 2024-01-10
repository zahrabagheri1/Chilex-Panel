import React, { useState } from 'react'
import './SupportUi.scss'
import ninja from '../../../Assets/image/ninja.avif'
import { HiBars3, HiEllipsisVertical, HiMagnifyingGlass } from "react-icons/hi2";
import { RiCheckDoubleFill, RiCheckFill, RiSendPlaneFill } from "react-icons/ri";


function SupportUi() {
    const [click, setClick] = useState()
    const [chat, setChat] = useState(true)
    const [read, setRead] = useState(true)


    const fullscreenchat = () => {

    }

    const addInputData = () => {

    }

    const showmoremessage = () => {

    }

    const searchusers = () => {

    }


    const clickBTN = (e) => {
        setChat(!chat)
    }
    return (
        <div className='supportUi'>

            <div className="conversations">
                <div className="conversationswallper">
                    <div className="searchBox">
                        <input type='search' className='searchinp' placeholder='Search...' onChange={searchusers} />
                        <HiMagnifyingGlass />
                    </div>

                    <div className="chatconvers">
                        {
                            [...Array(9)].map(index => (
                                <div key={index} className={`chatconversolo`} onClick={(e) => clickBTN(e)}>
                                    <img src={ninja} alt="" className='imgUser' />
                                    <div className="">

                                        <div className="">
                                            <div className="nameuserconver">Ninja</div>
                                            <div className="lastmessage">Lorem ipsum dolor sit amet consectetur.</div>
                                        </div>

                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="chatroom">
                <div className="headerchat">
                    <div className="headerchatwall">

                        <div className="infoheader">
                            <img src={ninja} alt="" className='imgUser' />
                            <div className="usernamelastseen">
                                <div className="username">Ninja ninja</div>
                                <div className="lastseen">last seen today at 1:30 PM</div>
                            </div>
                        </div>

                        <div className="threeline " onclick={fullscreenchat}> <HiBars3 /></div>
                    </div>
                </div>

                <div className="mainchatBox">
                    <div className="chattingg">

                        {
                            chat ?
                                <div className="mainchat">
                                    {/* <div className="readmoremessage">
                                            <div className="textlineright"></div>
                                            <div className="readmore" onclick={showmoremessage}>read more</div>
                                            <div className="textlinelift"></div>
                                        </div> */}
                                    <button className='readmoremessages'>read more</button>
                                    <div className="chattss">
                                        <div className="meBox">
                                            <div className="me">
                                                <div className="metext">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, quo.</div>
                                                <div className="timeread">
                                                    <div className="metime">2:56 PM</div>
                                                    <div className="readtext">
                                                        {read ?
                                                            <RiCheckDoubleFill />
                                                            :
                                                            <RiCheckFill />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="youBox">
                                            <div className="you">
                                                <div className="youtext">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima provident, ratione expedita ipsum dolore illum?</div>
                                                <div className="youtime">2:59 PM</div>
                                            </div>
                                        </div>
                                        <div className="meBox">
                                            <div className="me">
                                                <div className="metext">Lorem ipsum dolor sit amet consectetur.</div>
                                                <div className="timeread">
                                                    <div className="metime">3:10 PM</div>
                                                    <div className="readtext">
                                                        {read ?
                                                            <RiCheckDoubleFill />
                                                            :
                                                            <RiCheckFill />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="youBox">
                                            <div className="you">
                                                <div className="youtext">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati odit tenetur fugit?</div>
                                                <div className="youtime">3:12 PM</div>
                                            </div>
                                        </div>
                                        <div className="meBox">
                                            <div className="me">
                                                <div className="metext">Lorem, ipsum dolor.</div>
                                                <div className="timeread">
                                                    <div className="metime">3:15 PM</div>
                                                    <div className="readtext">
                                                        {read ?
                                                            <RiCheckDoubleFill />
                                                            :
                                                            <RiCheckFill />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="youBox">
                                            <div className="you">
                                                <div className="youtext">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi voluptatibus laborum nesciunt fugit recusandae labore ducimus laboriosam aperiam.</div>
                                                <div className="youtime">3:30 PM</div>
                                            </div>
                                        </div>
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
                                <textarea className='textareamesseg' name="text" placeholder='Type a message ...'></textarea>
                                <button className='sendmessegbtn'>
                                    Send
                                    <RiSendPlaneFill />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SupportUi