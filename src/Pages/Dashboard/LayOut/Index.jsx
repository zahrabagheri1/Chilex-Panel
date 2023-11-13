import React, { useState } from 'react';
import './Layout.scss';
import Cards from '../../../Components/Cards/Cards'
import { IoGameControllerOutline, IoEarthOutline, IoFlowerOutline, IoManOutline } from "react-icons/io5";

function Index() {
    
    const dashboardCards = [
        {
            icon: <IoEarthOutline />,
            num: ' 500,000 hr',
            title: 'Played',
            classnameCard: 'worldcard',
            active: true
        },
        {
            icon: <IoGameControllerOutline />,
            num: '10 num',
            title: 'Games Chart',
            classnameCard: 'gamecard',
            active: true
        },
        {
            icon: <IoFlowerOutline />,
            num: '8,154,100 M',
            title: 'Support Us',
            classnameCard: 'supportcard',
            active: true
        },
        {
            icon: <IoManOutline />,
            num: '485 M',
            title: 'Users we have',
            classnameCard: 'usercard',
            active: true
        },
    ]
    
    const [select, setSelect] = useState(false)
    const handleSelect = (index)=>{
        setSelect(index);
    }
    
    return (
        <div className='layout'>
            <div className="cards row">
            {
                dashboardCards.map((card, index)=>(
                    <div key={index} className="col-xl-3 col-lg-3 col-md-3 col-ms-6 col-xs-6">
                        <Cards 
                        icon={card.icon} 
                        num={card.num} 
                        title={card.title}
                        classnameCard={card.classnameCard}
                        active={card.active}
                        click={()=>handleSelect(index)}
                        status={select === index}
                        />
                    </div>
                ))
            }
            
            </div>




        </div>
    );
}

export default Index;
