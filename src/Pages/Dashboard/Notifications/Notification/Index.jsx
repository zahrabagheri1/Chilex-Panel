import React, { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../../Login/LoginContext';
import { LoadingContext } from '../../../Loading/LoadingContext';
import Table from '../../../../layout/Table/Table';
import { sortNotification } from '../../../../Data/Sort';
import { API_URL } from '../../../../API_URL';
import axios from 'axios';
import Input from '../../../../Components/Input/Input';
import Button from '../../../../Components/Button/Button';
import { HiOutlineTrash, HiPlus } from 'react-icons/hi2';
import AddNotification from './AddNotification/Index'
import './Notification.scss';
import SelectOption from '../../../../Components/SelectOption/SelectOption';

function Index() {
    const [notifictionList, setNotifictionList] = useState();
    const [modal, setModal] = useState(false);
    const [cookies] = useCookies(['accessToken']);
    const { loading, setLoading } = useContext(LoadingContext);
    const { goToLoginPage } = useContext(LoginContext);
    const [resetFlag, setResetFlag] = useState(false);
    const [filters, setFilters] = useState({
        userId: null,
        limit: 15,
        page: 1
    })

    //fcm?userId=0&limit=20&page=1

    useEffect(() => {
        goToLoginPage(cookies.accessToken);
        if (resetFlag) {
            reqNotifiction();
            setResetFlag(false);
        } else {
            reqNotifiction()
        }
    }, [resetFlag])

    const reqNotifiction = () => {
        setLoading(true)
        axios.get(`${API_URL === undefined ? '' : API_URL}/fcm?${filters.userId === null || filters.userId === undefined ? '' : 'userId=' + filters.userId + '&'}${filters.limit === null || filters.limit === undefined ? '' : 'limit=' + filters.limit + '&'}${filters.page === null || filters.page === undefined ? '' : 'page=' + filters.page}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(
                res => {
                    setNotifictionList(res.data)
                    setLoading(false)
                }
            )
            .catch(
                err => console.log(err)
            )
    }

    const resetFillters = () => {
        setFilters({
            userId: null,
            limit: 15,
            page: 1
        })

        setResetFlag(true);
    }

    const offsetTableHandler = (page) => {
        setFilters((prev) => ({ ...prev, 'offset': page }))
        setResetFlag(true)
    }

    const updateInputData = (e) => {
        setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const updateOptionDataForLimit = (name, id) => {
        setFilters((prev) => ({ ...prev, [name]: id, 'offset': 1 }))
        setResetFlag(true)
    }

    return (
        <div className='notifList'>
            <div className='top'>
                <div className='filters'>
                    <Input name={'userId'} classname={'filerinput'} type={'text'} placeholder={'userId'} value={filters.userId} changeInputValue={updateInputData} />

                    <SelectOption classnameBox={'filerinput'} readOnly={false} value={filters.limit} name={'limit'} defaultValue={'15'} type={'status'} changeOptinValue={updateOptionDataForLimit}
                        data={[
                            { id: 15, status: 15 },
                            { id: 20, status: 20 },
                            { id: 30, status: 30 },
                            { id: 40, status: 40 },
                            { id: 50, status: 50 },
                            { id: 60, status: 60 },
                        ]}
                    />

                    <Button title={'Filter'} className={'filterBtn'} classnameBtn={'filterBtnBox'} btnhandler={() => reqNotifiction()} />

                    <div className="resetFillters" onClick={resetFillters}>
                        <HiOutlineTrash />
                    </div>
                </div>

                <div className='addnotif' onClick={() => setModal(true)}>
                    <HiPlus className='icon' />
                    <div className="">New Notif</div>
                </div>
            </div>

            <Table data={notifictionList?.data} sort={sortNotification} list={notifictionList} offsetTable={offsetTableHandler} action={true} showDetailStatus={false} />

            {modal === true ?
                <AddNotification canceladd={() => setModal(false)} />
                : ''
            }
        </div>
    )
}

export default Index