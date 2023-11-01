import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Detail.scss';
import Switch from '../../../../../Components/Switch/Switch';

function Index() {
    const [detail, setDetail] = useState({});
    const { bundleId } = useParams()
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
        axios.get(`/admin-stuff/get-bundle/${bundleId}`)
            .then(res => {
                setDetail(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className='bundleDetail'>
            <div className='boxOfDetail'>
                {detail === null || detail === undefined ? (
                    ''
                ) : (
                    Object.entries(detail).map(([key, value], index) => (
                        <div key={index} className={`titleB ${Array.isArray(value) ? 'priceTitle' : ''}`}>
                            <div className='header-title'>{key}</div>
                            {Array.isArray(value) ? (
                                value.map((item, i) => (
                                    <div key={i} className='sub-data'>
                                        {Object.entries(item).map(([key, value], index) => (
                                            <div className='listItems' key={index}>
                                                <div className='header-title'>{key}</div>
                                                <div className='data-title'>
                                                    {
                                                        key === 'priceType' || key === 'priceStatus' ?
                                                            (key === 'priceType' ?
                                                                priceType.map(price => (
                                                                    price.id === value ?
                                                                        price.name
                                                                        :
                                                                        ""
                                                                ))
                                                                :
                                                                <Switch
                                                                    id={item.id}
                                                                    defaultChecked={value === 0 ? true : false}
                                                                    disabled={false}
                                                                    onChange={switchHandlerPrice}
                                                                />
                                                            )
                                                            : value
                                                    }
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <div className='data-title'>
                                    {
                                        key === 'type' || key === "status" ?
                                            key === 'type' ?
                                                type.map(item => (
                                                    item.id === value ?
                                                        item.name
                                                        :
                                                        ""))

                                                :
                                                <Switch
                                                    id={detail.id}
                                                    defaultChecked={value === 0 ? true : false}
                                                    disabled={false}
                                                    onChange={switchHandler}
                                                />
                                            :
                                            value
                                    }
                                </div>
                            )}

                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Index;
