import React, { useContext, useEffect, useState } from 'react';
import Table from '../../../../layout/Table/Table';
import { adminTransaction } from '../../../../Data/Sort';
import { ScrollContainer } from 'react-indiana-drag-scroll';
import 'react-indiana-drag-scroll/dist/style.css';
import './List.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Input from '../../../../Components/Input/Input';
import SelectOption from '../../../../Components/SelectOption/SelectOption';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../Loading/LoadingContext';
import { LoginContext } from '../../../Login/LoginContext';
import { HiOutlineTrash } from 'react-icons/hi2';
import { API_URL } from '../../../../API_URL';
import Button from '../../../../Components/Button/Button';

const transaction = [
    {
        id: 3,
        status: 0,
        amount: 1000,
        maskedCardNumber: null,
        hashedCardNumber: null,
        shaparakRefNumber: null,
        createdAt: "2024-01-23T07:16:00.691Z",
        updatedAt: "2024-01-23T07:16:00.691Z",
        userName: "tofigh"
    }
]

function Index() {
    const [transaction, setTransaction] = useState(null);
    const { setLoading } = useContext(LoadingContext);
    const { goToLoginPage } = useContext(LoginContext);
    const navigate = useNavigate()
    const [cookies] = useCookies(['accessToken']);
    const [resetFlag, setResetFlag] = useState(false);
    const [filters, setFilters] = useState({
        statuses: null,
        gatewayTypes: null,
        limit: null,
        offset: null,
        sortBy: 3,
        orderBy: 1,
        userId: null
    })

    //admin-transaction/all?all?statuses%5B%5D=0&gatewayTypes%5B%5D=0&limit=0&offset=0&sortBy=0&orderBy=0&userId=0
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
        axios.get(`${API_URL === undefined ? '' : API_URL}/admin-transaction/all?${filters.statuses === null || filters.statuses === undefined ? '' : 'statuses[]=' + filters.statuses + '&'}${filters.gatewayTypes === null || filters.gatewayTypes === undefined ? '' : 'gatewayTypes[]=' + filters.gatewayTypes + '&'}${filters.limit === null || filters.limit === undefined ? '' : 'limit=' + filters.limit + '&'}${filters.offset === null || filters.offset === undefined ? '' : 'offset=' + filters.offset + '&'}${filters.sortBy === null || filters.sortBy === undefined ? '' : 'sortBy=' + filters.sortBy + '&'}${filters.userId === null || filters.userId === undefined ? '' : 'userId=' + filters.userId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(
                res => {
                    setTransaction(res.data.data);
                    setLoading(false)
                }
            )
            .catch(
                err => console.log(err)
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
            limit: null,
            offset: null,
            sortBy: 3,
            orderBy: 1,
        })
        setResetFlag(true);
    }
    const filterhandler = () => {
        reqFilterTransaction()
    }
    return (
        <div className='transactionList'>
            <div className='filter'>
                <div className="row">
                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-6">
                        <SelectOption readOnly={false} value={filters.statuses} name={'statuses'} defaultValue={'statuses'} type={'status'} changeOptinValue={updateOptionData}
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
                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-6">
                        <SelectOption readOnly={false} value={filters.gatewayTypes} name={'gatewayTypes'} defaultValue={'gatewayTypes'} type={'status'} changeOptinValue={updateOptionData}
                            data={[
                                { id: 0, status: 'Pasargad' },
                                { id: 1, status: 'Cafe Bazar' }
                            ]}
                        />
                    </div>

                    {/* <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-6">
                    <Input value={filters.limit} type={'text'} title={"limit"} placeholder={'limit'} changeInputValue={updateInputData} />
                </div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-6">
                    <Input value={filters.offset} type={'text'} title={"offset"} placeholder={'offset'} changeInputValue={updateInputData} />
                </div> */}

                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-6">
                        <SelectOption readOnly={false} value={filters.sortBy} name={'sortBy'} defaultValue={'id'} type={'status'} changeOptinValue={updateOptionData}
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
                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-6">
                        <SelectOption readOnly={false} value={filters.orderBy} name={'orderBy'} defaultValue={'ASC'} type={'status'} changeOptinValue={updateOptionData}
                            data={[
                                { id: 0, status: 'DESC' },
                                { id: 1, status: 'ASC' },
                            ]}
                        />
                    </div>

                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-6">
                        <Input value={filters.userId} type={'text'} title={"userId"} name={"userId"} placeholder={'userId'} changeInputValue={updateInputData} />
                    </div>

                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-6">
                        <Button title={'Filter'} className={'filterBtn'} classnameBtn={'filterBtnBox'} btnhandler={filterhandler} />
                    </div>
                </div>

                <div className="resetFillters" onClick={resetFillters}>
                    <HiOutlineTrash />
                </div>
            </div>


            <ScrollContainer>
                <Table data={transaction} sort={adminTransaction} action={true} showDetail={showDetailTransaction} />
            </ScrollContainer>
        </div>
    );
}

export default Index;
