import React, { useEffect, useState } from 'react';
import './Cards.scss';
import { IoGameControllerOutline, IoEarthOutline, IoFlowerOutline, IoManOutline } from "react-icons/io5";

const props = {
    icon: <IoEarthOutline className='logo' />,
    num: ' 500,000 hr',
    title: 'Played',
    classnameCard: 'worldcard',
    active: true
}

function Cards(props) {
    console.log(props.status)

    return (
        <div className={`dashboardCard ${props.classnameCard} ${props.status ? 'active' : null}`} onClick={props.click}>
            <div className="dashboardText">
                <div className="dashboardNum">{props.num}</div>
                <div className="dashboardTitle">{props.title}</div>
            </div>
            <div className="dashboardLogo">{props.icon}</div>
        </div>
    );
}

export default Cards;
