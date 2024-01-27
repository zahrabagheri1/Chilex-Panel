import React, { useContext, useEffect, useRef, useState } from 'react';
import './List.scss';
import Table from '../../../../../layout/Table/Table';
import { sortBundles } from '../../../../../Data/Sort';
import { HiOutlineTrash, HiPlus } from "react-icons/hi2";
import axios from 'axios';
import ScrollContainer from 'react-indiana-drag-scroll';
import ModalAddProducts from '../../../../../layout/ModalAddProducts/ModalAddProducts';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../../../Components/Input/Input';
import SelectOption from '../../../../../Components/SelectOption/SelectOption';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../../Loading/LoadingContext';
import { LoginContext } from '../../../../Login/LoginContext';
import { API_URL } from '../../../../../API_URL';
import Button from '../../../../../Components/Button/Button';

function Index() {
    const [bundles, setBundles] = useState(null);
    const [modal, setModal] = useState(false);
    const [cookies] = useCookies(['accessToken']);
    const { loading, setLoading } = useContext(LoadingContext);
    const { goToLoginPage } = useContext(LoginContext);
    const navigate = useNavigate();
    const [resetFlag, setResetFlag] = useState(false);
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

    //admin-stuff/bundles-all?bundleType=0&sku=zahra&bundleStatus=0&priceStatus=1&limit=2&offset=1&sortBy=3&orderBy=1
    useEffect(() => {
        goToLoginPage(cookies.accessToken);
        if (resetFlag) {
            reqFilterBundle();
            setResetFlag(false);
        }else{
            reqFilterBundle()
        }
    }, [resetFlag])

    const reqFilterBundle = () => {
        setLoading(true)
        axios.get(`${API_URL === undefined ? '' : API_URL}/admin-stuff/bundles-all?${filters.bundleType === null || filters.bundleType === undefined ? '' : 'bundleType=' + filters.bundleType + '&'}${filters.sku === null || filters.sku === undefined ? '' : 'sku=' + filters.sku + '&'}${filters.bundleStatus === null || filters.bundleStatus === undefined ? '' : 'bundleStatus=' + filters.bundleStatus + '&'}${filters.priceStatus === null || filters.priceStatus === undefined ? '' : 'priceStatus=' + filters.priceStatus + '&'}${filters.limit === null || filters.limit === undefined ? '' : 'limit=' + filters.limit + '&'}${filters.offset === null || filters.offset === undefined ? '' : 'offset=' + filters.offset + '&'}${filters.sortBy === null || filters.sortBy === undefined ? '' : 'sortBy=' + filters.sortBy + '&'}${filters.orderBy === null || filters.orderBy === undefined ? '' : 'orderBy=' + filters.orderBy}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(
                res => {
                    setBundles(res.data.data)
                    setLoading(false)
                }
            )
            .catch(
                err => console.log(err)
            )
    }


    const resetFillters = () => {
        setFilters({
            bundleType: null,
            sku: null,
            bundleStatus: null,
            priceStatus: null,
            limit: null,
            offset: null,
            sortBy: 3,
            orderBy: 1,
        })
        setResetFlag(true);
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

    const filterhandler = () => {
        reqFilterBundle()
    }
    return (
        <div className='bundleList'>
            <div className='top'>
                <div className='filter'>
                    <div className="row">
                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                            <SelectOption readOnly={false} name={'bundleType'} defaultValue={'bundleType'} value={filters.bundleType} type={'status'} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'Gem bundle' },
                                    { id: 1, status: 'Coin bundle' },
                                ]}
                            />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                            <Input name={'sku'} type={'text'} title={"sku"} placeholder={'sku'} value={filters.sku} changeInputValue={updateInputData} />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                            <SelectOption readOnly={false} name={'bundleStatus'} defaultValue={'bundleStatus'} value={filters.bundleStatus} type={'status'} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'Active' },
                                    { id: 1, status: 'Deactive' },
                                ]}
                            />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                            <SelectOption readOnly={false} name={'priceStatus'} defaultValue={'priceStatus'} value={filters.priceStatus} type={'status'} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'Active' },
                                    { id: 1, status: 'Deactive' },
                                ]}
                            />
                        </div>
                        {/* <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                        <Input name={'limit'} type={'number'} title={"limit"} placeholder={'limit'} changeInputValue={updateInputData} />
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                        <Input name={'offset'} type={'number'} title={"offset"} placeholder={'offset'} changeInputValue={updateInputData} />
                    </div> */}
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
                        <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-xs-12">
                            <Button title={'Filter'} className={'filterBtn'} classnameBtn={'filterBtnBox'} btnhandler={filterhandler} />
                        </div>

                    </div>
                    <div className="resetFillters" onClick={resetFillters}>
                        <HiOutlineTrash />
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
                    modalTitle={'Add New bundle'}
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

