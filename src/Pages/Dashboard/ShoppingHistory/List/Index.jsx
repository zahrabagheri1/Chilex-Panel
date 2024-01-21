import React, { useContext, useEffect, useState } from 'react';
import { HiOutlineTrash, HiPlus } from "react-icons/hi2";
import Table from '../../../../layout/Table/Table';
import { sortHistory } from '../../../../Data/Sort';
import ScrollContainer from 'react-indiana-drag-scroll';
import './List.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Input from '../../../../Components/Input/Input';
import SelectOption from '../../../../Components/SelectOption/SelectOption';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../Loading/LoadingContext';
import { LoginContext } from '../../../Login/LoginContext';
import { API_URL } from '../../../../API_URL';

function Index() {
    const [history, setHistory] = useState(null);
    const { loading, setLoading } = useContext(LoadingContext)
    const [value, setValue] = useState();
    const navigate = useNavigate();
    const [cookies] = useCookies(['accessToken']);
    const { goToLoginPage } = useContext(LoginContext);
    const [filters, setFilters] = useState({
        userId: null,
        gatewayTypes: null,
        minAmount: null,
        type: null,
        referenceType: null,
        sortBy: 3,
        orderBy: 1,
        offset: null,
        limit: null,
    })

    // ${parameters.from === null ||  parameters.from === undefined? "" : "&RegisterDate.min=" + parameters.from}
    //shopping-history/all?userId=2&gatewayTypes%5B%5D=2&minAmount=2&maxAmount=2&type=2&referenceType=2&sortBy=2&orderBy=2&offset=2&limit=2

    useEffect(() => {
        goToLoginPage(cookies.accessToken);
        reqFilterShopHistory()
    }, [filters])

    const reqFilterShopHistory = () => {
        setLoading(!loading)
        axios.get(API_URL + `/shopping-history/all?${filters.userId === null || filters.userId === undefined ? '' : 'userId=' + filters.userId + '&'}${filters.gatewayTypes === null || filters.gatewayTypes === undefined ? '' : 'gatewayTypes[]=' + filters.gatewayTypes + '&'}${filters.minAmount === null || filters.minAmount === undefined ? '' : 'minAmount=' + filters.minAmount + '&'}${filters.maxAmount === null || filters.maxAmount === undefined ? '' : 'maxAmount=' + filters.maxAmount + '&'}${filters.type === null || filters.type === undefined ? '' : 'type=' + filters.type + '&'}${filters.referenceType === null || filters.referenceType === undefined ? '' : 'referenceType=' + filters.referenceType + '&'}${filters.sortBy === null || filters.sortBy === undefined ? '' : 'sortBy=' + filters.sortBy + '&'}${filters.orderBy === null || filters.orderBy === undefined ? '' : 'orderBy=' + filters.orderBy + '&'}${filters.offset === null || filters.offset === undefined ? '' : 'offset=' + filters.offset + '&'}${filters.limit === null || filters.limit === undefined ? '' : 'limit=' + filters.limit}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(
                res => {
                    setHistory(res.data.data)
                    setLoading(loading)
                }
            )
            .catch(
                err => console.log(err)
            )
    }



    const showDetailHistory = (id) => {
        console.log('hstory iddddd', id)
        navigate(`${id}`)
    }
    const updateInputData = (e) => {
        console.log(e.target.value)
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
            limit: null,
        })
    }

    return (
        <div className='shoppingHistoryList'>
                <div className='filter'>
                    <div className="row">
                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                            <Input value={filters.userId} name={'userId'} type={'text'} title={"userId"} placeholder={'userId'} changeInputValue={updateInputData} />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                            <SelectOption value={filters.gatewayTypes} name={'gatewayTypes'} defaultValue={'gatewayTypes'} type={'status'} readOnly={false} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'Pasargad' },
                                    { id: 1, status: 'cafe bazaar' },
                                    { id: 2, status: 'exchange' },
                                ]}
                            />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                            <Input value={filters.maxAmount} name={'maxAmount'} type={'text'} title={"maxAmount"} placeholder={'maxAmount'} changeInputValue={updateInputData} />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                            <SelectOption value={filters.orderBy} name={'orderBy'} defaultValue={'ASC'} type={'status'} readOnly={false} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'DESC' },
                                    { id: 1, status: 'ASC' },
                                ]}
                            />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                            <Input value={filters.minAmount} name={'minAmount'} type={'text'} title={"minAmount"} placeholder={'minAmount'} changeInputValue={updateInputData} />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                            <SelectOption value={filters.sortBy} name={'sortBy'} defaultValue={'id'} type={'status'} readOnly={false} changeOptinValue={updateOptionData}
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
                            <SelectOption value={filters.referenceType} name={'referenceType'} defaultValue={'referenceType'} type={'status'} readOnly={false} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'bundle' },
                                    { id: 1, status: 'item' },
                                    { id: 1, status: 'transaction' },
                                    { id: 1, status: 'setting' },
                                ]}
                            />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                            <SelectOption value={filters.type} name={'type'} defaultValue={'type'} type={'status'} readOnly={false} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'Gem' },
                                    { id: 1, status: 'Coin' },
                                    { id: 1, status: 'Item' },
                                ]}
                            />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                            <Input value={filters.limit} name={'limit'} type={'text'} title={"limit"} placeholder={'limit'} changeInputValue={updateInputData} />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                            <Input value={filters.offset} name={'offset'} type={'text'} title={"offset"} placeholder={'offset'} changeInputValue={updateInputData} />
                        </div>
                    </div>
                <div className="resetFillters" onClick={resetFillters}>
                    <HiOutlineTrash />
                </div>
                </div>
 

            <ScrollContainer>
                <Table data={history} sort={sortHistory} action={true} showDetail={showDetailHistory} />
            </ScrollContainer>

        </div>
    );

}

export default Index;
