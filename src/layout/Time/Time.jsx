import React, { useState } from 'react';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import { HiPlus } from "react-icons/hi2";
import './Time.scss';

function Time(props) {
    const [priceList, setPriceList] = useState([])

    const inputChange = (e) => {
        setPriceList((prev) => ([ ...prev, {[e.target.name]: e.target.value} ]))
    }

    return (
        <div className='timeBox row'>
            <div className='timeTitle col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1'>
                <div className="title">Time</div>
                {
                    props.important === true ?
                        <div className="shouldfill"></div>
                        :
                        ''
                }
            </div>

            <div className='row col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8'>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <Input classname={'controlinput'} name={'day'} type={'number'} max={'30'} min={'0'} title={'day'} changeInputValue={inputChange} />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <Input classname={'controlinput'} name={'hour'} max={'23'} min={'0'} type={'number'} title={'hour'} changeInputValue={inputChange} />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <Input classname={'controlinput'} max={'59'} min={'0'} name={'minute'} type={'number'} title={'minute'} changeInputValue={inputChange} />
                </div>
            </div>


        </div >
    );
}

export default Time;
