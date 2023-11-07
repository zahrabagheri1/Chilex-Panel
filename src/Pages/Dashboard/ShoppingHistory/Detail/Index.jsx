import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../../../Components/Input/Input';
import { HiPencilSquare } from "react-icons/hi2";
import './Detail.scss';

function Index() {
    const [edit, setEdit] = useState(false)
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

    const editDetail = () => {
        setEdit(!edit)
    }

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
            <div className='edited' onClick={editDetail}><HiPencilSquare /></div>
            <div className='boxOfDetail'>
                {history === null || history === undefined ? '' : (
                    Object.entries(history).map(([key, value], index) => (
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
