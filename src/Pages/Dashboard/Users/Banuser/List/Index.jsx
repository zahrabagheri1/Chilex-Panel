import React, { useContext, useEffect, useState } from 'react';
import Table from '../../../../../layout/Table/Table';
import axios from 'axios';
import { sortBanUsers } from '../../../../../Data/Sort';
import { useNavigate } from 'react-router-dom';
import './List.scss'
import Input from '../../../../../Components/Input/Input';
import SelectOption from '../../../../../Components/SelectOption/SelectOption';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../../Loading/LoadingContext';
import { LoginContext } from '../../../../Login/LoginContext';
import { HiOutlineTrash } from 'react-icons/hi2';
import { API_URL } from '../../../../../API_URL';
import Button from '../../../../../Components/Button/Button';

function Index() {
    const [banuserList, setBanuserList] = useState(null)
    const [cookies] = useCookies(['accessToken']);
    const { loading, setLoading } = useContext(LoadingContext);
    const { goToLoginPage } = useContext(LoginContext);
    const [resetFlag, setResetFlag] = useState(false);
    const [filters, setFilters] = useState({
        limit: 20,
        offset: null,
        type: null,
        userId: null,
        sortBy: 3,
        orderBy: 1,
    })
    const navigate = useNavigate()
    const [value, setValue] = useState()

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
                    console.log(err)
                }
            )
    }

    const resetFillters = () => {
        setFilters({
            limit: 20,
            offset: null,
            type: null,
            userId: null,
            sortBy: 3,
            orderBy: 1,
        })
        setResetFlag(true);
    }

    const updateOptionData = (name, id) => {
        setFilters((prev) => ({ ...prev, [name]: id }))
    }

    const updateInputData = (e) => {
        setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const showDetailBanUser = (id) => {
        navigate(`${id}`)
    }

    const offsetTableHandler = (page) => {
        setFilters((prev) => ({ ...prev, 'offset': page }))
        setResetFlag(true)
    }

    return (
        <div className='banUserlist'>
            <div className="filtersBanUser">

                <Input classname={'filerinput'} value={value} type={'text'} placeholder={'type...'} changeInputValue={updateInputData} />

                <Input classname={'filerinput'} value={value} type={'text'} placeholder={'userId...'} changeInputValue={updateInputData} />

                <SelectOption classnameBox={'filerinput'} readOnly={false} value={value} name={'sortBy'} defaultValue={'sortBy id'} type={'status'} changeOptinValue={updateOptionData}
                    data={[
                        { id: 0, status: 'createdAt' },
                        { id: 1, status: 'updatedAt' },
                        { id: 2, status: 'id' },
                        { id: 3, status: 'type' },
                        { id: 4, status: 'userId' }
                    ]}
                />

                <SelectOption classnameBox={'filerinput'} readOnly={false} value={value} name={'orderBy'} defaultValue={'orderBy '} type={'status'} changeOptinValue={updateOptionData}
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

                <Button title={'Filters'} className={'filterBtn'} classnameBtn={'filterBtnBox'} btnhandler={() => listOfBanUsers()} />

                <div className="resetFillters" onClick={resetFillters}>
                    <HiOutlineTrash />
                </div>
            </div>

            <Table data={banuserList?.data} list={banuserList} offsetTable={offsetTableHandler} sort={sortBanUsers} action={true} showDetail={showDetailBanUser} />
        </div>
    );
}

export default Index;
