import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { HiChevronDown, HiRocketLaunch, HiMiniUser, HiMiniShoppingCart, HiMiniCreditCard, HiMiniArrowDownTray, HiMiniSwatch, HiCurrencyDollar, HiMiniChatBubbleLeftRight, HiOutlineArrowLeftOnRectangle, HiInboxArrowDown, HiComputerDesktop, HiChevronUp } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import { GoDotFill } from "react-icons/go";

function Tab(props) {
    const [click, setClick] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
    const navigate = useNavigate()

    const [child, setChild] = useState()
    const [childId, setChildId] = useState()
    const [parentId, setParentId] = useState()

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
        console.log(item)
        setParentId(item.id)
        setChild(!child)
        setClick(!click)
        // navigate(item.link)

        // if (e.target.id == item.id && item.children === null) {
        //     if (e.target.id === 7) {
        //         // document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        //         removeCookie('accessToken', { expires: 'Thu, 01 Jan 1970 00:00:00 UTC', path: '/' })
        //         navigate(item.link)
        //         setParentId(item.id)
        //     } else {
        //         navigate(item.link)
        //         setClick(true)
        //         setParentId(item.id)
        //     }
        // } else {
        //     navigate(item.link)
        //     setParentId(item.id)
        //     setClick(true)
        //     setChild(true)
        // }
    }

    const clickChildHandler = (id, link) => {
        // console.log(link, id)
        navigate(link)
        setChildId(id)
    }

    return (
        <>
            {/* <div className={props.data.children === null ? 'tab' + (props.id === parentId ? 'active' : '') :'tabHaveChild' } onClick={(e) => clickHandler(e, props.data)}> */}

            <div className={`tab ${props.data.children === null ? `tabDontHaveChild ${props.id === parentId ? 'active' : ''}` : 'tabHaveChild'}`} id={props.id} onClick={(e) => clickHandler(e, props.data)}>

                <div className="tabIconText">
                    <div className='icon'>{icons[props.data.icon]}</div>
                    <div className='tabText'>{props.data.name}</div>
                </div>
                {props.data.children === null ? '' :
                    <div className={`dropdownicon ${click === true ? 'active' : ''}`}><HiChevronUp /></div>
                }
            </div>

            {props.data.children === null ? '' :
                <div className={child === true ? 'activechild' : 'child'}>
                    {props.data.children?.map((childItem, key) => (
                        <div key={key} className={`childItem ${childItem.id === childId ? 'active' : ''}`} id={childItem.id} onClick={() => clickChildHandler(childItem.id, childItem.link)}>
                            <div className={child === true ? '' : 'icon'}><GoDotFill /></div>
                            <div className=''>{childItem.name}</div>
                        </div>
                    ))
                    }
                </div>
            }
        </>
    );
}

export default Tab;
