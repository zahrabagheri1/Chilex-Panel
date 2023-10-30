import React, { useEffect, useState } from 'react';
import './TransactionDetail.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TransactionDetail() {

    const [transaction, setTransaction] = useState();
    const { transactionID } = useParams();

    useEffect(() => {
        axios.get(`/admin-transaction/get-transaction/${transactionID}`)
            .then(
                res => {
                    setTransaction(res.data.data)
                }
            )
            .catch(
                err => console.log(err)
            )
    }, [])

    return (
        <div className='transactionDetail'>
            <div className='boxOfDetail'>
                {transaction === null || transaction === undefined ? (
                    ''
                ) : (
                    Object.entries(transaction).map(([key, value], index) => (
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

export default TransactionDetail;
