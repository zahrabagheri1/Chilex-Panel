import React, { useContext, useEffect, useState } from 'react';
import Table from '../../../../../layout/Table/Table';
import axios from 'axios';
import { sortReportUsers } from '../../../../../Data/Sort';
import { useNavigate } from 'react-router-dom';
import './Reports.scss';
import Input from '../../../../../Components/Input/Input';
import SelectOption from '../../../../../Components/SelectOption/SelectOption';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../../Loading/LoadingContext';
import { LoginContext } from '../../../../Login/LoginContext';
import { API_URL } from '../../../../../API_URL';
import { HiOutlineFilter } from 'react-icons/hi';
import ButtonActionBlue from '../../../../../Components/ButtonActionBlue/ButtonActionBlue';
import ButtonActionGray from '../../../../../Components/ButtonActionGray/ButtonActionGray';

function List() {
    const [reportuserList, setReportuserList] = useState(null)
    const [cookies] = useCookies(['accessToken'])
    const { loading, setLoading } = useContext(LoadingContext);
    const { goToLoginPage } = useContext(LoginContext);
    const [resetFlag, setResetFlag] = useState(false);
    const [filterBox, setFilterBox] = useState(false);
    const [filters, setFilters] = useState({
        limit: 15,
        offset: null,
        types: [],
        userId: null,
        sortBy: 2,
        orderBy: 1,
    })

    const navigate = useNavigate()
    const [value, setValue] = useState()

    useEffect(() => {
        goToLoginPage(cookies.accessToken);

        if (resetFlag) {
            listOfReportuser()
            setResetFlag(false);
        } else {
            listOfReportuser()
        }
    }, [resetFlag])

    //reports/all?limit=1&offset=1&types%5B%5D=1&userId=1&sortBy=1&orderBy=1
    const listOfReportuser = () => {
        setLoading(true)
        setFilterBox(false)
        axios.get(`${API_URL === undefined ? '' : API_URL}/reports/all?${filters.limit === undefined || filters.limit === null ? '' : 'limit=' + filters.limit + '&'}${filters.offset === undefined || filters.offset === null ? '' : 'offset=' + filters.offset + '&'}${filters.types === undefined || filters.types === null ? '' : 'types[]=' + filters.types + '&'}${filters.userId === undefined || filters.userId === null ? '' : 'userId=' + filters.userId + '&'}${filters.sortBy === undefined || filters.sortBy === null ? '' : 'sortBy=' + filters.sortBy + '&'}${filters.orderBy === undefined || filters.orderBy === null ? '' : 'orderBy=' + filters.orderBy}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(
                res => {
                    setReportuserList(res.data)
                    setLoading(false)
                }
            ).catch(
                err => {

                    console.log(err.response.status)

                }
            )
    }

    const updateOptionData = (name, id) => {
        name === 'types' ?
            setFilters((prev) => ({ ...prev, 'types': [id] }))
            :
            setFilters((prev) => ({ ...prev, [name]: id }))
    }

    const updateInputData = (e) => {
        setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const resetFillters = () => {
        setFilters({
            limit: 15,
            offset: null,
            types: [],
            userId: null,
            sortBy: 3,
            orderBy: 1,
        })

        setResetFlag(true);
        setFilterBox(false)
    }

    const offsetTableHandler = (page) => {
        setFilters((prev) => ({ ...prev, 'offset': page }))
        setResetFlag(true)
    }

    const updateOptionDataForLimit = (name, id) => {
        setFilters((prev) => ({ ...prev, [name]: id, 'offset': 1 }))
    }


    return (
        <div className='reportUserslist'>

            <div className="top">
                <div className="filterBox">
                    <div className='filterBtn' onClick={() => setFilterBox(!filterBox)}>
                        <HiOutlineFilter className='icon' />
                        <div>Filter</div>
                    </div>

                    <div className={`filter row ${filterBox ? 'activeFilter' : ''}`}>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <Input value={value} type={'text'} title={'userId'} placeholder={'userId...'} changeInputValue={updateInputData} />

                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption readOnly={false} value={value} name={'types'} title={'types'} defaultValue={'types'} type={'status'} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'PLAYER NAME OFFENSIVE' },
                                    { id: 1, status: 'INACTIVE' },
                                    { id: 2, status: 'CHEATING' },
                                    { id: 3, status: 'VOICE CHAT OFFENSIVE' }
                                ]}
                            />
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption readOnly={false} value={value} name={'sortBy'} title={'sortBy'} defaultValue={'id'} type={'status'} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'createdAt' },
                                    { id: 1, status: 'updatedAt' },
                                    { id: 2, status: 'id' },
                                    { id: 3, status: 'reportedId' },
                                    { id: 4, status: 'reporterId' }
                                ]}
                            />
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption readOnly={false} value={value} name={'orderBy'} title={'orderBy'} defaultValue={'ASC'} type={'status'} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'DESC' },
                                    { id: 1, status: 'ASC' },
                                ]}
                            />
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption readOnly={false} value={filters.limit} name={'limit'} title={'limit'} defaultValue={'15'} type={'status'} changeOptinValue={updateOptionDataForLimit}
                                data={[
                                    { id: 15, status: 15 },
                                    { id: 20, status: 20 },
                                    { id: 30, status: 30 },
                                    { id: 40, status: 40 },
                                    { id: 50, status: 50 },
                                    { id: 60, status: 60 },
                                ]}
                            />
                        </div>
                        <div className="filterResetBtn col-xl-12 col-lg-12 col-md-12 col-ms-12 col-xs-12">
                            <ButtonActionBlue title={'Filter'} classnameBtn={'filterBtnBox'} handler={listOfReportuser} />
                            <ButtonActionGray title={'Reset Filter'} classnameBtn={'filterBtnBox'} handler={resetFillters} />
                        </div>
                    </div>
                </div>
            </div>

            <Table data={reportuserList?.data} list={reportuserList} offsetTable={offsetTableHandler} sort={sortReportUsers} action={true} showDetailStatus={false} />
        </div>
    );
}

export default List;
