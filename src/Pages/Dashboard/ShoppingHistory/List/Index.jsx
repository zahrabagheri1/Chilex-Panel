import React, { useContext, useEffect, useState } from 'react';
import { HiMiniArrowUpTray, HiOutlineTrash } from "react-icons/hi2";
import { HiOutlineFilter } from "react-icons/hi";
import Table from '../../../../layout/Table/Table';
import { sortHistory } from '../../../../Data/Sort';
import './List.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Input from '../../../../Components/Input/Input';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../Loading/LoadingContext';
import { LoginContext } from '../../../Login/LoginContext';
import { API_URL } from '../../../../API_URL';
import Button from '../../../../Components/Button/Button';
import SelectOption from '../../../../Components/SelectOption/SelectOption';
import ButtonActionBlue from '../../../../Components/ButtonActionBlue/ButtonActionBlue';
import ButtonActionGray from '../../../../Components/ButtonActionGray/ButtonActionGray';


function Index() {
    const [historyList, setHistoryList] = useState(null);
    const { setLoading } = useContext(LoadingContext)
    const navigate = useNavigate();
    const [cookies] = useCookies(['accessToken']);
    const { goToLoginPage } = useContext(LoginContext);
    const [resetFlag, setResetFlag] = useState(false);
    const [filterBox, setFilterBox] = useState(true);
    const [filters, setFilters] = useState({
        userId: null,
        gatewayTypes: null,
        minAmount: null,
        type: null,
        referenceType: null,
        sortBy: 4,
        orderBy: 1,
        offset: null,
        limit: 15,
        exportUserIds: false
    })

    useEffect(() => {
        goToLoginPage(cookies.accessToken);
        if (resetFlag) {
            reqFilterShopHistory()
            setResetFlag(false);
        } else {
            reqFilterShopHistory()
        }
    }, [resetFlag])


    const reqFilterShopHistory = () => {
        setLoading(true)
        axios.get(`${API_URL === undefined ? '' : API_URL}/shopping-history/all?${filters.userId === null || filters.userId === undefined ? '' : 'userId=' + filters.userId + '&'}${filters.gatewayTypes === null || filters.gatewayTypes === undefined ? '' : 'gatewayTypes[]=' + filters.gatewayTypes + '&'}${filters.minAmount === null || filters.minAmount === undefined ? '' : 'minAmount=' + filters.minAmount + '&'}${filters.maxAmount === null || filters.maxAmount === undefined ? '' : 'maxAmount=' + filters.maxAmount + '&'}${filters.type === null || filters.type === undefined ? '' : 'type=' + filters.type + '&'}${filters.referenceType === null || filters.referenceType === undefined ? '' : 'referenceType=' + filters.referenceType + '&'}${filters.sortBy === null || filters.sortBy === undefined ? '' : 'sortBy=' + filters.sortBy + '&'}${filters.orderBy === null || filters.orderBy === undefined ? '' : 'orderBy=' + filters.orderBy + '&'}${filters.offset === null || filters.offset === undefined ? '' : 'offset=' + filters.offset + '&'}${filters.limit === null || filters.limit === undefined ? '' : 'limit=' + filters.limit + '&'}${filters.exportUserIds === null || filters.exportUserIds === undefined ? '' : 'exportUserIds=' + filters.exportUserIds}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(
                res => {
                    setHistoryList(res.data)
                    setLoading(false)
                }
            )
            .catch(
                err => console.log(err)
            )
    }

    const showDetailHistory = (id) => {
        navigate(`${id}`)
    }
    const updateInputData = (e) => {
        setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const updateOptionData = (name, id) => {
        setFilters((prev) => ({ ...prev, [name]: id }))
    }

    const resetFillters = () => {
        setFilters({
            userId: null,
            gatewayTypes: null,
            minAmount: null,
            type: null,
            referenceType: null,
            sortBy: 3,
            orderBy: 1,
            offset: null,
            limit: 15,
        })
        setResetFlag(true);
    }

    const exportUsers = () => {
        setFilters((prev) => ({ ...prev, ["exportUserIds"]: true }))
        setResetFlag(true);
    }

    const offsetTableHandler = (page) => {
        setFilters((prev) => ({ ...prev, 'offset': page }))
        setResetFlag(true)
    }

    const updateOptionDataForLimit = (name, id) => {
        setFilters((prev) => ({ ...prev, [name]: id, 'offset': 1 }))
        setResetFlag(true)
    }


    return (
        <div className='shoppingHistoryList'>
            <div className="top">

                <div className="filterBox">
                    <div className='filterBtn' onClick={() => setFilterBox(!filterBox)}>
                        <HiOutlineFilter className='icon' />
                        <div>Filter</div>
                    </div>

                    <div className={`filter row ${filterBox ? 'activeFilter' : ''}`}>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <Input classname={'filerinput'} value={filters.userId} title={'userId'} name={'userId'} type={'text'} placeholder={'userId...'} changeInputValue={updateInputData} />
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption classnameBox={'filerinput'} title={"gatewayTypes"} value={filters.gatewayTypes} name={'gatewayTypes'} defaultValue={'gatewayTypes'} type={'status'} readOnly={false} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'Pasargad' },
                                    { id: 1, status: 'cafe bazaar' },
                                    { id: 2, status: 'exchange' },
                                ]}
                            />
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <Input classname={'filerinput'} value={filters.maxAmount} title={'maxAmount'} name={'maxAmount'} type={'text'} placeholder={'maxAmount...'} changeInputValue={updateInputData} />
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption classnameBox={'filerinput'} value={filters.orderBy} title={'orderBy'} name={'orderBy'} defaultValue={'ASC'} type={'status'} readOnly={false} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'DESC' },
                                    { id: 1, status: 'ASC' },
                                ]}
                            />
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <Input classname={'filerinput'} value={filters.minAmount} title={'minAmount'} name={'minAmount'} type={'text'} placeholder={'minAmount...'} changeInputValue={updateInputData} />
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption classnameBox={'filerinput'} value={filters.sortBy} title={'sortBy'} name={'sortBy'} defaultValue={'userId'} type={'status'} readOnly={false} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'createdAt' },
                                    { id: 1, status: 'referenceType' },
                                    { id: 2, status: 'amount' },
                                    { id: 3, status: 'referenceId' },
                                    { id: 4, status: 'userId' },
                                    { id: 5, status: 'name' },
                                ]}
                            />
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption classnameBox={'filerinput'} value={filters.referenceType} name={'referenceType'} defaultValue={'referenceType'} type={'status'} readOnly={false} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'bundle' },
                                    { id: 1, status: 'item' },
                                    { id: 1, status: 'transaction' },
                                    { id: 1, status: 'setting' }
                                ]}
                            />
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption classnameBox={'filerinput'} value={filters.type} name={'type'} defaultValue={'type'} type={'status'} readOnly={false} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'Gem' },
                                    { id: 1, status: 'Coin' },
                                    { id: 1, status: 'Item' },
                                ]}
                            />
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption classnameBox={'filerinput'} readOnly={false} value={filters.limit} name={'limit'} defaultValue={'15'} type={'status'} changeOptinValue={updateOptionDataForLimit}
                                data={[
                                    { id: 20, status: 20 },
                                    { id: 30, status: 30 },
                                    { id: 40, status: 40 },
                                    { id: 50, status: 50 },
                                    { id: 60, status: 60 },
                                ]}
                            />
                        </div>

                        <ButtonActionBlue title={'Filter'} classnameBtn={'filterBtnBox'} handler={reqFilterShopHistory} />
                        <Button title={'Reset Filter'} classnameBtn={'filterBtnBox'} btnhandler={resetFillters} />
                    </div>

                    {/* <div className='filters'>

                        <div className="resetFillters" onClick={resetFillters}>
                            <HiOutlineTrash />
                        </div>
                    </div> */}
                </div>

                <div className='exportBtn' onClick={exportUsers}>
                    <HiMiniArrowUpTray className='icon' />
                    <div>Export</div>
                </div>
            </div>

            <Table data={historyList?.data} list={historyList} offsetTable={offsetTableHandler} sort={sortHistory} action={true} showDetail={showDetailHistory} />

        </div>
    );

}

export default Index;
