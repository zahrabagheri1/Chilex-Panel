import React, { useContext, useEffect, useRef, useState } from 'react';
import './List.scss';
import Table from '../../../../../layout/Table/Table';
import { sortBundles } from '../../../../../Data/Sort';
import { HiOutlineTrash, HiPlus } from "react-icons/hi2";
import axios from 'axios';
import ModalAddProducts from '../../../../../layout/ModalAddProducts/ModalAddProducts';
import { useNavigate } from 'react-router-dom';
import Input from '../../../../../Components/Input/Input';
import SelectOption from '../../../../../Components/SelectOption/SelectOption';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../../Loading/LoadingContext';
import { LoginContext } from '../../../../Login/LoginContext';
import { API_URL } from '../../../../../API_URL';
import Button from '../../../../../Components/Button/Button';

function Index() {
    const [bundleList, setBundleList] = useState(null);
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
        limit: 15,
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
                err => console.log(err)
            )
    }

    const resetFillters = () => {
        setFilters({
            bundleType: null,
            sku: null,
            bundleStatus: null,
            priceStatus: null,
            limit: 15,
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
                <div className='filters'>
                    <SelectOption classnameBox={'filerinput'} readOnly={false} name={'bundleType'} defaultValue={'bundleType'} value={filters.bundleType} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'Gem bundle' },
                            { id: 1, status: 'Coin bundle' },
                        ]}
                    />


                    <Input classname={'filerinput'} name={'sku'} type={'text'} placeholder={'sku'} value={filters.sku} changeInputValue={updateInputData} />

                    <SelectOption classnameBox={'filerinput'} readOnly={false} name={'bundleStatus'} defaultValue={'bundleStatus'} value={filters.bundleStatus} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'Active' },
                            { id: 1, status: 'Deactive' },
                        ]}
                    />

                    <SelectOption classnameBox={'filerinput'} readOnly={false} name={'priceStatus'} defaultValue={'priceStatus'} value={filters.priceStatus} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'Active' },
                            { id: 1, status: 'Deactive' },
                        ]}
                    />

                    <SelectOption classnameBox={'filerinput'} readOnly={false} name={'sortBy'} defaultValue={'id'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'createdAt' },
                            { id: 1, status: 'updatedAt' },
                            { id: 2, status: 'amount' },
                            { id: 3, status: 'id' },
                            { id: 4, status: 'name' },
                            { id: 5, status: 'status' },
                        ]}
                    />

                    <SelectOption classnameBox={'filerinput'} readOnly={false} name={'orderBy'} defaultValue={'ASC'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'DESC' },
                            { id: 1, status: 'ASC' },
                        ]}
                    />

                    <SelectOption classnameBox={'filerinput'} readOnly={false} value={filters.limit} name={'limit'} defaultValue={'15'} type={'status'} changeOptinValue={updateOptionDataForLimit}
                        data={[
                            { id: 15, status: 15 },
                            { id: 20, status: 20 },
                            { id: 30, status: 30 },
                            { id: 40, status: 40 },
                            { id: 50, status: 50 },
                            { id: 60, status: 60 },
                        ]}
                    />

                    <Button title={'Filter'} className={'filterBtn'} classnameBtn={'filterBtnBox'} btnhandler={() => reqFilterBundle()} />

                    <div className="resetFillters" onClick={resetFillters}>
                        <HiOutlineTrash />
                    </div>
                </div>

                <div className='addBundle' onClick={() => setModal(true)}>
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

