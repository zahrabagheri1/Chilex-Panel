import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../../../Components/Input/Input';
import './Detail.scss';
import moment from 'moment-jalaali';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../Loading/LoadingContext';

function Index() {
    const [history, setHistory] = useState({});
    const { loading, setLoading } = useContext(LoadingContext)
    const { id } = useParams()
    const [cookies] = useCookies(['accessToken']);

    const referenceType = ['BUNDLE', 'ITEM', 'TRANSACTION', 'SETTING']
    const type = ['Gem', 'Coin', 'Item']

    useEffect(() => {
        setLoading(!loading)
        axios.get(`/shopping-history/get-shoppingHistory/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(
                res => {
                    setHistory(res.data.data)
                    setLoading(loading)
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
                        key === 'updatedAt' || key === 'createdAt' ?
                            <div key={index} className='titleB col-xl-3 col-lg-3 col-md-4 col-ms-6 col-xs-6'>
                                <div className='header-title'>{key}</div>
                                <div className='data-title'>{moment(value, 'YYYY/MM/DD').format('jYYYY/jM/jD')}</div>
                            </div>
                            :

                            key === 'type' ?
                                <div key={index} className='titleB col-xl-3 col-lg-3 col-md-4 col-ms-6 col-xs-6'>
                                    <div className='header-title'>{key}</div>
                                    <div className='data-title'>{type[value]}</div>
                                </div>
                                :
                                key === 'referenceType' ?

                                    <div key={index} className='titleB col-xl-3 col-lg-3 col-md-4 col-ms-6 col-xs-6'>
                                        <div className='header-title'>{key}</div>
                                        <div className='data-title'>{referenceType[value]}</div>
                                    </div>

                                    :
                                    value === null ?
                                        null :
                                        <div key={index} className='titleB col-xl-3 col-lg-3 col-md-4 col-ms-6 col-xs-6'>
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
