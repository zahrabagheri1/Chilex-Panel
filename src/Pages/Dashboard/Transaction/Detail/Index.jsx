import React, { useContext, useEffect, useState } from 'react';
import './Detail.scss';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../../Components/Input/Input';
import { HiPencilSquare } from "react-icons/hi2";
import { HiPlus, HiChevronLeft } from "react-icons/hi2";
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../Loading/LoadingContext';
import { LoginContext } from '../../../Login/LoginContext';
import moment from 'moment-jalaali';
import API_URL from '../../../../API_URL';

function Index() {
    const [transaction, setTransaction] = useState({});
    const { id } = useParams();
    const { loading, setLoading } = useContext(LoadingContext)
    const [cookies] = useCookies(['accessToken']);
    const { goToLoginPage } = useContext(LoginContext);
    const navigate = useNavigate()

    const transactionGet = () => {
        setLoading(!loading)
        axios.get(API_URL + `/admin-transaction/get-transaction/${id}`,
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
    }
    useEffect(() => {
        goToLoginPage(cookies.accessToken);
        transactionGet()
    }, [])

    const hundelBack = () => {
        navigate(-1)
    }

    return (
        <div className='transactionDetail'>
            <div className="backbtn">
                <div className='backTransaction' onClick={hundelBack}>
                    <HiChevronLeft />
                </div>
                <div className="titleTransaction">Details Of Transaction {id}</div>
                <div></div>
            </div>
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
