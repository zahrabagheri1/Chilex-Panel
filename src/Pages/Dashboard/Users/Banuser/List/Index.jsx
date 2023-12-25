import React, { useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import Table from '../../../../../layout/Table/Table';
import axios from 'axios';
import { sortBanUsers } from '../../../../../Data/Sort';
import { useNavigate } from 'react-router-dom';
import './List.scss'
import Input from '../../../../../Components/Input/Input';
import SelectOption from '../../../../../Components/SelectOption/SelectOption';

function Index() {
    const [banuserList, setBanuserList] = useState(null)
    const [filter, setFilter] = useState({
        limit: null,
        offset: null,
        type: null,
        userId: null,
        sortBy: null,
        orderBy: null,
    })
    const navigate = useNavigate()
    const [value, setValue] = useState()

    useEffect(() => {
        listOfBanUsers()
    }, [filter])

    //admin-ban/get-all?limit=1&offset=1&type=1&userId=1&sortBy=0&orderBy=0
    const listOfBanUsers = () => {
        axios.get(`/admin-ban/get-all?${filter.limit === undefined || filter.limit === null ? '' : 'limit=' + filter.limit + '&'}${filter.offset === undefined || filter.offset === null ? '' : 'offset=' + filter.offset + '&'}${filter.type === undefined || filter.type === null ? '' : 'type=' + filter.type + '&'}${filter.userId === undefined || filter.userId === null ? '' : 'userId=' + filter.userId + '&'}${filter.sortBy === undefined || filter.sortBy === null ? '' : 'sortBy=' + filter.sortBy + '&'}${filter.orderBy === undefined || filter.orderBy === null ? '' : 'orderBy=' + filter.orderBy}`).then(
            res => {
                setBanuserList(res.data.data)
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    }

    const updateOptionData = (name, id) => {
        setFilter((prev) => ({ ...prev, [name]: id }))
    }

    const updateInputData = (e) => {
        setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const showDetailBanUser = (id) => {
        navigate(`${id}`)
    }

    return (
        <div className='banUdserlist'>
            <div className="filterBanUser row">
                <div className="col-xl-1 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <Input value={value} type={'text'} title={"type"} placeholder={'type'} changeInputValue={updateInputData} />
                </div>

                <div className="col-xl-1 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <Input value={value} type={'text'} title={"userId"} placeholder={'userId'} changeInputValue={updateInputData} />
                </div>

                <div className="col-xl-1 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <SelectOption readOnly={false} value={value} name={'sortBy'} defaultValue={'createdAt'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'createdAt' },
                            { id: 1, status: 'updatedAt' },
                            { id: 2, status: 'id' },
                            { id: 3, status: 'type' },
                            { id: 4, status: 'userId' }
                        ]}
                    />
                </div>

                <div className="col-xl-1 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <SelectOption readOnly={false} value={value} name={'orderBy'} defaultValue={'orderBy'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'DESC' },
                            { id: 1, status: 'ASC' },
                        ]}
                    />
                </div>
            </div>

            <ScrollContainer>
                <Table data={banuserList} sort={sortBanUsers} action={true} showDetail={showDetailBanUser} />
            </ScrollContainer>
        </div>
    );
}

export default Index;
