import React, { useEffect, useState } from 'react';
import './Detail.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Input from '../../../../Components/Input/Input';
import { HiPencilSquare } from "react-icons/hi2";

function Index() {
    const [edit, setEdit] = useState(false)
    const [transaction, setTransaction] = useState({});
    const { transactionID } = useParams();

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

    const editDetail = () => {
        setEdit(!edit)
    }


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
            <div className='edited' onClick={editDetail}><HiPencilSquare /></div>
            <div className='boxOfDetail'>
                {transaction === null || transaction === undefined ? '' : (
                    Object.entries(transaction).map(([key, value], index) => (
                        key === 'id' ?
                            <div key={index} className={'titleB'}>
                                <div className='header-title'>{key}</div>
                                <div className='data-title'>{value}</div>
                            </div>
                            :
                            <div key={index} className={'titleB'}>
                                <Input inputclassname={edit === false ? 'active' : ''} title={key} value={value} readOnly={edit === true ? false : true} />
                            </div>
                    ))
                )}
            </div>

        </div>
    );

}

export default Index;
