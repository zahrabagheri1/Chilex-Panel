import React, { useEffect, useState } from 'react';
import { HiPlus } from "react-icons/hi2";
import Table from '../../../../layout/Table/Table';
import { sortHistory } from '../../../../Data/Sort';
import ScrollContainer from 'react-indiana-drag-scroll';
import './List.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Input from '../../../../Components/Input/Input';
import SelectOption from '../../../../Components/SelectOption/SelectOption';

function Index() {
    const [history, setHistory] = useState(null);
    const [value, setValue] = useState();
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        userId: null,
        gatewayTypes: null,
        minAmount: null,
        type: null,
        referenceType: null,
        sortBy: null,
        orderBy: null,
        offset: null,
        limit: null,
    })

    // ${parameters.from === null ||  parameters.from === undefined? "" : "&RegisterDate.min=" + parameters.from}
    //shopping-history/all?userId=454&gatewayTypes%5B%5D=1&minAmount=1&maxAmount=1&type=1&referenceType=1&sortBy=1&orderBy=1&offset=1&limit=1

    useEffect(() => {
        reqFilterShopHistory()
    })

    const reqFilterShopHistory = () => {
        axios.get(`shopping-history/all?
        ${filters.userId === null || filters.userId === undefined ? '' : 'userId=' + filters.userId + '&'}
        ${filters.gatewayTypes === null || filters.gatewayTypes === undefined ? '' : 'gatewayTypes[]=' + filters.gatewayTypes + '&'}
        ${filters.minAmount === null || filters.minAmount === undefined ? '' : 'minAmount=' + filters.minAmount + '&'}
        ${filters.maxAmount === null || filters.maxAmount === undefined ? '' : 'maxAmount=' + filters.maxAmount + '&'}
        ${filters.type === null || filters.type === undefined ? '' : 'type=' + filters.type + '&'}
        ${filters.referenceType === null || filters.referenceType === undefined ? '' : 'referenceType=' + filters.referenceType + '&'}
        ${filters.sortBy === null || filters.sortBy === undefined ? '' : 'sortBy=' + filters.sortBy + '&'}
        ${filters.orderBy === null || filters.orderBy === undefined ? '' : 'orderBy=' + filters.orderBy + '&'}
        ${filters.offset === null || filters.offset === undefined ? '' : 'offset=' + filters.offset + '&'}
        ${filters.limit === null || filters.limit === undefined ? '' : 'limit=' + filters.limit + '&'}
        `)
            .then(
                res => console.log(res)
            )
            .catch(
                err => console.log(err)
            )
    }



    console.log(history)
    useEffect(() => {
        axios.get('/shopping-history/all')
            .then(
                res => {
                    setHistory(res.data.data)
                }
            )
            .catch(
                err => console.log(err)
            )
    }, [])

    const showDetailHistory = (id) => {
        navigate(`${id}`)
    }

    return (
        <div className='shoppingHistory'>

            <div className="top">
                <div className='filter'>
                    <SelectOption classname='control' value={value} name={'bundleType'} defaultValue={'bundleType'} type={'status'}
                        data={[
                            { id: 0, status: 'Gem bundle' },
                            { id: 1, status: 'Coin bundle' },
                        ]}
                    />

                    <Input classname='controlinput' value={value} type={'text'} title={"sku"} placeholder={'sku'} changeInputValue={''} />

                    <SelectOption classname='control' value={value} name={'bundleStatus'} defaultValue={'bundleStatus'} type={'status'}
                        data={[
                            { id: 0, status: 'Active' },
                            { id: 1, status: 'Deactive' },
                        ]}
                    />

                    <SelectOption classname='control' value={value} name={'priceStatus'} defaultValue={'priceStatus'} type={'status'}
                        data={[
                            { id: 0, status: 'Active' },
                            { id: 1, status: 'Deactive' },
                        ]}
                    />

                    <Input classname='controlinput' value={value} type={'text'} title={"limit"} placeholder={'limit'} changeInputValue={''} />

                    <Input classname='controlinput' value={value} type={'text'} title={"offset"} placeholder={'offset'} changeInputValue={''} />

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
                    <SelectOption classname='control' value={value} name={'orderBy'} defaultValue={'orderBy'} type={'status'}
                        data={[
                            { id: 0, status: 'DESC' },
                            { id: 1, status: 'ASC' },
                        ]}
                    />
                </div>

            </div>
            <ScrollContainer>
                <Table data={history} sort={sortHistory} action={true} showDetail={showDetailHistory} />
            </ScrollContainer>

        </div>
    );

}

export default Index;
