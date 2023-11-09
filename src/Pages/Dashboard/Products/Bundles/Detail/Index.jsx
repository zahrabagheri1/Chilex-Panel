import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Detail.scss';
import Switch from '../../../../../Components/Switch/Switch';
import Input from '../../../../../Components/Input/Input';
import { HiPencilSquare } from "react-icons/hi2";
import ButtonActionGreen from '../../../../../Components/ButtonActionGreen/ButtonActionGreen';

function Index() {
    const [detail, setDetail] = useState({});
    const [edit, setEdit] = useState(false)
    const { bundleId } = useParams()
    const navigate = useNavigate()
    const [updateData, setUpdateData] = useState({})

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
        setEdit(true)
    }

    const changeValueInput = (e) => {
        setUpdateData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const changeValeSwitch = (e) => {
        setUpdateData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


    const sendData = () => {
        setEdit(false)

        axios.patch(`/admin-stuff/update-bundle/${bundleId}`,
            {
                name: updateData.name === null || updateData.name === undefined ? detail.name : updateData.name,
                expireTime: updateData.expireTime === null || updateData.expireTime === undefined ? detail.expireTime : updateData.expireTime,
                imageId: updateData.imageId === null || updateData.imageId === undefined ? detail.imageId : updateData.imageId,
                sku: updateData.sku === null || updateData.sku === undefined ? detail.sku : updateData.sku,
                amount: updateData.amount === null || updateData.amount === undefined ? detail.amount :parseInt(updateData.amount),
                activityIntervalTime: updateData.activityIntervalTime === null || updateData.activityIntervalTime === undefined ? detail.activityIntervalTime : {}
            })
            .then(
                res => {
                    console.log(res)
                    getData()
                }

            )
            .catch(
                err => console.log(err)
            )
    }


    const switchHandler = (boolean, id) => {
        console.log("boolean , id", boolean, id);
        axios.patch(`/admin-stuff/change-bundle-status/${id}`, {
            status: boolean === true ? 0 : 1,
        })
            .then(
                res => console.log(res)
            )
            .catch(
                err => console.log(err)
            )

    }

    const switchHandlerPrice = (boolean, id) => {
        console.log("boolean,id", boolean, id);
        axios.patch(`/admin-stuff/change-price-status/${id}`, {
            status: boolean === true ? 0 : 1,
        })
            .then(
                res => {
                    console.log(res)
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
        axios.get(`/admin-stuff/get-bundle/${bundleId}`)
            .then(res => {
                setDetail(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className='bundleDetail'>
            <div className="btnEdit">
                <div className='edited' onClick={editDetail}><HiPencilSquare /></div>
                <div className='update'><ButtonActionGreen title={'Edit'} handler={sendData} /></div>
            </div>
            <div className='boxOfDetail row'>
                {detail === null || detail === undefined ? '' : (
                    Object.entries(detail).map(([key, value], index) => (
                        Array.isArray(value) ?
                            <div className="priceBox col-xl-12 col-lg-12 col-md-12 col-ms-12 col-xs-12">
                                <div className='titlePrice'>{key}</div>
                                <div className="priceBody row">
                                    {value.map((item, i) => (
                                        Object.entries(item).map(([key, value], index) => (
                                            key === 'priceType' || key === 'priceStatus' ?
                                                <div className="col-xl-3 col-lg-3 col-md-4 col-ms-6 col-xs-6" key={index}>
                                                    {
                                                        key === 'priceType' ?
                                                            priceType.map(price => (
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
                                                                    disabled={edit === false ? true : false}
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
                                    key === 'type' || key === 'status' ?
                                        key === 'type' ?
                                            type.map(item => (
                                                item.id === value ?
                                                    <div className="titleB ">
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
                                                disabled={edit === false ? true : false}
                                                onChange={switchHandler}
                                            />

                                        :
                                        key === 'id' ?
                                            <div className="titleB ">
                                                <div className='header-title'>{key}</div>
                                                <div className='data-title'>{value}</div>
                                            </div>
                                            :
                                            <Input inputclassname={edit === false ? 'active' : ''} name={key} title={key} value={value} type={key === 'amount' ? 'number' : 'text'} readOnly={edit === true ? false : true} changeInputValue={changeValueInput} />
                                }
                            </div>
                    ))
                )}

            </div>
        </div>
    );
}

export default Index;
