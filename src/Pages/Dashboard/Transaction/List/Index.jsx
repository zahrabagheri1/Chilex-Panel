import React, { useEffect, useState } from 'react';
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


function Index() {
    const [transaction, setTransaction] = useState(null);
    const [value, setValue] = useState();
    const navigate = useNavigate()
    const [cookies] = useCookies(['accessToken']);
    const [filters, setFilters] = useState({
        statuses: 3,
        gatewayTypes: null,
        limit: null,
        offset: null,
        sortBy: null,
        orderBy: null,
    })

    // ${parameters.from === null ||  parameters.from === undefined? "" : "&RegisterDate.min=" + parameters.from}
    //admin-transaction/all?statuses%5B%5D=0&gatewayTypes%5B%5D=string&limit=0&offset=0&sortBy=0&orderBy=0

    useEffect(() => {
        reqFilterTransaction()
    }, [])

    const reqFilterTransaction = () => {
        axios.get(`/admin-transaction/all?${filters.statuses === null || filters.statuses === undefined ? '' : 'statuses[]=' + filters.statuses + '&'}${filters.gatewayTypes === null || filters.gatewayTypes === undefined ? '' : 'gatewayTypes[]=' + filters.gatewayTypes + '&'}${filters.limit === null || filters.limit === undefined ? '' : 'limit=' + filters.limit + '&'}${filters.offset === null || filters.offset === undefined ? '' : 'offset=' + filters.offset + '&'}${filters.sortBy === null || filters.sortBy === undefined ? '' : 'sortBy=' + filters.sortBy + '&'}${filters.orderBy === null || filters.orderBy === undefined ? '' : 'orderBy=' + filters.orderBy + '&'}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(
                res => console.log(res)
            )
            .catch(
                err => console.log(err)
            )
    }


    useEffect(() => {
        axios.get('/admin-transaction/all',
            {
                limit: parseInt(10),
                offset: parseInt(1)
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            }).then((res) => {
                setTransaction(res.data.data)
                //   console.log(res.data.data)

            }).catch(err => {
                console.log(err)
            })
    }, [])

    const showDetailTransaction = (id) => {
        navigate(`${id}`)
    }

    return (
        <div className='transactionList'>
            <div className='filter row'>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-6">
                    <SelectOption readOnly={false} value={value} name={'statuses'} defaultValue={'statuses'} type={'status'}
                        data={[
                            { id: 0, status: 'Pending ENDING' },
                            { id: 1, status: 'True check result' },
                            { id: 2, status: 'False check result' },
                            { id: 3, status: 'Failed' },
                            { id: 4, status: 'Successful' },
                            { id: 5, status: 'Refunded' },
                        ]}
                    />
                </div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-6">
                    <SelectOption readOnly={false} value={value} name={'gatewayTypes'} defaultValue={'gatewayTypes'} type={'status'}
                        data={[
                            { id: 0, status: 'Pasargad' },
                            { id: 1, status: 'Cafe Bazar' },
                        ]}
                    />
                </div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-6">
                    <Input value={value} type={'text'} title={"limit"} placeholder={'limit'} changeInputValue={''} />
                </div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-6">
                    <Input value={value} type={'text'} title={"offset"} placeholder={'offset'} changeInputValue={''} />
                </div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-6">
                    <SelectOption readOnly={false} value={value} name={'sortBy'} defaultValue={'createdAt'} type={'status'}
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
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-6">
                    <SelectOption readOnly={false} value={value} name={'orderBy'} defaultValue={'orderBy'} type={'status'}
                        data={[
                            { id: 0, status: 'DESC' },
                            { id: 1, status: 'ASC' },
                        ]}
                    />
                </div>
            </div>

            <ScrollContainer>
                <Table data={transaction} sort={adminTransaction} action={true} showDetail={showDetailTransaction} />
            </ScrollContainer>
        </div>
    );
}

export default Index;
