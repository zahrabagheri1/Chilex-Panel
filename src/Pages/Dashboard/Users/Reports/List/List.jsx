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
import { HiOutlineTrash } from 'react-icons/hi2';
import { API_URL } from '../../../../../API_URL';
import Button from '../../../../../Components/Button/Button';

function List() {
    const [reportuserList, setReportuserList] = useState(null)
    const [cookies] = useCookies(['accessToken'])
    const { loading, setLoading } = useContext(LoadingContext);
    const { goToLoginPage } = useContext(LoginContext);
    const [resetFlag, setResetFlag] = useState(false);
    const [filter, setFilter] = useState({
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
        axios.get(`${API_URL === undefined ? '' : API_URL}/reports/all?${filter.limit === undefined || filter.limit === null ? '' : 'limit=' + filter.limit + '&'}${filter.offset === undefined || filter.offset === null ? '' : 'offset=' + filter.offset + '&'}${filter.types === undefined || filter.types === null ? '' : 'types[]=' + filter.types + '&'}${filter.userId === undefined || filter.userId === null ? '' : 'userId=' + filter.userId + '&'}${filter.sortBy === undefined || filter.sortBy === null ? '' : 'sortBy=' + filter.sortBy + '&'}${filter.orderBy === undefined || filter.orderBy === null ? '' : 'orderBy=' + filter.orderBy}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(
                res => {
                    setReportuserList(res.data.data)
                    setLoading(false)
                }
            ).catch(
                err => {

                    console.log(err.response.status)

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
    const resetFillters = () => {
        setFilter({
            limit: 15,
            offset: null,
            types: [],
            userId: null,
            sortBy: 3,
            orderBy: 1,
        })

        setResetFlag(true);
    }


    const filterhandler = () => {
        listOfReportuser()
    }

    return (
        <div className='reportUserslist'>
            <div className="filterReportUser">
                <Input classname={'filerinput'} value={value} type={'text'} placeholder={'userId...'} changeInputValue={updateInputData} />

                <SelectOption classnameBox={'filerinput'} readOnly={false} value={value} name={'types'} defaultValue={'types'} type={'status'} changeOptinValue={updateOptionData}
                    data={[
                        { id: 0, status: 'PLAYER NAME OFFENSIVE' },
                        { id: 1, status: 'INACTIVE' },
                        { id: 2, status: 'CHEATING' },
                        { id: 3, status: 'VOICE CHAT OFFENSIVE' }
                    ]}
                />

                <SelectOption classnameBox={'filerinput'} readOnly={false} value={value} name={'sortBy'} defaultValue={'id'} type={'status'} changeOptinValue={updateOptionData}
                    data={[
                        { id: 0, status: 'createdAt' },
                        { id: 1, status: 'updatedAt' },
                        { id: 2, status: 'id' },
                        { id: 3, status: 'reportedId' },
                        { id: 4, status: 'reporterId' }
                    ]}
                />

                <SelectOption classnameBox={'filerinput'} readOnly={false} value={value} name={'orderBy'} defaultValue={'ASC'} type={'status'} changeOptinValue={updateOptionData}
                    data={[
                        { id: 0, status: 'DESC' },
                        { id: 1, status: 'ASC' },
                    ]}
                />

                <Button title={'Filter'} className={'filterBtn'} classnameBtn={'filterBtnBox'} btnhandler={filterhandler} />

                <div className="resetFillters" onClick={resetFillters}>
                    <HiOutlineTrash />
                </div>
            </div>

            <Table data={reportuserList} sort={sortReportUsers} action={true} showDetail={showDetailBanUser} />
        </div>
    );
}

export default List;
