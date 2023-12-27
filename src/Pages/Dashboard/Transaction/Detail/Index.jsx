import React, { useContext, useEffect, useState } from 'react';
import './Detail.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Input from '../../../../Components/Input/Input';
import { HiPencilSquare } from "react-icons/hi2";
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../Loading/LoadingContext';
import moment from 'moment-jalaali';

function Index() {
    const [transaction, setTransaction] = useState({});
    const { id } = useParams();
    const { loading, setLoading } = useContext(LoadingContext)
    const [cookies] = useCookies(['accessToken']);


    useEffect(() => {
        setLoading(!loading)
        axios.get(`/admin-transaction/get-transaction/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(
                res => {
                    setTransaction(res.data)
                    setLoading(loading)
                }
            )
            .catch(
                err => { console.log(err) }
            )
    }, [])

    return (
        <div className='transactionDetail'>
            <div className='boxOfDetail row'>
                {transaction === null || transaction === undefined ? '' : (
                    Object.entries(transaction).map(([key, value], index) => (
                        key === 'createdAt' || key === 'updatedAt' ?
                            <div key={index} className='titleB col-xl-3 col-lg-4 col-md-4 col-ms-6 col-xs-6'>
                                <div className='header-title'>{key}</div>
                                <div className='data-title'>{moment(value).format('jYYYY/jM/jD')}</div>
                            </div>
                            :
                            value === null ? '' :
                                <div key={index} className='titleB col-xl-3 col-lg-4 col-md-4 col-ms-6 col-xs-6'>
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
