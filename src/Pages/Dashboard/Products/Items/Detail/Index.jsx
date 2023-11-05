import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Detail.scss';
import Switch from '../../../../../Components/Switch/Switch';
import Input from '../../../../../Components/Input/Input';
import { HiPencilSquare } from "react-icons/hi2";

function Index() {
    const [edit, setEdit] = useState(false)
    const [detail, setDetail] = useState(null);
    const { itemId } = useParams()
    const navigate = useNavigate()

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

    const switchHandler = (boolean, id) => {
        console.log("boolean,id", boolean, id);
        axios.patch(`/admin-stuff/change-item-status/${id}`, {
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

    const handlerClose = () => {
        navigate('./')
    }

    useEffect(() => {
        axios.get(`/admin-stuff/get-item/${itemId}`)
            .then(res => {
                setDetail(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className='itemDetail'>
            <div className='edited' onClick={editDetail}><HiPencilSquare /></div>
            <div className='boxOfDetail'>
                {detail === null || detail === undefined ? '' : (
                    Object.entries(detail).map(([key, value], index) => (
                        <div key={index} className={`titleB ${Array.isArray(value) ? 'priceTitle' : ''}`}>
                            {Array.isArray(value) ? <div className='titlePrice'>{key}</div> : ''}
                            {Array.isArray(value) ?
                                <div className="priceBox row">
                                    {value.map((item, i) => (
                                        Object.entries(item).map(([key, value], index) => (
                                            key === 'priceType' || key === 'priceStatus' ?
                                                <div className="col-xl-3 col-lg-3 col-md-6" key={index}>
                                                    {
                                                        key === 'priceType' ?
                                                            priceType.map(price => (
                                                                price.id === value ?
                                                                    <Input inputclassname={edit === false ? 'active' : ''} title={key} value={price.name} readOnly={true} />
                                                                    :
                                                                    ""
                                                            ))
                                                            :
                                                            <Switch
                                                                id={index}
                                                                title={key}
                                                                defaultChecked={value === 0 ? true : false}
                                                                disabled={false}
                                                                onChange={switchHandlerPrice}
                                                            />
                                                    }
                                                </div>
                                                :
                                                key === 'id' ?
                                                    <div className="titleB">
                                                        <div className='header-title'>{key}</div>
                                                        <div className='data-title'>{value}</div>
                                                    </div>
                                                    :
                                                    <div className='col-xl-3 col-lg-3 col-md-6' key={i}>
                                                        <Input inputclassname={edit === false ? 'active' : ''} title={key} value={value} readOnly={true} />
                                                    </div>
                                        ))

                                    ))}
                                </div>
                                :
                                key === 'type' || key === 'status' ?
                                    key === 'type' ?
                                        type.map(item => (
                                            item.id === value ?
                                                <div className="">
                                                    <Input inputclassname={edit === false ? 'active' : ''} title={key} value={item.name} readOnly={true} />
                                                </div>

                                                :
                                                ""))
                                        :
                                        <Switch
                                            id={index}
                                            title={key}
                                            defaultChecked={value === 0 ? true : false}
                                            disabled={false}
                                            onChange={switchHandlerPrice}
                                        />
                                    :
                                    key === 'id' ?
                                        <div className="titleB">
                                            <div className='header-title'>{key}</div>
                                            <div className='data-title'>{value}</div>
                                        </div>
                                        :
                                        <div className="">
                                            <Input inputclassname={edit === false ? 'active' : ''} title={key} value={value} readOnly={edit === true ? false : true} />
                                        </div>}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Index;
