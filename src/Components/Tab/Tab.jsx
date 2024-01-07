import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { HiRocketLaunch, HiMiniUser, HiMiniShoppingCart, HiMiniCreditCard, HiMiniArrowDownTray, HiMiniSwatch, HiCurrencyDollar, HiMiniChatBubbleLeftRight, HiOutlineArrowLeftOnRectangle, HiInboxArrowDown, HiComputerDesktop } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';


function Tab(props) {
    const [click, setClick] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
    const navigate = useNavigate()

    const [child ,setChild] = useState()
    const [childId ,setChildId] = useState()
    const [parentId ,setParentId] = useState()

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
        if (e.target.id == item.id && item.children === null) {
            if (e.target.id === 7) {
                // document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                removeCookie('accessToken',{expires:'Thu, 01 Jan 1970 00:00:00 UTC', path:'/'} )
                navigate(item.link)
            } else {
                navigate(item.link)
                setClick(true)

            }
        }else {
            navigate(item.link)
            setClick(true)
            setChild(true)
        }

    }
    const clickChildHandler = (e, id, link) => {
        console.log(e.target.id,id )
        navigate(link)
        setChildId(id)
    }

    return (
        <div>
            <div className={`tab ${props.id === parentId ? 'active': ''}`} id={props.id} onClick={(e) => clickHandler(e, props.data)}>
                <div className='icon'>{icons[props.data.icon]}</div>
                <div className='tabText'>{props.data.name}</div>
            </div>

            <div className={child === true ? 'activechild' : 'child'}>
                {props.data.children?.map((childItem, key) => (
                    <div key={key} className={`childItem ${childItem.id === childId ? 'active' : ''}`}  id={childItem.id} onClick={(e) => clickChildHandler(e, childItem.id, childItem.link)}>
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
