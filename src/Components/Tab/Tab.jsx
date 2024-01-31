import React, { useEffect, useState } from 'react';
import { HiRocketLaunch, HiMiniUser, HiMiniShoppingCart, HiMiniCreditCard, HiMiniArrowDownTray, HiMiniSwatch, HiCurrencyDollar, HiMiniChatBubbleLeftRight, HiOutlineArrowLeftOnRectangle, HiInboxArrowDown, HiComputerDesktop, HiChevronUp } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import { GoDotFill } from "react-icons/go";

function Tab(props) {
    const navigate = useNavigate()
    const [childId, setChildId] = useState()
    
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

    const clickHandler = (item) => {
        props.activeHandler(item)
    };

    const clickChildHandler = (id, path) => {
        navigate(path)
        setChildId(id)
    }

    return (
        <>
            <div className={`tab ${props.data.children === null ? `tabDontHaveChild ${props.active ? 'active' : ''}` : `tabHaveChild ${props.active ? 'active' : ''}`}`} id={props.id} onClick={() => clickHandler(props.data)}>
                <div className="tabIconText">
                    <div className='icon'>{icons[props.data.icon]}</div>
                    <div className='tabText'>{props.data.name}</div>
                </div>
                {props.data.children === null ? '' :
                    <div className={`dropdownicon ${props.active === true ? 'active' : ''}`}><HiChevronUp /></div>
                }
            </div>

            {props.data.children === null ? '' :
                <div className={props.active === true ? 'activechild' : 'child'}>
                    {props.data.children?.map((childItem, key) => (
                        <div key={key} className={`childItem ${childItem.id === childId ? 'active' : ''}`} id={childItem.id} onClick={() => clickChildHandler(childItem.id, childItem.path)}>
                            <div className={props.active === true ? '' : 'icon'}><GoDotFill /></div>
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