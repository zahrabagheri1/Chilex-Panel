import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Detail.scss';
import Switch from '../../../../../Components/Switch/Switch';
import Input from '../../../../../Components/Input/Input';
import { HiPencilSquare, HiCheck } from "react-icons/hi2";
import SelectOption from '../../../../../Components/SelectOption/SelectOption';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../../Loading/LoadingContext';

function Index() {
    const [detail, setDetail] = useState({});
    const [editAble, setEditAble] = useState(false)
    const [edit, setEdit] = useState(false)
    const { loading, setLoading } = useContext(LoadingContext)
    const { itemId } = useParams()
    const [updateData, setUpdateData] = useState({})
    const [cookies] = useCookies(['accessToken']);
    const items = [
        {
            name: 'tier',
            data: [
                { id: 0, name: 'DEFAULT' },
                { id: 1, name: 'COMMON' },
                { id: 2, name: 'RARE' },
                { id: 3, name: 'EPIC' },
                { id: 4, name: 'LEGENDARY' },
            ],
        }
        ,
        {
            name: 'category',
            data: [
                { id: 0, name: 'ELSE' },
                { id: 1, name: 'GAME' },
                { id: 2, name: 'CHARACTER' }
            ],
            child: [
                {
                    name: 'gameItemType',
                    data: [
                        { id: 0, name: 'DICE_SKIN' },
                        { id: 1, name: 'CARD_SKIN' },
                        { id: 2, name: 'FLAG_SKIN' },
                        { id: 3, name: 'FORMATION' },
                    ],
                }
                ,
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
                        { id: 8, name: 'HAT' },
                    ],
                }
            ]
        }
        ,

        {
            name: 'gameName',
            data: [
                { id: 0, name: 'DEFAULT' },
                { id: 1, name: 'COMMON' },
                { id: 2, name: 'RARE' },
                { id: 3, name: 'EPIC' },
                { id: 4, name: 'LEGENDARY' }
            ],
        }
    ]

    const types = [
        { id: 0, name: 'Gem bundle' },
        { id: 1, name: 'Coin  bundle' },
    ]
    const priceTypes = [
        { id: 0, name: 'Gem' },
        { id: 1, name: 'Coin' },
        { id: 2, name: 'Rial' },
    ]
    const priceStatus = [
        { id: 0, name: 'Active', status: true },
        { id: 1, name: 'Deactive', status: false },
    ]

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

    const editData = () => {
        setEditAble(!editAble)
    }
    const sendData = () => {
        // setEditAble(false)
        edit === true ?
            axios.patch(`/admin-stuff/update-item/${itemId}`,
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
                        getData()
                        setEditAble(false)
                    }
                )
                .catch(
                    err => console.log(err)
                )

            : setEditAble(false)
    }
    const switchHandler = (boolean, id) => {
        console.log("boolean,id", boolean, id);
        axios.patch(`/admin-stuff/change-item-status/${id}`, {
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
                    getData()
                }
            )
            .catch(
                err => console.log(err)
            )
    }

    const switchHandlerPrice = (boolean, id) => {
        console.log("boolean,id", boolean, id);
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
                    getData()
                }
            )
            .catch(
                err => console.log(err)
            )

    };

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        setLoading(!loading)
        axios.get(`/admin-stuff/get-item/${itemId}`,
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

    return (
        <div className='itemDetail'>
            <div className="itembtns">
                <div className="btnEdit">
                    <div className='edited' onClick={editData}><HiPencilSquare /></div>
                    <div className={editAble === true ? 'ableupdate' : 'disableupdate'} onClick={sendData}><HiCheck /></div>
                </div>
                <div className="addPrice">
                    <div className="">

                    </div>
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
                                                <div className="col-xl-3 col-lg-3 col-md-4 col-ms-6 col-xs-6" key={index}>
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
                                                            <div className="col-xl-3 col-lg-3 col-md-4 col-ms-6 col-xs-6">
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
                                                <div className="titleB col-xl-3 col-lg-3 col-md-4 col-ms-6 col-xs-6">
                                                    <div className='header-title'>{key}</div>
                                                    <div className='data-title'>{value}</div>
                                                </div>
                                        ))
                                    ))}
                                </div>
                            </div>
                            :
                            <div className=" itembundle col-xl-3 col-lg-3 col-md-4 col-ms-6 col-xs-6">
                                {
                                    key === 'id' || key === 'status' ?
                                        key === 'id' ?
                                            <div className="titleB ">
                                                <div className='header-title'>{key}</div>
                                                <div className='data-title'>{value}</div>
                                            </div>
                                            :

                                            <Switch
                                                id={index}
                                                title={key}
                                                defaultChecked={value === 0 ? true : false}
                                                disabled={editAble === false ? true : false}
                                                onChange={switchHandler}
                                            />

                                        :
                                        key === 'sku' || key === 'name' || key === 'imageId' || key === 'gameId' ?
                                            <Input inputclassname={editAble === false ? 'active' : ''} name={key} title={key} value={value} type={key === 'amount' ? 'number' : 'text'} readOnly={editAble === true ? false : true} changeInputValue={updateInputData} />
                                            :
                                            key === 'expireTime' ?
                                                <Input inputclassname={editAble === false ? 'active' : ''} name={key} title={key} value={value} type={'date'} readOnly={editAble === true ? false : true} changeInputValue={updateInputData} />

                                                :
                                                items.map(item => (
                                                    item.name === key ?

                                                        < SelectOption readOnly={editAble === true ? false : true} disable={''} name={key} value={value} defaultValue={value} type={'name'} changeOptinValue={updateOptionData}
                                                            data={item.data}
                                                        />

                                                        :
                                                        ''
                                                ))

                                }
                            </div>
                    ))
                )}

            </div>
        </div>
    );
}

export default Index;
