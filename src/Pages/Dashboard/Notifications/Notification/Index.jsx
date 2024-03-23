import React, { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { LoginContext } from '../../../Login/LoginContext';
import { LoadingContext } from '../../../Loading/LoadingContext';
import Table from '../../../../layout/Table/Table';
import { sortNotification } from '../../../../Data/Sort';
import { API_URL } from '../../../../API_URL';
import axios from 'axios';
import Input from '../../../../Components/Input/Input';
import AddNotification from './AddNotification/Index'
import './Notification.scss';
import SelectOption from '../../../../Components/SelectOption/SelectOption';
import ButtonActionBlue from '../../../../Components/ButtonActionBlue/ButtonActionBlue';
import { HiOutlineFilter } from 'react-icons/hi';
import ButtonActionGray from '../../../../Components/ButtonActionGray/ButtonActionGray';

function Index() {
    const [notifictionList, setNotifictionList] = useState();
    const [cookies] = useCookies(['accessToken']);
    const { loading, setLoading } = useContext(LoadingContext);
    const { goToLoginPage } = useContext(LoginContext);
    const [resetFlag, setResetFlag] = useState(false);
    const [filterBox, setFilterBox] = useState(false);
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
        setFilterBox(false)
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
        setFilterBox(false)
    }

    const offsetTableHandler = (page) => {
        setFilters((prev) => ({ ...prev, 'offset': page }))
        setResetFlag(true)
    }

    const updateInputData = (e) => {
        setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const updateOptionData = (name, id) => {
        setFilters((prev) => ({ ...prev, [name]: id }))
    }
    const updateOptionDataForLimit = (name, id) => {
        setFilters((prev) => ({ ...prev, [name]: id, 'offset': 1 }))
    }

    return (
        <div className='notifList'>
            <div className='top'>
                <div className="filterBox">
                    <div className='filterBtn' onClick={() => setFilterBox(!filterBox)}>
                        <HiOutlineFilter className='icon' />
                        <div>Filter</div>
                    </div>

                    <div className={`filter row ${filterBox ? 'activeFilter' : ''}`}>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-ms-12 col-xs-12">
                            <Input name={'userId'} type={'text'} placeholder={'userId...'} title={'userId'} value={filters.userId} changeInputValue={updateInputData} />
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption readOnly={false} value={filters.limit} title={"limit"} name={'limit'} defaultValue={'20'} type={'status'} changeOptinValue={updateOptionDataForLimit}
                                data={[
                                    { id: 15, status: 15 },
                                    { id: 20, status: 20 },
                                     { id: 40, status: 40 },
                                    { id: 40, status: 40 },
                                    { id: 50, status: 50 },
                                    { id: 60, status: 60 },
                                ]}
                            />
                        </div>

                        <div className="filterResetBtn col-xl-12 col-lg-12 col-md-12 col-ms-12 col-xs-12">
                            <ButtonActionBlue title={'Filter'} classnameBtn={'filterBtnBox'} handler={reqNotifiction} />
                            <ButtonActionGray title={'Reset Filter'} classnameBtn={'filterBtnBox'} handler={resetFillters} />
                        </div>
                    </div>
                </div>

                <AddNotification />
            </div>

            <Table data={notifictionList?.data} sort={sortNotification} list={notifictionList} offsetTable={offsetTableHandler} action={true} showDetailStatus={false} />
        </div>
    )
}

export default Index