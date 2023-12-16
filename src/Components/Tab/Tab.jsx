import React, { useState } from 'react';
import { HiRocketLaunch, HiMiniUser, HiMiniShoppingCart, HiMiniCreditCard, HiMiniArrowDownTray, HiMiniSwatch, HiCurrencyDollar, HiMiniChatBubbleLeftRight, HiOutlineArrowLeftOnRectangle, HiInboxArrowDown, HiComputerDesktop } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';


function Tab(props) {
    const [child, setChild] = useState(false)
    const [click, setClick] = useState(false)
    const [clickChild, setClickChild] = useState(false)
    const navigate = useNavigate()
    const icons = {
        HiRocketLaunch: <HiRocketLaunch />,
        HiCurrencyDollar: <HiCurrencyDollar />,
        HiMiniCreditCard: <HiMiniCreditCard />,
        HiMiniSwatch: <HiMiniSwatch />,
        HiComputerDesktop: <HiComputerDesktop />,
        HiInboxArrowDown: <HiInboxArrowDown />,
        HiMiniArrowDownTray: <HiMiniArrowDownTray />,
        HiMiniChatBubbleLeftRight: <HiMiniChatBubbleLeftRight />,
        HiOutlineArrowLeftOnRectangle: <HiOutlineArrowLeftOnRectangle />,
        HiMiniShoppingCart: <HiMiniShoppingCart />,
        HiMiniUser: <HiMiniUser />

    }


    const clickHandler = (e, item) => {
        if ( e.target.id == item.id && item.children === null) {
                navigate(item.link)
                setChild(false)
                setClick(true)
            }else{
                setClick(false)
                setChild(true)
        }
    }
    const clickChildHandler = (e, childItem) => {
             if ( e.target.id == childItem.id ) {
                navigate(childItem.link)
                setClickChild(true)
            }else{
                setClickChild(false)
        }
    }

    return (
        <div>
            <div className={`tab ${click === true ? 'active' : ''}`} id={props.id} onClick={(e) => clickHandler(e, props.data)}>
                <div className='icon'>{icons[props.data.icon]}</div>
                <div className='tabText'>{props.data.name}</div>
            </div>

            <div className={child === true ? 'activechild' : 'child'}>
                {props.data.children?.map((childItem, key) => (
                    <div key={key} className={`childItem ${clickChild === true ? 'active' : ''}`} id={childItem.id} onClick={(e) => clickChildHandler(e, childItem)}>
                        <div className='icon'>{icons[childItem.icon]}</div>
                        <div className=''>{childItem.name}</div>
                    </div>
                ))
                }
            </div>
        </div>
    );
}

export default Tab;
