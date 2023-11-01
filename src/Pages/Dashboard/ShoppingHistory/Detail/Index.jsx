import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Detail.scss';

function Index() {

    const [history , setHistory] = useState()
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
            <div className='boxOfDetail'>
                {history === null || history === undefined ? (
                    ''
                ) : (
                    Object.entries(history).map(([key, value], index) => (
                        <div key={index} className={`titleB ${Array.isArray(value) ? 'priceTitle' : ''}`}>
                            <div className='header-title'>{key}</div>
                            <div className='data-title'>{value}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Index;
