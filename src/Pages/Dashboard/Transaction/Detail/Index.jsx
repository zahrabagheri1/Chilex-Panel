import React, { useContext, useEffect, useState } from 'react';
import './Detail.scss';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { HiCheck, HiMiniXMark, HiPencilSquare } from "react-icons/hi2";
import { HiChevronLeft } from "react-icons/hi2";
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../Loading/LoadingContext';
import { LoginContext } from '../../../Login/LoginContext';
import moment from 'moment-jalaali';
import { API_URL } from '../../../../API_URL';
import Alert from '../../../../layout/Alert/Alert';
import SelectOption from '../../../../Components/SelectOption/SelectOption';

function Index() {
    const [transaction, setTransaction] = useState({});
    const { id } = useParams();
    const [editAble, setEditAble] = useState(false)
    const { loading, setLoading } = useContext(LoadingContext)
    const [cookies] = useCookies(['accessToken']);
    const { goToLoginPage } = useContext(LoginContext);
    const [showAlert, setShowAlert] = useState({
        status: false, msg: '', status: false
    })
    const navigate = useNavigate()

    const transactionGet = () => {
        setLoading(true)
        axios.get(`${API_URL === undefined ? '' : API_URL}/admin-transaction/get-transaction/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(
                res => {
                    setTransaction(res.data)
                    setLoading(false)
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


    const editDataCancel = () => {
        setEditAble(!editAble)
    }

    const editData = () => {
        setEditAble(!editAble)
    }

    const updateOptionData = (name, id) => {
        // setFilters((prev) => ({ ...prev, [name]: id }))
    }

    console.log(transaction.status)

    const switchHandler = (boolean, id) => {
        axios.patch(`${API_URL === undefined ? '' : API_URL}/admin-transaction/change_status/${id}`, {
            status: boolean === true ? 0 : 1,
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(
                res => {
                    setShowAlert({ status: true, msg: res.data.msg, success: true })
                    setTimeout(() => {
                        setShowAlert({ status: false, msg: res.data.msg })
                    }, 3000)
                    transactionGet()
                    setEditAble(false)
                }
            )
            .catch(
                err => {
                    setShowAlert({ status: true, msg: err.message, success: false })
                    setTimeout(() => {
                        setShowAlert({ status: false, msg: err.message })
                    }, 3000)
                }
            )
        setEditAble(false)
    }
    return (
        <div className='transactionDetail'>
            {showAlert.status === true ?
                <Alert message={showAlert.msg} success={showAlert.success} />
                :
                ''
            }
            <div className="backbtn">
                <div className='backTransaction' onClick={hundelBack}>
                    <HiChevronLeft />
                </div>
                <div className="titleTransaction">Details Of Transaction {id}</div>
                <div className="btnEdit">
                    {editAble ?
                        <div className="btnEditCancel">
                            <div className='editTransaction' onClick={switchHandler}>
                                <HiCheck />
                            </div>
                            <div className='editTransaction' onClick={editDataCancel}>
                                <HiMiniXMark />
                            </div>
                        </div>
                        :
                        <div className='editTransaction' onClick={editData}>
                            <HiPencilSquare />
                        </div>
                    }
                </div>
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
                            value === null ?
                                <div key={index} className='titleB col-xl-3 col-lg-4 col-md-4 col-ms-6 col-xs-6'>
                                    <div className='header-title'>{key}</div>
                                    <div className='data-title'>null</div>
                                </div>
                                :
                                key == "status" ?
                                    <div key={index} className='titleB col-xl-3 col-lg-4 col-md-4 col-ms-6 col-xs-6'>
                                        <SelectOption readOnly={false} name={'status'} value={transaction.status} editAble={!editAble} title={'status'} type={'status'} changeOptinValue={updateOptionData}
                                            data={[
                                                { id: 0, status: 'Pending' },
                                                { id: 1, status: 'True check result' },
                                                { id: 2, status: 'False check result' },
                                                { id: 3, status: 'Failed' },
                                                { id: 4, status: 'Successful' },
                                                { id: 5, status: 'Refunded' }
                                            ]}
                                        />

                                    </div>
                                    :
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
