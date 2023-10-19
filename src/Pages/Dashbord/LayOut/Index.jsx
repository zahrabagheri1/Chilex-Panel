import React from 'react';
import './Layout.scss';
import { IoGameControllerOutline, IoEarthOutline, IoFlowerOutline, IoManOutline } from "react-icons/io5";
import Cards from '../../../layout/Cards/Cards';

function Index() {

    return (
        <div className='layout'>
            <div className='cards'>
                <Cards/>
            </div>
            <div>
                Chart
            </div>
            <div>
                some details
            </div>
        </div>
    );
}

export default Index;
