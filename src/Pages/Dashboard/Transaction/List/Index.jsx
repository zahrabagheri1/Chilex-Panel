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
        limit: 20,
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

        axios.get(`${API_URL === undefined ? '' : API_URL}/admin-transaction/all?${filters.statuses === null || filters.statuses === undefined ? '' : 'statuses[]=' + filters.statuses + '&'}${filters.gatewayTypes === null || filters.gatewayTypes === undefined ? '' : 'gatewayTypes[]=' + filters.gatewayTypes + '&'}${filters.limit === null || filters.limit === undefined ? '' : 'limit=' + filters.limit + '&'}${filters.offset === null || filters.offset === undefined ? '' : 'offset=' + filters.offset + '&'}${filters.orderBy === null || filters.orderBy === undefined ? '' : 'orderBy=' + filters.orderBy + '&'}${filters.userId === null || filters.userId === undefined ? '' : 'userId=' + filters.userId + "&"}${filters.exportUserIds === null || filters.exportUserIds === undefined ? '' : 'exportUserIds=' + filters.exportUserIds}`,
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
            limit: 20,
            offset: null,
            orderBy: 3,
            orderBy: 1,
        })
        setResetFlag(true);
    }
    const filterhandler = () => {
        reqFilterTransaction()
    }

    const exportUsers = () => {
        setFilters((prev) => ({ ...prev, ["exportUserIds"]: true }))
        setResetFlag(true);
    }

    return (
        <div className='transactionList'>
            <div className="top">
                <div className='filters'>
                    <Input classname={'filerinput'} value={filters.userId} type={'text'} name={"userId..."} placeholder={'userId'} changeInputValue={updateInputData} />
                    <SelectOption classnameBox={'filerinput'} readOnly={false} value={filters.statuses} name={'statuses'} defaultValue={'statuses'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'Pending ENDING' },
                            { id: 1, status: 'True check result' },
                            { id: 2, status: 'False check result' },
                            { id: 3, status: 'Failed' },
                            { id: 4, status: 'Successful' },
                            { id: 5, status: 'Refunded' }
                        ]}
                    />
                    <SelectOption classnameBox={'filerinput'} readOnly={false} value={filters.gatewayTypes} name={'gatewayTypes'} defaultValue={'gatewayTypes'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'Pasargad' },
                            { id: 1, status: 'Cafe Bazar' }
                        ]}
                    />

                    <SelectOption classnameBox={'filerinput'} readOnly={false} value={filters.orderBy} name={'orderBy'} defaultValue={'id'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'createdAt' },
                            { id: 1, status: 'updatedAt' },
                            { id: 2, status: 'amount' },
                            { id: 3, status: 'id' },
                            { id: 4, status: 'userName' },
                            { id: 5, status: 'status' }
                        ]}
                    />

                    <SelectOption classnameBox={'filerinput'} readOnly={false} value={filters.orderBy} name={'orderBy'} defaultValue={'ASC'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'DESC' },
                            { id: 1, status: 'ASC' },
                        ]}
                    />

                    <SelectOption classnameBox={'filerinput'} readOnly={false} value={filters.limit} name={'limit'} defaultValue={'20'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 30, status: 30 },
                            { id: 40, status: 40 },
                            { id: 50, status: 50 },
                            { id: 60, status: 60 },
                        ]}
                    />
                    <Button title={'Filter'} className={'filterBtn'} classnameBtn={'filterBtnBox'} btnhandler={filterhandler} />

                    <div className="resetFillters" onClick={resetFillters}>
                        <HiOutlineTrash />
                    </div>
                </div>

                <div className='addnotif' onClick={exportUsers}>
                    <HiMiniArrowUpTray className='icon' />
                    <div>Export</div>
                </div>
            </div>
            <Table data={transaction} sort={adminTransaction} action={true} showDetail={showDetailTransaction} />
        </div>
    );
}

export default Index;
