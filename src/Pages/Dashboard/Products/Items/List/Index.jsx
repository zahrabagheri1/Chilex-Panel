import React, { useEffect, useState } from 'react';
import './List.scss';
import axios from 'axios';
import { HiPlus } from "react-icons/hi2";
import { sortItems } from '../../../../../Data/Sort';
import Table from '../../../../../layout/Table/Table';
import Modal from '../../../../../layout/Modal/Modal';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../../../Components/Input/Input';
import SelectOption from '../../../../../Components/SelectOption/SelectOption';

function Index() {
    const [items, setItems] = useState([]);
    const [modal, setModal] = useState(false);
    const [detailItem, setDetailItem] = useState(false);
    const [value, setValue] = useState();
    const navigate = useNavigate()
    const [filter, setFilter] = useState({
        sku: null,
        itemStatus: null,
        priceStatus: null,
        limit: null,
        offset: null,
        orderBy: null,
    })

    // ${parameters.from === null ||  parameters.from === undefined? "" : "&RegisterDate.min=" + parameters.from}
    //admin-stuff/items-all?sku=a&itemStatus=1&priceStatus=1&limit=1&offset=1&sortBy=1&orderBy=1

    useEffect(() => {
        reqFilterItem()
    })

    const reqFilterItem = () => {
        axios.get(`/admin-stuff/items-all?${filter.sku === null || filter.sku === undefined ? '' : "sku=" + filter.sku + '&'}
        ${filter.itemStatus === null || filter.itemStatus === undefined ? '' : "itemStatus=" + filter.itemStatus + '&'}
        ${filter.priceStatus === null || filter.priceStatus === undefined ? '' : "priceStatus=" + filter.priceStatus + '&'}
        ${filter.limit === null || filter.limit === undefined ? '' : "limit=" + filter.limit + '&'}
        ${filter.offset === null || filter.offset === undefined ? '' : "offset=" + filter.offset + '&'}
        ${filter.orderBy === null || filter.orderBy === undefined ? '' : "orderBy=" + filter.orderBy + '&'}
        `).then(
            res => console.log(res)
        ).catch(
            err => console.log(err)
        )
    }

    useEffect(() => {
        axios.get('/admin-stuff/items-all')
            .then((res) => {
                // console.log(res.data.data)
                setItems(res.data.data)
            })
            .catch(err => console.log(err))
    }, [])

    const showDetailItem = (id) => {
        navigate(`${id}`)
    }

    const handelOpenModal = () => {
        setModal(true)
    }

    const handlerCloseModal = () => {
        setModal(false)
    }


    return (
        <div className='item'>
            <div className='top'>
                <div className='filter'>
                    <SelectOption classname='control' value={value} name={'bundleType'} defaultValue={'bundleType'} type={'status'}
                        data={[
                            { id: 0, status: 'Gem bundle' },
                            { id: 1, status: 'Coin bundle' },
                        ]}
                    />

                    <Input classname='controlinput' value={value} type={'text'} title={"sku"} placeholder={'sku'} changeInputValue={''} />

                    <SelectOption classname='control' value={value} name={'bundleStatus'} defaultValue={'bundleStatus'} type={'status'}
                        data={[
                            { id: 0, status: 'Active' },
                            { id: 1, status: 'Deactive' },
                        ]}
                    />

                    <SelectOption classname='control' value={value} name={'priceStatus'} defaultValue={'priceStatus'} type={'status'}
                        data={[
                            { id: 0, status: 'Active' },
                            { id: 1, status: 'Deactive' },
                        ]}
                    />

                    <Input classname='controlinput' value={value} type={'text'} title={"limit"} placeholder={'limit'} changeInputValue={''} />

                    <Input classname='controlinput' value={value} type={'text'} title={"offset"} placeholder={'offset'} changeInputValue={''} />

                    <SelectOption classname='control' value={value} name={'sortBy'} defaultValue={'createdAt'} type={'status'}
                        data={[
                            { id: 0, status: 'createdAt' },
                            { id: 1, status: 'updatedAt' },
                            { id: 2, status: 'amount' },
                            { id: 3, status: 'id' },
                            { id: 4, status: 'name' },
                            { id: 5, status: 'status' },
                        ]}
                    />
                    <SelectOption classname='control' value={value} name={'orderBy'} defaultValue={'orderBy'} type={'status'}
                        data={[
                            { id: 0, status: 'DESC' },
                            { id: 1, status: 'ASC' },
                        ]}
                    />
                </div>

                <div className='addItem' onClick={handelOpenModal}>
                    <HiPlus className='icon' />
                </div>
            </div>

            <ScrollContainer>
                <Table data={items} sort={sortItems} action={true} showDetail={showDetailItem} />
            </ScrollContainer>

            {modal === true ?
                <div className="modalBandel">
                    <Modal
                        modalTitle={'Add New Item'}
                        data={items}
                        path={'items'}
                        handelerSubmit={handelOpenModal}
                        handlerClose={handlerCloseModal}
                    />
                </div>

                : ''
            }
        </div>

    );
}

export default Index;
