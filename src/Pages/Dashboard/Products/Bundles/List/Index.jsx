import React, { useEffect, useState } from 'react';
import './List.scss';
import Table from '../../../../../layout/Table/Table';
import { sortBundles } from '../../../../../Data/Sort';
import { HiPlus } from "react-icons/hi2";
import axios from 'axios';
import ScrollContainer from 'react-indiana-drag-scroll';
import Modal from '../../../../../layout/Modal/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../../../Components/Input/Input';
import SelectOption from '../../../../../Components/SelectOption/SelectOption';

function Index() {
    const [bundles, setBundles] = useState([]);
    const [modal, setModal] = useState(false);
    const [value, setValue] = useState();
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        bundleType: null,
        sku: null,
        bundleStatus: null,
        priceStatus: null,
        limit: null,
        offset: null,
        sortBy: null,
        orderBy: null,
    })

    // ${parameters.from === null ||  parameters.from === undefined? "" : "&RegisterDate.min=" + parameters.from}
    //admin-stuff/bundles-all?bundleType=0&sku=zahra&bundleStatus=0&priceStatus=1&limit=2&offset=1&sortBy=3&orderBy=1
    
    useEffect(() => {
        reqFilterBundle()
    })

    const reqFilterBundle = () => {
        axios.get(`/admin-stuff/bundles-all?
        ${filters.bundleType === null || filters.bundleType === undefined ? '' : 'bundleType=' +filters.bundleType + '&'}
        ${filters.sku === null || filters.sku === undefined ? '' : 'sku=' + filters.sku + '&'}
        ${filters.bundleStatus === null || filters.bundleStatus === undefined ? '' : 'bundleStatus=' + filters.bundleStatus + '&'}
        ${filters.limit === null || filters.limit === undefined ? '' : 'priceStatus=' + filters.priceStatus + '&'}
        ${filters.limit === null || filters.limit === undefined ? '' : 'limit=' + filters.limit + '&'}
        ${filters.offset === null || filters.offset === undefined ? '' : 'offset=' + filters.offset + '&'}
        ${filters.sortBy === null || filters.sortBy === undefined ? '' : 'sortBy=' + filters.sortBy + '&'}
        ${filters.orderBy === null || filters.orderBy === undefined ? '' : 'orderBy=' + filters.orderBy + '&'}`)
            .then(
                res => console.log(res)
            )
            .catch(
                err => console.log(err)
            )
    }


    useEffect(() => {
        axios.get('/admin-stuff/bundles-all')
            .then((res) => {
                // console.log(res.data.data)
                setBundles(res.data.data)
            })
            .catch(err => console.log(err))
    }, [])

    const showDetailBandle = (id) => {
        navigate(`${id}`)
    }

    const hundelOpenModal = () => {
        setModal(true)
    }
    const handlerCloseModal = () => {
        setModal(false)
    }

    return (
        <div className='bundles'>
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

                <div className='addBundle' onClick={hundelOpenModal}>
                    <HiPlus className='icon' />
                </div>
            </div>

            <ScrollContainer>
                <Table data={bundles} sort={sortBundles} action={true} showDetail={showDetailBandle} />
            </ScrollContainer>

            {modal === true ?
                <div className="modalBundle">
                    <Modal
                        modalTitle={'Add New Bandle'}
                        data={bundles}
                        path={'bundles'}
                        hundelerSubmit={hundelOpenModal}
                        handlerClose={handlerCloseModal}
                    />
                </div>
                : ''
            }
        </div>
    );
}

export default Index;

