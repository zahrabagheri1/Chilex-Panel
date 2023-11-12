import React, { useState } from 'react';
import SelectOption from '../../Components/SelectOption/SelectOption';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import { HiPlus } from "react-icons/hi2";
import './Prices.scss';

function Prices(props) {
    const [prices, setPrices] = useState(1)
    const [priceList , setPriceList] = useState([])

    const addPrices = () => {
        setPrices(prices + 1)
    }

    const selectChange = (name, value) => {
        setPriceList((prev)=> ([...prev, {[name]: value}]))
    }

    const inputChange = (e) => {
       setPriceList((prev)=>([ ...prev, {[e.target.name]: e.target.value} ]))
    }

    console.log(priceList)

    return (
        <div className='PriceBox row'>
            <div className='priceTitle col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1'>
                <div className="title">Price</div>
                {
                    props.important === true ?
                        <div className="shouldfill"></div>
                        :
                        ''
                }
            </div>

            <div className='col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8'>
                {
                    [...Array(prices)].map((index) => (
                        <div className='row' key={index}>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <SelectOption classnameBox={'control'} name={'prices'} defaultValue={'Price'} type={'status'}
                                    changeOptinValue={selectChange}
                                    data={[
                                        { id: 0, status: 'Gem' },
                                        { id: 1, status: 'Coin' },
                                        { id: 2, status: 'Tonam' },
                                    ]}
                                />
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <Input classname={'controlinput'} name={'amount'} type={'number'} title={'amount'}
                                    changeInputValue={inputChange} />
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className='addPriceBox col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3'>
                <Button classnameBtn={'addPriceItem'} title={<HiPlus />} handler={addPrices} />
            </div>
        </div>
    );
}

export default Prices;
