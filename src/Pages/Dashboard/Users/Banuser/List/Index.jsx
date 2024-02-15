import React, { useContext, useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
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
    const [filter, setFilter] = useState({
        limit: null,
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
        }else{
           listOfBanUsers()
        }
    }, [resetFlag])


    //admin-ban/get-all?limit=1&offset=1&type=1&userId=1&sortBy=0&orderBy=0
    const listOfBanUsers = () => {
        setLoading(true)
        axios.get(`${API_URL === undefined ? '' : API_URL}/admin-ban/get-all?${filter.limit === undefined || filter.limit === null ? '' : 'limit=' + filter.limit + '&'}${filter.offset === undefined || filter.offset === null ? '' : 'offset=' + filter.offset + '&'}${filter.type === undefined || filter.type === null ? '' : 'type=' + filter.type + '&'}${filter.userId === undefined || filter.userId === null ? '' : 'userId=' + filter.userId + '&'}${filter.sortBy === undefined || filter.sortBy === null ? '' : 'sortBy=' + filter.sortBy + '&'}${filter.orderBy === undefined || filter.orderBy === null ? '' : 'orderBy=' + filter.orderBy}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(
                res => {
                    setBanuserList(res.data.data)
                    setLoading(false)
                }
            ).catch(
                err => {
                    console.log(err)
                }
            )
    }

    const resetFillters = () => {
        setFilter({
            limit: null,
            offset: null,
            type: null,
            userId: null,
            sortBy: 3,
            orderBy: 1,
        })
        setResetFlag(true);
    }

    const filterhandler = () => {
       listOfBanUsers()
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
        <div className='banUserlist'>
            <div className="filterBanUser">
                <div className="row">
                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                        <Input value={value} type={'text'} title={"type"} placeholder={'type'} changeInputValue={updateInputData} />
                    </div>

                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                        <Input value={value} type={'text'} title={"userId"} placeholder={'userId'} changeInputValue={updateInputData} />
                    </div>

                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                        <SelectOption readOnly={false} value={value} name={'sortBy'} defaultValue={'id'} type={'status'} changeOptinValue={updateOptionData}
                            data={[
                                { id: 0, status: 'createdAt' },
                                { id: 1, status: 'updatedAt' },
                                { id: 2, status: 'id' },
                                { id: 3, status: 'type' },
                                { id: 4, status: 'userId' }
                            ]}
                        />
                    </div>

                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                        <SelectOption readOnly={false} value={value} name={'orderBy'} defaultValue={'id'} type={'status'} changeOptinValue={updateOptionData}
                            data={[
                                { id: 0, status: 'DESC' },
                                { id: 1, status: 'ASC' },
                            ]}
                        />
                    </div>

                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                            <Button title={'Filter'} className={'filterBtn'} classnameBtn={'filterBtnBox'} btnhandler={filterhandler} />
                        </div>
                </div>

                <div className="resetFillters" onClick={resetFillters}>
                    <HiOutlineTrash />
                </div>
            </div>

            <ScrollContainer>
                <Table data={banuserList} sort={sortBanUsers} action={true} showDetail={showDetailBanUser} />
            </ScrollContainer>
        </div>
    );
}

export default Index;
