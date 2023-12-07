import React, { useRef, useState } from 'react';
import SelectOption from '../../Components/SelectOption/SelectOption';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import { HiPlus, HiCheck } from "react-icons/hi2";
import './Prices.scss';

function Prices(props) {
    const [prices, setPrices] = useState(1)
    const [priceList, setPriceList] = useState({})
    const [addObjectArray, setAddObjectArray] = useState([])
    const buttonClickedRef = useRef(false);

    const addPrices = () => {
        setPrices(prices + 1)
        buttonClickedRef.current = false;
    }

    const selectChange = (name, value) => {
        setPriceList((prev) => ({ ...prev, [name]: value }))
    }

    const inputChange = (e) => {
        setPriceList((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


    const checkPrices = () => {
        setAddObjectArray((prevArray) => ([...prevArray, priceList]))
        if (!buttonClickedRef.current) {
            buttonClickedRef.current = true;
        }

    }

    // console.log(addObjectArray)
    // console.log(buttonClickedRef.current)
    
    console.log(props.disable)
    
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

            <div className={`PriceItems col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8 ${props.disable === true ? 'disablePrice' : ''}`}>
                {
                    [...Array(prices)].map((index) => (
                        <div className='PriceItemsBox row' key={index} >
                            <div className="col-xl-4 col-lg-3 col-md-3 col-sm-4 col-xs-12">
                                {
                                    // stuffType => Gem Bindle: 0 , Coin Bundle: 1
                                    props.stuffType === 0 ?
                                        <SelectOption classnameBox={'control'} readOnly={false} name={'type'} defaultValue={'Price'} type={'status'}
                                            changeOptinValue={selectChange}
                                            data={[
                                                { id: 1, status: 'Coin' },
                                                { id: 2, status: 'Tonam' },
                                                { id: 3, status: 'Free' },
                                            ]}
                                        />
                                        :
                                        <SelectOption classnameBox={'control'} readOnly={false} name={'type'} defaultValue={'Price'} type={'status'}
                                            changeOptinValue={selectChange}
                                            data={[
                                                { id: 0, status: 'Gem' },
                                                { id: 3, status: 'Free' },
                                            ]}
                                        />
                                }
                            </div>
                            <div className="col-xl-4 col-lg-3 col-md-3 col-sm-4 col-xs-12">
                                <Input classname={'controlinput'} name={'amount'} type={'number'} title={'amount'}
                                    changeInputValue={inputChange} />
                            </div>
                            <div className="checkPriceItemBox col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                <Button title={<HiCheck />} className={'checkPriceItembtn'} classnameBtn={'checkPriceItem'} disabled={buttonClickedRef.current} handler={checkPrices} />
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className='addPriceBox col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3'>
                <Button classnameBtn={'addPriceItem'} title={<HiPlus />} disabled={false} handler={addPrices} />
            </div>
        </div>
    );
}

export default Prices;
