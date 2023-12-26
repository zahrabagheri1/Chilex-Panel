import React, { useEffect, useState } from 'react';
import './List.scss';
import Table from '../../../../../layout/Table/Table';
import { sortBundles } from '../../../../../Data/Sort';
import { HiPlus } from "react-icons/hi2";
import axios from 'axios';
import ScrollContainer from 'react-indiana-drag-scroll';
import ModalAddProducts from '../../../../../layout/ModalAddProducts/ModalAddProducts';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../../../Components/Input/Input';
import SelectOption from '../../../../../Components/SelectOption/SelectOption';
import { useCookies } from 'react-cookie';

function Index() {
    const [bundles, setBundles] = useState(null);
    const [modal, setModal] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        bundleType: null,
        sku: null,
        bundleStatus: null,
        priceStatus: null,
        limit: null,
        offset: null,
        sortBy: 3,
        orderBy: 1,
    })
    console.log(cookies)
    // ${parameters.from === null ||  parameters.from === undefined? "" : "&RegisterDate.min=" + parameters.from}
    //admin-stuff/bundles-all?bundleType=0&sku=zahra&bundleStatus=0&priceStatus=1&limit=2&offset=1&sortBy=3&orderBy=1

    useEffect(() => {
        reqFilterBundle()
    }, [filters])

    const reqFilterBundle = () => {
        axios.get(`/admin-stuff/bundles-all?${filters.bundleType === null || filters.bundleType === undefined ? '' : 'bundleType=' + filters.bundleType + '&'}${filters.sku === null || filters.sku === undefined ? '' : 'sku=' + filters.sku + '&'}${filters.bundleStatus === null || filters.bundleStatus === undefined ? '' : 'bundleStatus=' + filters.bundleStatus + '&'}${filters.priceStatus === null || filters.priceStatus === undefined ? '' : 'priceStatus=' + filters.priceStatus + '&'}${filters.limit === null || filters.limit === undefined ? '' : 'limit=' + filters.limit + '&'}${filters.offset === null || filters.offset === undefined ? '' : 'offset=' + filters.offset + '&'}${filters.sortBy === null || filters.sortBy === undefined ? '' : 'sortBy=' + filters.sortBy + '&'}${filters.orderBy === null || filters.orderBy === undefined ? '' : 'orderBy=' + filters.orderBy}`,
            {
                headers: {
                    Cookie: '',
                }
            })
            .then(
                res => setBundles(res.data.data)
            )
            .catch(
                err => console.log(err)
            )
    }


    const showDetailBandle = (id) => {
        navigate(`${id}`)
    }

    const hundelOpenModal = () => {
        setModal(true)
    }
    const handlerCloseModal = () => {
        setModal(false)
    }

    const updateInputData = (e) => {
        setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const updateOptionData = (name, id) => {
        setFilters((prev) => ({ ...prev, [name]: id }))
    }

    return (
        <div className='bundleList'>
            <div className='top'>
                <div className='filter row'>
                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                        <SelectOption readOnly={false} name={'bundleType'} defaultValue={'bundleType'} type={'status'} changeOptinValue={updateOptionData}
                            data={[
                                { id: 0, status: 'Gem bundle' },
                                { id: 1, status: 'Coin bundle' },
                            ]}
                        />
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                        <Input name={'sku'} type={'text'} title={"sku"} placeholder={'sku'} changeInputValue={updateInputData} />
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                        <SelectOption readOnly={false} name={'bundleStatus'} defaultValue={'bundleStatus'} type={'status'} changeOptinValue={updateOptionData}
                            data={[
                                { id: 0, status: 'Active' },
                                { id: 1, status: 'Deactive' },
                            ]}
                        />
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                        <SelectOption readOnly={false} name={'priceStatus'} defaultValue={'priceStatus'} type={'status'} changeOptinValue={updateOptionData}
                            data={[
                                { id: 0, status: 'Active' },
                                { id: 1, status: 'Deactive' },
                            ]}
                        />
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                        <Input name={'limit'} type={'number'} title={"limit"} placeholder={'limit'} changeInputValue={updateInputData} />
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                        <Input name={'offset'} type={'number'} title={"offset"} placeholder={'offset'} changeInputValue={updateInputData} />
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                        <SelectOption readOnly={false} name={'sortBy'} defaultValue={'id'} type={'status'} changeOptinValue={updateOptionData}
                            data={[
                                { id: 0, status: 'createdAt' },
                                { id: 1, status: 'updatedAt' },
                                { id: 2, status: 'amount' },
                                { id: 3, status: 'id' },
                                { id: 4, status: 'name' },
                                { id: 5, status: 'status' },
                            ]}
                        />
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                        <SelectOption readOnly={false} name={'orderBy'} defaultValue={'ASC'} type={'status'} changeOptinValue={updateOptionData}
                            data={[
                                { id: 0, status: 'DESC' },
                                { id: 1, status: 'ASC' },
                            ]}
                        />
                    </div>
                </div>

                <div className='addBundle' onClick={hundelOpenModal}>
                    <HiPlus className='icon' />
                </div>
            </div>

            <ScrollContainer>
                <Table data={bundles} sort={sortBundles} action={true} showDetail={showDetailBandle} />
            </ScrollContainer>

            {modal === true ?

                <ModalAddProducts
                    modalTitle={'Add New Bandle'}
                    data={bundles}
                    type={'bundle'}
                    path={'bundles'}
                    hundelerSubmit={hundelOpenModal}
                    handlerClose={handlerCloseModal}
                />

                : ''
            }
        </div>
    );
}

export default Index;

