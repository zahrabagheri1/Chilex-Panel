import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Detail.scss';
import Switch from '../../../../../Components/Switch/Switch';
import Input from '../../../../../Components/Input/Input';
import { HiMiniXMark, HiChevronLeft, HiPencilSquare, HiCheck } from "react-icons/hi2";
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../../Loading/LoadingContext';
import { LoginContext } from '../../../../Login/LoginContext';
import DatePikerFarsi from '../../../../../Components/DatePikerFarsi/DatePikerFarsi';
import Alert from '../../../../../layout/Alert/Alert';

function Index() {
    const [detail, setDetail] = useState({});
    const [editAble, setEditAble] = useState(false)
    const [edit, setEdit] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const [updateData, setUpdateData] = useState({})
    const [cookies] = useCookies(['accessToken']);
    const { loading, setLoading } = useContext(LoadingContext);
    const { goToLoginPage } = useContext(LoginContext);
    const [showAlert, setShowAlert] = useState({
        status: false, msg: ''
    })
    const [timeList, setTimeList] = useState({
        day: null,
        hour: null,
        minute: null
    })
    const type = [
        { id: 0, name: 'Gem bundle' },
        { id: 1, name: 'Coin  bundle' },
    ]

    const priceType = [
        { id: 0, name: 'Gem' },
        { id: 1, name: 'Coin' },
        { id: 2, name: 'Rial' },
    ]

    const activityIntervalTime = { day: null, hour: null, minute: null }

    const inputChange = (e) => {
        setTimeList((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const sendActivityInteralTime = (timeList) => {
        setUpdateData((prev) => ({ ...prev, ['activityIntervalTime']: timeList }))
    }

    const changeValueInput = (e) => {
        setUpdateData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setEdit(true)
    }

    const editData = () => {
        setEditAble(!editAble)
    }

    const editDataCancel = () => {
        setEditAble(!editAble)
    }

    const updateDataPiker = (e, title) => {
        setUpdateData((prev) => ({ ...prev, [title]: e }))
        setEdit(true)
    }

    const sendData = () => {
        edit ?
            axios.patch(`/admin-stuff/update-bundle/${id}`,
                {
                    name: updateData.name === null || updateData.name === undefined ? detail.name : updateData.name,
                    expireTime: updateData.expireTime === null || updateData.expireTime === undefined ? detail.expireTime : updateData.expireTime,
                    imageId: updateData.imageId === null || updateData.imageId === undefined ? detail.imageId : updateData.imageId,
                    sku: updateData.sku === null || updateData.sku === undefined ? detail.sku : updateData.sku,
                    amount: updateData.amount === null || updateData.amount === undefined ? detail.amount : parseInt(updateData.amount),
                    activityIntervalTime: updateData.activityIntervalTime === null || updateData.activityIntervalTime === undefined ? detail.activityIntervalTime : {}
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + cookies.accessToken
                    }
                })
                .then(
                    res => {
                        console.log(res)
                        setShowAlert({ status: true, msg: res.message, success: true })
                        setTimeout(() => {
                            setShowAlert({ status: false, msg: res.message })
                        }, 3000)
                        getData()
                        setEditAble(false)
                    }

                )
                .catch(
                    err => {
                        console.log(err)

                        setShowAlert({ status: true, msg: err.response.data.message, success: false })
                        setTimeout(() => {
                            setShowAlert({ status: false, msg: err.response.data.message })

                        }, 3000)
                    }
                )
            :
            setEditAble(false)
    }


    const switchHandler = (boolean, id) => {
        console.log('first', boolean, id)
        axios.patch(`/admin-stuff/change-bundle-status/${id}`, {
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
                    console.log(res.data)
                    setShowAlert({ status: true, msg: res.data.msg, success: true })
                    setTimeout(() => {
                        setShowAlert({ status: false, msg: res.data.msg })
                    }, 3000)
                    getData()
                    setEditAble(false)
                    console.log('second', boolean, id)
                }
            )
            .catch(
                err => {
                    console.log(err)
                    setShowAlert({ status: true, msg: err.message, success: false })
                    setTimeout(() => {
                        setShowAlert({ status: false, msg: err.message })
                    }, 3000)
                }
            )
        setEditAble(false)
    }

    const switchHandlerPrice = (boolean, id) => {
        axios.patch(`/admin-stuff/change-price-status/${id}`, {
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
                    console.log(res.data)
                    setShowAlert({ status: true, msg: res.data.msg, success: true })
                    setTimeout(() => {
                        setShowAlert({ status: false, msg: res.data.msg })
                    }, 3000)
                    getData()
                    setEditAble(false)
                }
            )
            .catch(
                err => {
                    console.log(err)
                    setShowAlert({ status: true, msg: err.message, success: false })
                    setTimeout(() => {
                        setShowAlert({ status: false, msg: err.message })

                    }, 3000)
                }
            )
        setEditAble(false)
    }

    const hundelBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        goToLoginPage(cookies.accessToken);
        getData()
    }, [])

    const getData = () => {
        setLoading(!loading)
        axios.get(`/admin-stuff/get-bundle/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(res => {
                setDetail(res.data)
                setLoading(loading)
            })
            .catch(err => {
                console.log(err)
            })
    }

    console.log(detail)
    return (
        <div className='bundleDetail'>
            {showAlert.status === true ?
                <Alert message={showAlert.msg} success={showAlert.success} />
                :
                ''
            }
            <div className="addBox">
                <div className='backBundle' onClick={hundelBack}>
                    <HiChevronLeft />
                </div>
                <div className="titleBundle">Details Of Bundle {id}</div>
                <div className="btnEdit">
                    {editAble ?
                        <div className="btnEditCancel">
                            <div className='editBundle' onClick={sendData}>
                                <HiCheck />
                            </div>
                            <div className='editBundle' onClick={editDataCancel}>
                                <HiMiniXMark />
                            </div>
                        </div>
                        :
                        <div className='editBundle' onClick={editData}>
                            <HiPencilSquare />
                        </div>
                    }


                </div>
            </div>
            <div className='boxOfDetail row'>
                {detail === null || detail === undefined ? '' : (
                    Object.entries(detail).map(([key, value], index) => (
                        key === 'activityIntervalTime' || key === 'prices' ?
                            null :
                            <div key={index} className=" itembundle col-xl-3 col-lg-3 col-md-4 col-ms-6 col-xs-6">
                                {
                                    key === 'type' || key === 'status' ?
                                        key === 'type' ?
                                            type.map((item, index) => (
                                                item.id === value ?
                                                    <div key={index} className="titleB ">
                                                        <div className='header-title'>{key}</div>
                                                        <div className='data-title'>{item.name}</div>
                                                    </div>
                                                    :
                                                    ""))
                                            :

                                            <Switch
                                                id={index}
                                                title={key}
                                                defaultChecked={value === 0 ? true : false}
                                                disabled={editAble === false ? true : false}
                                                onChange={switchHandler}
                                            />

                                        :
                                        key === 'id' ?
                                            <div key={index} className="titleB ">
                                                <div className='header-title'>{key}</div>
                                                <div className='data-title'>{value}</div>
                                            </div>
                                            :

                                            key === 'expireTime' ?
                                                <DatePikerFarsi disable={'disabled'} value={value} readOnly={editAble ? false : true} title={key} handlerChangeDate={updateDataPiker} />
                                                :


                                                <Input inputclassname={editAble === false ? 'disabled' : ''} name={key} title={key} value={value} type={key === 'amount' ? 'number' : 'text'} readOnly={editAble ? false : true} changeInputValue={changeValueInput} />

                                }
                            </div>
                    ))
                )}


                {detail === null || detail === undefined ? '' : (
                    Object.entries(detail).map(([key, value], index) => (
                        Array.isArray(value) ?
                            <div key={index} className="priceBox col-xl-12 col-lg-12 col-md-12 col-ms-12 col-xs-12">
                                <div className='titlePrice'>{key}</div>
                                <div className="priceBody row">
                                    {value.map((item, i) => (
                                        Object.entries(item).map(([key, value], index) => (
                                            key === 'priceType' || key === 'priceStatus' ?
                                                <div className="col-xl-3 col-lg-3 col-md-4 col-ms-6 col-xs-6" key={index}>
                                                    {
                                                        key === 'priceType' ?
                                                            priceType.map((price, index) => (
                                                                price.id === value ?
                                                                    <div key={index} className="titleB">
                                                                        <div className='header-title'>{key}</div>
                                                                        <div className='data-title'>{price.name}</div>
                                                                    </div>
                                                                    :
                                                                    ""
                                                            ))
                                                            :
                                                            <div key={index} className="col-xl-3 col-lg-3 col-md-4 col-ms-6 col-xs-6">
                                                                <Switch
                                                                    id={index}
                                                                    title={key}
                                                                    defaultChecked={value === 0 ? true : false}
                                                                    disabled={editAble === false ? true : false}
                                                                    onChange={switchHandlerPrice}
                                                                />
                                                            </div>
                                                    }
                                                </div>
                                                :

                                                <div key={index} className="titleB col-xl-3 col-lg-3 col-md-4 col-ms-6 col-xs-6">
                                                    <div className='header-title' >{key}</div>
                                                    <div className='data-title'>{value}</div>
                                                </div>

                                        ))

                                    ))}
                                </div>
                            </div>
                            :


                            key === 'activityIntervalTime' ?
                                <div className='timeBox col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                    <div className="titleTime">{key}</div>
                                    <div className="timeBody row">
                                        {
                                            Object.entries(value).map(([key,value]) => (
                                                console.log('key')

                                                // <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                //     <Input inputclassname={editAble === false ? 'disabled' : ''} readOnly={editAble ? false : true} name={keyTime} value={valueTime} type={'number'} title={'day'} changeInputValue={inputChange} />
                                                // </div>
                                            ))
                                        }
                                    </div>
                                </div>

                                :
                                null
                    ))
                )}

                                                <div key={index} className="titleB col-xl-3 col-lg-2 col-md-2 col-ms-6 col-xs-6">
                                                    <div className='header-title' >{key}</div>
                                                    <div className='data-title'>{value}</div>
                                                </div>

                                        ))

                                    ))}
                                </div>
                            </div>
                            :


                            key === 'activityIntervalTime' ?
                                <div key={index} className='timeBox col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                    <div className="titleTime">{key}</div>
                                    <div className="timeBody row">
                                        {value === undefined || value === null ?
                                            Object.entries(activityIntervalTime).map(([keyTime, valueTime], index) => (
                                                <div key={index} className="col-xl-4 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <Input inputclassname={editAble === false ? 'disabled' : ''} readOnly={editAble ? false : true} name={keyTime} value={'null'} type={'number'} title={keyTime} changeInputValue={sendActivityInteralTime} />
                                                </div>
                                            ))
                                            :
                                            Object.entries(value).map(([keyTime, valueTime], index) => (

                                                // console.log(value)
                                                <div key={index} className="col-xl-4 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <Input inputclassname={editAble === false ? 'disabled' : ''} readOnly={editAble ? false : true} name={keyTime} value={valueTime} type={'number'} title={keyTime} changeInputValue={inputChange} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                                :
                                null
                    ))}
                </div>
            }
        </div>
    );
}

export default Index;
