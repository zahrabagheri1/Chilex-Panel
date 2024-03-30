import React, { useContext, useEffect, useState } from 'react';
import './List.scss';
import Table from '../../../../../layout/Table/Table';
import { sortBundles } from '../../../../../Data/Sort';
import { HiPlus } from "react-icons/hi2";
import axios from 'axios';
import ModalAddProducts from '../../../../../layout/ModalAddProducts/ModalAddProducts';
import { useNavigate } from 'react-router-dom';
import Input from '../../../../../Components/Input/Input';
import SelectOption from '../../../../../Components/SelectOption/SelectOption';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../../Loading/LoadingContext';
import { LoginContext } from '../../../../Login/LoginContext';
import { API_URL } from '../../../../../API_URL';
import ButtonActionBlue from '../../../../../Components/ButtonActionBlue/ButtonActionBlue';
import ButtonActionGray from '../../../../../Components/ButtonActionGray/ButtonActionGray';
import { HiOutlineFilter } from 'react-icons/hi';

function Index() {
    const [bundleList, setBundleList] = useState(null);
    const [modal, setModal] = useState(false);
        const [cookies, setCookies, removeCookie] = useCookies(['accessToken'])

    const { loading, setLoading } = useContext(LoadingContext);
    const { goToLoginPage } = useContext(LoginContext);
    const navigate = useNavigate();
    const [resetFlag, setResetFlag] = useState(false);
    const [filterBox, setFilterBox] = useState(false);
    const [filters, setFilters] = useState({
        bundleType: null,
        sku: null,
        bundleStatus: null,
        priceStatus: null,
         limit: 20,
        offset: null,
        sortBy: 3,
        orderBy: 1,
    })

    useEffect(() => {
        goToLoginPage(cookies.accessToken);
        if (resetFlag) {
            reqFilterBundle();
            setResetFlag(false);
        } else {
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
                    setBundleList(res.data)
                    setLoading(false)
                }
            )
            .catch(
                err => {
                    if (err.response.status === 500 || err.response.data.message === "Unauthorized") {
                      removeCookie('accessToken', {
                        expires: 'Thu, 01 Jan 1970 00:00:00 UTC',
                      })
                      navigate('/')
                    } else {
                      console.log(err)
          
                    }
                  }
            )
    }

    const resetFillters = () => {
        setFilters({
            bundleType: null,
            sku: null,
            bundleStatus: null,
            priceStatus: null,
             limit: 20,
            offset: null,
            sortBy: 3,
            orderBy: 1,
        })
        setResetFlag(true);
    }

    const showDetailBandle = (id) => {
        navigate(`${id}`)
    }

    const offsetTableHandler = (page) => {
        setFilters((prev) => ({ ...prev, 'offset': page }))
        setResetFlag(true)
    }

    const updateInputData = (e) => {
        setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const updateOptionData = (name, id) => {
        setFilters((prev) => ({ ...prev, [name]: id }))
    }

    const updateOptionDataForLimit = (name, id) => {
        setFilters((prev) => ({ ...prev, [name]: id, 'offset': 1 }))
        setResetFlag(true)
    }


    return (
        <div className='bundleList'>
            <div className='top'>
                <div className="filterBox">
                    <div className='filterBtn' onClick={() => setFilterBox(!filterBox)}>
                        <HiOutlineFilter className='icon' />
                        <div>Filter</div>
                    </div>

                    <div className={`filter row ${filterBox ? 'activeFilter' : ''}`}>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption readOnly={false} name={'bundleType'} title={'bundleType'} defaultValue={'bundleType'} value={filters.bundleType} type={'status'} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'Gem bundle' },
                                    { id: 1, status: 'Coin bundle' },
                                ]}
                            />
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <Input name={'sku'} type={'text'} title={'sku'} placeholder={'sku'} value={filters.sku} changeInputValue={updateInputData} />
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">

                            <SelectOption readOnly={false} name={'bundleStatus'} title={'bundleStatus'} defaultValue={'bundleStatus'} value={filters.bundleStatus} type={'status'} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'Active' },
                                    { id: 1, status: 'Deactive' },
                                ]}
                            />
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption readOnly={false} name={'priceStatus'} title={'priceStatus'} defaultValue={'priceStatus'} value={filters.priceStatus} type={'status'} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'Active' },
                                    { id: 1, status: 'Deactive' },
                                ]}
                            />
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption readOnly={false} name={'sortBy'} title={'sortBy'} defaultValue={'id'} type={'status'} changeOptinValue={updateOptionData}
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

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption readOnly={false} name={'orderBy'} defaultValue={'ASC'} title={'orderBy'} type={'status'} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'DESC' },
                                    { id: 1, status: 'ASC' },
                                ]}
                            />
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption readOnly={false} value={filters.limit} name={'limit'} title={'limit'} defaultValue={'20'} type={'status'} changeOptinValue={updateOptionDataForLimit}
                                data={[
                                    { id: 15, status: 15 },
                                    { id: 20, status: 20 },
                                    { id: 40, status: 40 },
                                    { id: 60, status: 60 },
                                    { id: 80, status: 80 },
                                    { id: 100, status: 100 },
                                ]}
                            />
                        </div>

                        <div className="filterResetBtn col-xl-12 col-lg-12 col-md-12 col-ms-12 col-xs-12">
                            <ButtonActionBlue title={'Filter'} classnameBtn={'filterBtnBox'} handler={reqFilterBundle} />
                            <ButtonActionGray title={'Reset Filter'} classnameBtn={'filterBtnBox'} handler={resetFillters} />
                        </div>
                    </div>
                </div>

                <div className='addBundleBtn' onClick={() => setModal(true)}>
                    <HiPlus className='icon' />
                    <div>Add Bundle</div>
                </div>

            </div>

            <Table data={bundleList?.data} sort={sortBundles} list={bundleList} offsetTable={offsetTableHandler} action={true} showDetail={showDetailBandle} />

            {modal === true ?

                <ModalAddProducts
                    modalTitle={'Add New bundle'}
                    data={bundleList}
                    type={'bundle'}
                    path={'bundles'}
                    hundelerSubmit={() => setModal(true)}
                    handlerClose={() => setModal(false)}
                />

                : ''
            }

        </div>
    );
}

export default Index;

