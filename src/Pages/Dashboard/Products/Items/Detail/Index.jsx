import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Detail.scss';
import Switch from '../../../../../Components/Switch/Switch';
import Input from '../../../../../Components/Input/Input';
import { HiPencilSquare, HiCheck, HiChevronLeft, HiMiniXMark } from "react-icons/hi2";
import SelectOption from '../../../../../Components/SelectOption/SelectOption';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../../Loading/LoadingContext';
import { LoginContext } from '../../../../Login/LoginContext';
import Alert from '../../../../../layout/Alert/Alert';
import DatePikerFarsi from '../../../../../Components/DatePikerFarsi/DatePikerFarsi';
import { API_URL } from '../../../../../API_URL';


const detail = {
    id: 6,
    name: "char2",
    status: 0,
    imageId: null,
    sku: "char2",
    expireTime: null,
    tier: 0,
    category: 2,
    gameItemType: null,
    emoteItemType: null,
    characterItemType: 4,
    gameId: null,
    datasetId: "char2",
    datasetGroup: "item",
    gameName: null,
    prices: [
        {
            id: 16,
            amount: 50,
            priceType: 1,
            priceStatus: 0
        }
    ]
}

function Index() {
    const [ddetail, setDetail] = useState({});
    const [editAble, setEditAble] = useState(false)
    const [edit, setEdit] = useState(false)
    const { loading, setLoading } = useContext(LoadingContext);
    const { goToLoginPage } = useContext(LoginContext);
    const { id } = useParams();
    const navigate = useNavigate()
    const [updateData, setUpdateData] = useState({})
    const [cookies] = useCookies(['accessToken']);
    const [showAlert, setShowAlert] = useState({
        status: false
    })
    const items = [
        {
            name: 'id',
            data: null,
            type: 'input',
            edit: false
        },
        {
            name: 'name',
            data: null,
            type: 'input',
            edit: true
        },
        {
            name: 'status',
            data: null,
            type: 'switch',
            edit: true
        },
        {
            name: 'imageId',
            data: null,
            type: 'input',
            edit: true
        },
        {
            name: 'sku',
            data: null,
            type: 'input',
            edit: true
        },
        {
            name: 'expireTime',
            data: null,
            type: 'datepiker',
            edit: true
        },
        {
            name: 'tier',
            data: [
                { id: 0, name: 'DEFAULT' },
                { id: 1, name: 'COMMON' },
                { id: 2, name: 'RARE' },
                { id: 3, name: 'EPIC' },
                { id: 4, name: 'LEGENDARY' },
            ],
            type: 'selectOpsion',
            edit: true
        },
        {
            name: 'category',
            data: [
                { id: 0, name: 'ELSE' },
                { id: 1, name: 'GAME' },
                { id: 2, name: 'CHARACTER' },
                { id: 3, name: 'Emot' },
            ],
            type: 'selectOpsion',
            edit: true
        },
        {
            name: 'gameItemType',
            data: [
                { id: 0, name: 'DICE_SKIN' },
                { id: 1, name: 'CARD_SKIN' },
                { id: 2, name: 'FLAG_SKIN' },
                { id: 3, name: 'FORMATION' }
            ],
            type: 'selectOpsion',
            edit: true
        },
        {
            name: 'characterItemType',
            data: [
                { id: 0, name: 'CLOTHES' },
                { id: 1, name: 'FACE' },
                { id: 2, name: 'HAIR' },
                { id: 3, name: 'BEARD' },
                { id: 4, name: 'EYE' },
                { id: 5, name: 'EYEBROWS' },
                { id: 6, name: 'GLASESS' },
                { id: 7, name: 'MASK' },
                { id: 8, name: 'HAT' }
            ],
            type: 'selectOpsion',
            edit: true
        },
        {
            name: 'gameId',
            data: [
                { id: 0, status: 'Ludo' },
                { id: 1, status: 'Uno' },
                { id: 2, status: 'Backgammon ' },
                { id: 3, status: 'Soccer' },
                { id: 4, status: 'Yadzy' }
            ],
            type: 'selectOpsion',
            edit: true
        },
        {
            name: 'datasetId',
            data: null,
            type: 'input',
            edit: true
        },
        {
            name: 'datasetGroup',
            data: null,
            type: 'input',
            edit: true
        },
        {
            name: 'prices',
            data: null,
            type: 'input',
            child: [
                {
                    name: 'id',
                    data: null,
                    type: 'input',
                    edit: true
                },
                {
                    name: 'amount',
                    data: null,
                    type: 'input',
                    edit: true
                },
                {
                    name: 'priceType',
                    data: null,
                    type: 'input',
                    edit: true
                },
                {
                    name: 'priceStatus',
                    data: null,
                    type: 'switch',
                    edit: true
                },

            ]
        },
    ]
    const priceTypes = [{ id: 0, name: 'Gem' }, { id: 1, name: 'Coin' }, { id: 2, name: 'Rial' }]

    const updateInputData = (e) => {
        if (e.target.type === 'number') {
            setUpdateData((prev) => ({ ...prev, [e.target.name]: parseInt(e.target.value) }))
            setEdit(true)
        } else {
            setUpdateData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            setEdit(true)
        }
    }

    const updateOptionData = (name, id) => {
        setUpdateData((prev) => ({ ...prev, [name]: parseInt(id) }))
        setEdit(true)
    }

    const updateDataPiker = (e, title) => {
        setUpdateData((prev) => ({ ...prev, [title]: e }))
        setEdit(true)
    }


    const sendData = () => {
        // setEditAble(false)
        edit === true ?
            axios.patch(`${API_URL === undefined ? '' : API_URL}/admin-stuff/update-item/${id}`,
                {
                    name: updateData.name === null || updateData.name === undefined ? detail.name : updateData.name,
                    expireTime: updateData.expireTime === null || updateData.expireTime === undefined ? detail.expireTime : updateData.expireTime,
                    imageId: updateData.imageId === null || updateData.imageId === undefined ? detail.imageId : updateData.imageId,
                    sku: updateData.sku === null || updateData.sku === undefined ? detail.sku : updateData.sku,
                    tier: updateData.tier === null || updateData.tier === undefined ? detail.tier : updateData.tier,
                    category: updateData.category === null || updateData.category === undefined ? detail.category : updateData.category,
                    gameId: updateData.gameId === null || updateData.gameId === undefined ? detail.gameId : updateData.gameId,
                    gameItemType: updateData.gameItemType === null || updateData.gameItemType === undefined ? detail.gameItemType : updateData.gameItemType,
                    characterItemType: updateData.characterItemType === null || updateData.characterItemType === undefined ? detail.characterItemType : updateData.characterItemType,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + cookies.accessToken
                    }
                })
                .then(
                    res => {
                        setShowAlert({ status: true, msg: 'Done', success: true })
                        setTimeout(() => {
                            setShowAlert({ status: false, msg: 'Done' })
                        }, 3000)
                        getData()

                        setEditAble(false)
                    }
                )
                .catch(
                    err => {
                        setShowAlert({ status: true, msg: err.response.data.message, success: false })
                        setTimeout(() => {
                            setShowAlert({ status: false, msg: err.response.data.message, success: false })
                        }, 3000)
                    }
                )

            : setEditAble(false)
    }

    const switchHandler = (boolean, id) => {
        axios.patch(`${API_URL === undefined ? '' : API_URL}/admin-stuff/change-item-status/${id}`, {
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
                    setShowAlert({ status: true, msg: err.response.data.message, success: false })
                    setTimeout(() => {
                        setShowAlert({ status: false, msg: err.response.data.message, success: false })
                    }, 3000)
                }
            )
    }

    const switchHandlerPrice = (boolean, id) => {
        axios.patch(`${API_URL === undefined ? '' : API_URL}/admin-stuff/change-price-status/${id}`, {
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
                    setShowAlert({ status: true, msg: "Done", success: true })
                    setTimeout(() => {
                        setShowAlert({ status: false, msg: 'Done' })
                    }, 3000)
                    getData()
                    setEditAble(false)
                }
            )
            .catch(
                err => {
                    setShowAlert({ status: true, msg: err.response.data.message, success: true })
                    setTimeout(() => {
                        setShowAlert({ status: false, msg: err.response.data.message })
                    }, 3000)
                }
            )

    };

    useEffect(() => {
        goToLoginPage(cookies.accessToken);
        getData()
    }, [])

    const getData = () => {
        setLoading(!loading)
        axios.get(`${API_URL === undefined ? '' : API_URL}/admin-stuff/get-item/${id}`,
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

    const editData = () => {
        setEditAble(!editAble)
    }

    const editDataCancel = () => {
        setEditAble(!editAble)
    }

    const hundelBack = () => {
        navigate(-1)
    }
    return (
        <div className='itemDetail'>
            {showAlert.status === true ?
                <Alert message={showAlert.msg} success={showAlert.success} />
                :
                ''
            }
            <div className="addBox">
                <div className='backBundle' onClick={hundelBack}>
                    <HiChevronLeft />
                </div>
                <div className="titleBundle">Details Of Item {id}</div>
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
                        Array.isArray(value) && key === "prices" ?
                            <div key={index} className="priceBox col-xl-12 col-lg-12 col-md-12 col-ms-12 col-xs-12">
                                <div className='titlePrice'>{key}</div>
                                <div className="priceBody row">
                                    {value.map((item, i) => (
                                        Object.entries(item).map(([key, value], index) => (
                                            key === 'priceType' || key === 'priceStatus' ?
                                                <div key={index} className="col-xl-3 col-lg-2 col-md-2 col-ms-6 col-xs-6">
                                                    {
                                                        key === 'priceType' ?
                                                            priceTypes.map(price => (
                                                                price.id === value ?
                                                                    <div className="titleB">
                                                                        <div className='header-title'>{key}</div>
                                                                        <div className='data-title'>{price.name}</div>
                                                                    </div>
                                                                    :
                                                                    ""
                                                            ))
                                                            :
                                                            <div className="col-xl-3 col-lg-2 col-md-2 col-ms-6 col-xs-6">
                                                                <Switch
                                                                    id={id}
                                                                    title={key}
                                                                    defaultChecked={value === 0 ? true : false}
                                                                    disabled={editAble === false ? true : false}
                                                                    onChange={switchHandlerPrice}
                                                                />
                                                            </div>
                                                    }
                                                </div>
                                                :
                                                <div key={index} className="titleB col-xl-3 col-lg-2 col-md-2 col-ms-6 col-xs-6">
                                                    <div className='header-title'>{key}</div>
                                                    <div className='data-title'>{value}</div>
                                                </div>
                                        ))
                                    ))}
                                </div>
                            </div>
                            :

                            items.map(item => (
                                item.name === key ?
                                    item.edit === false ?
                                        <div key={index} className=" itembundle col-xl-2 col-lg-2 col-md-2 col-ms-6 col-xs-6">
                                            <div className="titleB ">
                                                <div className='header-title'>{key}</div>
                                                <div className='data-title'>{value}</div>
                                            </div>
                                        </div>
                                        :
                                        item.type === 'input' ?
                                            <div key={index} className=" itembundle col-xl-2 col-lg-2 col-md-2 col-ms-6 col-xs-6">
                                                <Input inputclassname={editAble === false ? 'active' : ''} name={key} title={item.name} value={value} type={key === 'amount' ? 'number' : 'text'} readOnly={editAble === true ? false : true} changeInputValue={updateInputData} />
                                            </div>
                                            : item.type === 'switch' ?
                                                <div key={index} className=" itembundle col-xl-2 col-lg-2 col-md-2 col-ms-6 col-xs-6">
                                                    <Switch id={id} title={key} defaultChecked={value === 0 ? true : false} disabled={editAble === false ? true : false} onChange={switchHandler} />
                                                </div>
                                                : item.type === 'selectOpsion' ?
                                                    <div key={index} className=" itembundle col-xl-2 col-lg-2 col-md-2 col-ms-6 col-xs-6">
                                                        < SelectOption readOnly={editAble === true ? false : true} disable={''} name={key} value={value} defaultValue={value} type={'name'} changeOptinValue={updateOptionData}
                                                            data={item.data}
                                                        />
                                                    </div>
                                                    : item.type === 'datepiker' ?
                                                        <div key={index} className=" itembundle col-xl-2 col-lg-2 col-md-2 col-ms-6 col-xs-6">
                                                            <DatePikerFarsi disable={'disabled'} value={value} readOnly={editAble ? false : true} title={key} handlerChangeDate={updateDataPiker} />
                                                        </div>
                                                        : ''
                                    : ''
                            ))


                    ))
                )}

            </div>
        </div>
    );
}

export default Index;
