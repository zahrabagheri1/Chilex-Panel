import React, { useContext, useEffect, useState } from 'react';
import Table from '../../../../layout/Table/Table';
import { adminTransaction } from '../../../../Data/Sort';
import 'react-indiana-drag-scroll/dist/style.css';
import './List.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Input from '../../../../Components/Input/Input';
import SelectOption from '../../../../Components/SelectOption/SelectOption';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../Loading/LoadingContext';
import { LoginContext } from '../../../Login/LoginContext';
import { HiMiniArrowUpTray, HiOutlineTrash } from 'react-icons/hi2';
import { API_URL } from '../../../../API_URL';
import Button from '../../../../Components/Button/Button';
import ButtonActionBlue from '../../../../Components/ButtonActionBlue/ButtonActionBlue';
import ButtonActionGray from '../../../../Components/ButtonActionGray/ButtonActionGray';
import { HiOutlineFilter } from 'react-icons/hi';

function Index() {
    const navigate = useNavigate()
    const [transactionList, setTransactionList] = useState();
    const { setLoading } = useContext(LoadingContext);
    const { goToLoginPage } = useContext(LoginContext);
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
    const [resetFlag, setResetFlag] = useState(false);
    const [filterBox, setFilterBox] = useState(false);
    const [filters, setFilters] = useState({
        statuses: null,
        gatewayTypes: null,
        limit: 15,
        offset: null,
        orderBy: 3,
        orderBy: 1,
        userId: null,
        exportUserIds: false
    })

    //admin-transaction/all?all?statuses%5B%5D=0&gatewayTypes%5B%5D=0&limit=0&offset=0&orderBy=0&orderBy=0&userId=0
    useEffect(() => {
        goToLoginPage(cookies.accessToken);

        if (resetFlag) {
            reqFilterTransaction()
            setResetFlag(false);
        } else {
            reqFilterTransaction()
        }
    }, [resetFlag])

    const reqFilterTransaction = () => {
        setLoading(true)
        setFilterBox(false)
        axios.get(`${API_URL === undefined ? '' : API_URL}/admin-transaction/all?${filters.statuses === null || filters.statuses === undefined ? '' : 'statuses[]=' + filters.statuses + '&'}${filters.gatewayTypes === null || filters.gatewayTypes === undefined ? '' : 'gatewayTypes[]=' + filters.gatewayTypes + '&'}${filters.limit === null || filters.limit === undefined ? '' : 'limit=' + filters.limit + '&'}${filters.offset === null || filters.offset === undefined ? '' : 'offset=' + filters.offset + '&'}${filters.orderBy === null || filters.orderBy === undefined ? '' : 'orderBy=' + filters.orderBy + '&'}${filters.userId === null || filters.userId === undefined ? '' : 'userId=' + filters.userId + "&"}${filters.exportUserIds === null || filters.exportUserIds === undefined ? '' : 'exportUserIds=' + filters.exportUserIds}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(
                res => {
                    setTransactionList(res.data);
                    setLoading(false)
                }
            )
            .catch(
                err => {
                    if (err.response.data.statusCode === 401 && err.response.data.message === "Unauthorized") {
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

    const showDetailTransaction = (id) => {
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
            statuses: null,
            gatewayTypes: null,
            limit: 15,
            offset: null,
            orderBy: 3,
            orderBy: 1,
        })
        setResetFlag(true);
        setFilterBox(false)
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
        // setResetFlag(true)
    }

    return (
        <div className='transactionList'>
            <div className="top" >
                <div className="filterBox">
                    <div className='filterBtn' onClick={() => setFilterBox(!filterBox)}>
                        <HiOutlineFilter className='icon' />
                        <div>Filter</div>
                    </div>

                    <div className={`filter row ${filterBox ? 'activeFilter' : ''}`} >
                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <Input  
 value={filters.userId} title={'userId'} type={'text'} name={"userId..."} placeholder={'userId'} changeInputValue={updateInputData} />
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption   readOnly={false} value={filters.statuses} title={'statuses'} name={'statuses'} defaultValue={'statuses'} type={'status'} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'Pending ENDING' },
                                    { id: 1, status: 'True check result' },
                                    { id: 2, status: 'False check result' },
                                    { id: 3, status: 'Failed' },
                                    { id: 4, status: 'Successful' },
                                    { id: 5, status: 'Refunded' }
                                ]}
                            />
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption   readOnly={false} value={filters.gatewayTypes} title={'gatewayTypes'} name={'gatewayTypes'} defaultValue={'gatewayTypes'} type={'status'} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'Pasargad' },
                                    { id: 1, status: 'Cafe Bazar' }
                                ]}
                            />
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption   readOnly={false} value={filters.orderBy} title={'orderBy'} name={'orderBy'} defaultValue={'id'} type={'status'} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'createdAt' },
                                    { id: 1, status: 'updatedAt' },
                                    { id: 2, status: 'amount' },
                                    { id: 3, status: 'id' },
                                    { id: 4, status: 'userName' },
                                    { id: 5, status: 'status' }
                                ]}
                            />
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">

                            <SelectOption   readOnly={false} value={filters.orderBy} title={'sortBy'} name={'sortBy'} defaultValue={'ASC'} type={'status'} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'DESC' },
                                    { id: 1, status: 'ASC' },
                                ]}
                            />
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption   readOnly={false} value={filters.limit} title={'limit'} name={'limit'} defaultValue={'20'} type={'status'} changeOptinValue={updateOptionDataForLimit}
                                data={[
                                    { id: 15, status: 15 },
                                    { id: 20, status: 20 },
                                     { id: 40, status: 40 },
                                    { id: 40, status: 40 },
                                    { id: 50, status: 50 },
                                    { id: 60, status: 60 },
                                ]}
                            />
                        </div>

                        <div className="filterResetBtn col-xl-12 col-lg-12 col-md-12 col-ms-12 col-xs-12">
                            <ButtonActionBlue title={'Filter'} classnameBtn={'filterBtnBox'} handler={reqFilterTransaction} />
                            <ButtonActionGray title={'Reset Filter'} classnameBtn={'filterBtnBox'} handler={resetFillters} />
                        </div>
                    </div>
                </div>

                <div className='exportBtn' onClick={exportUsers}>
                    <HiMiniArrowUpTray className='icon' />
                    <div>Export</div>
                </div>
            </div>
            <Table data={transactionList?.data} list={transactionList} offsetTable={offsetTableHandler} sort={adminTransaction} action={true} showDetail={showDetailTransaction} />
        </div>
    );
}

export default Index;
