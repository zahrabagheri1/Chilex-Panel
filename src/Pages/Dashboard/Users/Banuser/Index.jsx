import React, { useContext, useEffect, useState } from 'react';
import Table from '../../../../layout/Table/Table';
import axios from 'axios';
import { sortBanUsers } from '../../../../Data/Sort';
import { useNavigate } from 'react-router-dom';
import './List.scss'
import Input from '../../../../Components/Input/Input';
import SelectOption from '../../../../Components/SelectOption/SelectOption';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../Loading/LoadingContext';
import { LoginContext } from '../../../Login/LoginContext';
import { RiUserForbidFill, RiUserHeartFill } from "react-icons/ri";
import { API_URL } from '../../../../API_URL';
import ButtonActionBlue from '../../../../Components/ButtonActionBlue/ButtonActionBlue';
import ButtonActionGray from '../../../../Components/ButtonActionGray/ButtonActionGray';
import { HiOutlineFilter } from 'react-icons/hi';

function Index() {
    const [banuserList, setBanuserList] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
    const { loading, setLoading } = useContext(LoadingContext);
    const { goToLoginPage } = useContext(LoginContext);
    const [resetFlag, setResetFlag] = useState(false);
    const [filterBox, setFilterBox] = useState(false);
    const [unbanuserBox, setUnbanuserBox] = useState(false);
    const navigate = useNavigate()
    const [filters, setFilters] = useState({
        limit: 15,
        offset: null,
        type: null,
        userId: null,
        sortBy: 3,
        orderBy: 1,
    })

    useEffect(() => {
        goToLoginPage(cookies.accessToken);
        if (resetFlag) {
            listOfBanUsers()
            setResetFlag(false)
        } else {
            listOfBanUsers()
        }
    }, [resetFlag])


    //admin-ban/get-all?limit=1&offset=1&type=1&userId=1&sortBy=0&orderBy=0
    const listOfBanUsers = () => {
        setLoading(true)
        setFilterBox(false)
        axios.get(`${API_URL === undefined ? '' : API_URL}/admin-ban/get-all?${filters.limit === undefined || filters.limit === null ? '' : 'limit=' + filters.limit + '&'}${filters.offset === undefined || filters.offset === null ? '' : 'offset=' + filters.offset + '&'}${filters.type === undefined || filters.type === null ? '' : 'type=' + filters.type + '&'}${filters.userId === undefined || filters.userId === null ? '' : 'userId=' + filters.userId + '&'}${filters.sortBy === undefined || filters.sortBy === null ? '' : 'sortBy=' + filters.sortBy + '&'}${filters.orderBy === undefined || filters.orderBy === null ? '' : 'orderBy=' + filters.orderBy}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(
                res => {
                    setBanuserList(res.data)
                    setLoading(false)
                }
            ).catch(
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

    const resetFillters = () => {
        setFilters({
            limit: 15,
            offset: null,
            type: null,
            userId: null,
            sortBy: 3,
            orderBy: 1,
        })
        setResetFlag(true);
        setFilterBox(false)
    }

    const updateOptionData = (name, id) => {
        setFilters((prev) => ({ ...prev, [name]: id }))
    }

    const updateInputData = (e) => {
        setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const offsetTableHandler = (page) => {
        setFilters((prev) => ({ ...prev, 'offset': page }))
        setResetFlag(true)
    }

    const updateOptionDataForLimit = (name, id) => {
        setFilters((prev) => ({ ...prev, [name]: id, 'offset': 1 }))
    }

    return (
        <div className='banUserlist'>
            <div className="top">
                <div className="filterBox">
                    <div className='filterBtn' onClick={() => setFilterBox(!filterBox)}>
                        <HiOutlineFilter className='icon' />
                        <div>Filter</div>
                    </div>

                    <div className={`filter row ${filterBox ? 'activeFilter' : ''}`}>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <Input value={filters.userId} type={'text'} title={'userId'} placeholder={'userId...'} changeInputValue={updateInputData} />
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption value={filters.type} title={'type'} name={'type'} defaultValue={'type'} type={'status'} readOnly={false} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'everything' },
                                    { id: 1, status: 'chating' },
                                    { id: 2, status: 'chat with support' }
                                ]}
                            />
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption value={filters.sortBy} title={'sortBy'} name={'sortBy'} defaultValue={'id'} type={'status'} readOnly={false} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'createdAt' },
                                    { id: 1, status: 'updatedAt' },
                                    { id: 2, status: 'id' },
                                    { id: 3, status: 'type' },
                                    { id: 4, status: 'userId' }
                                ]}
                            />
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption value={filters.orderBy} title={'orderBy'} name={'orderBy'} defaultValue={'ASC'} type={'status'} readOnly={false} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'DESC' },
                                    { id: 1, status: 'ASC' },
                                ]}
                            />
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption readOnly={false} value={filters.limit} title={'limit'} name={'limit'} defaultValue={'15'} type={'status'} changeOptinValue={updateOptionDataForLimit}
                                data={[
                                    { id: 20, status: 20 },
                                    { id: 30, status: 30 },
                                    { id: 40, status: 40 },
                                    { id: 50, status: 50 },
                                    { id: 60, status: 60 },
                                ]}
                            />
                        </div>

                        <div className="filterResetBtn col-xl-12 col-lg-12 col-md-12 col-ms-12 col-xs-12">
                            <ButtonActionBlue title={'Filter'} classnameBtn={'filterBtnBox'} handler={listOfBanUsers} />
                            <ButtonActionGray title={'Reset Filter'} classnameBtn={'filterBtnBox'} handler={resetFillters} />
                        </div>
                    </div>
                </div>

                <div className="unbanuserBox">
                    <div className='unbanuserBtn' onClick={() => setUnbanuserBox(!unbanuserBox)}>
                        <RiUserHeartFill className='icon' />
                        <div>Unban user</div>
                    </div>

                    <div className={`unbanuser row ${unbanuserBox ? 'activeunbanuser' : ''}`}>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <Input value={filters.userId} type={'text'} title={'userId'} placeholder={'userId...'} changeInputValue={updateInputData} />
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption value={filters.orderBy} title={'orderBy'} name={'orderBy'} defaultValue={'ASC'} type={'status'} readOnly={false} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'DESC' },
                                    { id: 1, status: 'ASC' },
                                ]}
                            />
                        </div>
                    </div>

                </div>
            </div>

            <Table data={banuserList?.data} list={banuserList} offsetTable={offsetTableHandler} sort={sortBanUsers} action={true} showDetailStatus={false} />
        </div>
    );
}

export default Index;
