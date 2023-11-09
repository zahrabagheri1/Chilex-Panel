import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../../../Components/Input/Input';
import './Detail.scss';

function Index() {
    const [history, setHistory] = useState({});
    const { historyId } = useParams()

    const type = [
        { id: 0, name: 'Gem bundle' },
        { id: 1, name: 'Coin  bundle' },
    ]
    const priceType = [
        { id: 0, name: 'Gem' },
        { id: 1, name: 'Coin' },
        { id: 2, name: 'Rial' },
    ]
    const priceStatus = [
        { id: 0, name: 'Active', status: true },
        { id: 1, name: 'Deactive', status: false },
    ]

    useEffect(() => {
        axios.get(`/shopping-history/get-shoppingHistory/${historyId}`)
            .then(
                res => {
                    setHistory(res.data.data)
                }
            )
            .catch(
                err => console.log(err)
            )
    }, [])

    return (
        <div className='historyDetail'>
            <div className='boxOfDetail row'>
                {history === null || history === undefined ? '' : (
                    Object.entries(history).map(([key, value], index) => (
                        key === 'id' ?
                            <div key={index} className='titleB col-xl-3 col-lg-3 col-md-4 col-ms-6 col-xs-6'>
                                <div className='header-title'>{key}</div>
                                <div className='data-title'>{value}</div>
                            </div>
                            :
                            <div key={index} className='titleB col-xl-3 col-lg-3 col-md-4 col-ms-6 col-xs-6'>
                                <Input inputclassname={'disableInput'} title={key} value={value} readOnly={true} />
                            </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Index;
