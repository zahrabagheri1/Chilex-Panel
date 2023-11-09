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


function Index() {
    const [transaction, setTransaction] = useState([]);
    const [value, setValue] = useState();
    const navigate = useNavigate()
    const [filters, setFilters] = useState({
        statuses: 3,
        gatewayTypes: null,
        limit: null,
        offset: null,
        sortBy: null,
        orderBy: null,
    })

    // ${parameters.from === null ||  parameters.from === undefined? "" : "&RegisterDate.min=" + parameters.from}
    //admin-transaction/all?statuses%5B%5D=0&gatewayTypes%5B%5D=string&limit=1&offset=1&sortBy=1&orderBy=1

    useEffect(() => {
        reqFilterTransaction()
    }, [])

    const reqFilterTransaction = () => {
        axios.get(`/admin-transaction/all?
        ${filters.statuses === null || filters.statuses === undefined ? '' : 'statuses[]=' + filters.statuses + '&'}
        ${filters.gatewayTypes === null || filters.gatewayTypes === undefined ? '' : 'gatewayTypes[]=' + filters.gatewayTypes + '&'}
        ${filters.limit === null || filters.limit === undefined ? '' : 'limit=' + filters.limit + '&'}
        ${filters.offset === null || filters.offset === undefined ? '' : 'offset=' + filters.offset + '&'}
        ${filters.sortBy === null || filters.sortBy === undefined ? '' : 'sortBy=' + filters.sortBy + '&'}
        ${filters.orderBy === null || filters.orderBy === undefined ? '' : 'orderBy=' + filters.orderBy + '&'}`)
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
        <div className='transaction'>
            <div className='filter row'>
                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <SelectOption classname='control' value={value} name={'bundleType'} defaultValue={'bundleType'} type={'status'}
                        data={[
                            { id: 0, status: 'Gem bundle' },
                            { id: 1, status: 'Coin bundle' },
                        ]}
                    />
                </div>
                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <Input classname='controlinput' value={value} type={'text'} title={"sku"} placeholder={'sku'} changeInputValue={''} />
                </div>
                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <SelectOption classname='control' value={value} name={'bundleStatus'} defaultValue={'bundleStatus'} type={'status'}
                        data={[
                            { id: 0, status: 'Active' },
                            { id: 1, status: 'Deactive' },
                        ]}
                    />
                </div>
                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <SelectOption classname='control' value={value} name={'priceStatus'} defaultValue={'priceStatus'} type={'status'}
                        data={[
                            { id: 0, status: 'Active' },
                            { id: 1, status: 'Deactive' },
                        ]}
                    />
                </div>

                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <Input classname='controlinput' value={value} type={'text'} title={"limit"} placeholder={'limit'} changeInputValue={''} />
                </div>
                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <Input classname='controlinput' value={value} type={'text'} title={"offset"} placeholder={'offset'} changeInputValue={''} />
                </div>
                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <SelectOption classname='control' value={value} name={'sortBy'} defaultValue={'createdAt'} type={'status'}
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
                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <SelectOption classname='control' value={value} name={'orderBy'} defaultValue={'orderBy'} type={'status'}
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
