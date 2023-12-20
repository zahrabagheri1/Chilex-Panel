import React, { useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import Table from '../../../../../layout/Table/Table';
import axios from 'axios';
import { sortBanUsers } from '../../../../../Data/Sort';
import { useNavigate } from 'react-router-dom';
import './Reports.scss';
import Input from '../../../../../Components/Input/Input';
import SelectOption from '../../../../../Components/SelectOption/SelectOption';

function List() {
    const [reportuserList, setReportuserList] = useState(null)
    const [filter, setFilter] = useState({
        limit: null,
        offset: null,
        types: null,
        userId: null,
        sortBy: null,
        orderBy: null,
    })

    const navigate = useNavigate()
    const [value, setValue] = useState()

    useEffect(() => {
        listOfReportuser()
    }, [filter])

    //reports/all?limit=1&offset=1&types%5B%5D=1&userId=1&sortBy=1&orderBy=1
    const listOfReportuser = () => {
        axios.get(`/reports/all?${filter.limit === undefined || filter.limit === null ? '' : 'limit=' + filter.limit + '&'}${filter.offset === undefined || filter.offset === null ? '' : 'offset=' + filter.offset + '&'}${filter.types === undefined || filter.types === null ? '' : 'types[]=' + filter.types + '&'}${filter.userId === undefined || filter.userId === null ? '' : 'userId=' + filter.userId + '&'}${filter.sortBy === undefined || filter.sortBy === null ? '' : 'sortBy=' + filter.sortBy + '&'}${filter.orderBy === undefined || filter.orderBy === null ? '' : 'orderBy=' + filter.orderBy}`).then(
            res => {
                setReportuserList(res.data.data)
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
        <div className='reportUserslist'>
            <div className="filterReportUser row">
                <div className="col-xl-1 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                    <Input value={value} type={'text'} title={"types"} placeholder={'types'} changeInputValue={updateInputData} />
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
                <Table data={reportuserList} sort={sortBanUsers} action={true} showDetail={showDetailBanUser} />
            </ScrollContainer>
        </div>
    );
}

export default List;
