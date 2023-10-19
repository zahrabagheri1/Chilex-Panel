import React, { useEffect, useState } from 'react';
import './Cards.scss';
import { IoGameControllerOutline, IoEarthOutline, IoFlowerOutline, IoManOutline } from "react-icons/io5";


function Cards() {
    const[active, setActive] = useState(false)
    const changeColor = (e)=>{
        setActive(!active)
    }

    return (
        <>
            <div className={`card worldcard ${active === true ? 'active': ''}`} onClick={e=>changeColor()}>
                <div className='text'>
                    <div className='num'>500,000 hr</div>
                    <div className='title'>Played</div>
                </div>
                <div className='logobox'><IoEarthOutline className='logo' /></div>
            </div>

            <div className={`card gamecard ${active === true ? 'active': ''}`} onClick={changeColor}>
                <div className='text'>
                    <div className='num'>10 num</div>
                    <div className='title'>Games Chart</div>
                </div>
                <div className='logobox'><IoGameControllerOutline className='logo' /></div>
            </div>

            <div className={`card supportcard ${active === true ? 'active': ''}`}  onClick={changeColor}>
                <div className='text'>
                    <div className='num'>8,154,100 M</div>
                    <div className='title'>Support Us</div>
                </div>
                <div className='logobox'><IoFlowerOutline className='logo' /></div>
            </div>
            
            <div className={`card usercard ${active === true ? 'active': ''}`}  onClick={changeColor}>
                <div className='text'>
                    <div className='num'>485 M</div>
                    <div className='title'>Users we have</div>
                </div>
                <div className='logobox'><IoManOutline className='logo' /></div>
            </div>
        </>
    );
}

export default Cards;
