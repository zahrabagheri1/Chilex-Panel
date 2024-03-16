import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Table from '../../../../layout/Table/Table';
import { sortGamePlayed } from '../../../../Data/Sort';
import './Played.scss';
import Button from '../../../../Components/Button/Button';
import SelectOption from '../../../../Components/SelectOption/SelectOption';
import DatePikerFarsi from '../../../../Components/DatePikerFarsi/DatePikerFarsi';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../Loading/LoadingContext';
import { LoginContext } from '../../../Login/LoginContext';
import { HiOutlineTrash } from 'react-icons/hi2';
import { API_URL } from '../../../../API_URL';
import moment from 'moment-jalaali';

function Played() {
    const dateNow = Date.now()
    const [playedList, setPlayedList] = useState()
    const [cookies] = useCookies(['accessToken']);
    const [resetFlag, setResetFlag] = useState(false);
    const { loading, setLoading } = useContext(LoadingContext);
    const { goToLoginPage } = useContext(LoginContext);
    const [filters, setFilters] = useState({
        startDate: moment(dateNow).subtract(1, 'months').format('jYYYY-jM-jD'),
        endDate: moment(dateNow).format('jYYYY-jM-jD'),
        limit: 15,
        offset: 1,
        orderBy: 1
    })

    const { id } = useParams()

    useEffect(() => {
        goToLoginPage(cookies.accessToken);
        if (resetFlag) {
            getPlayed()
            setResetFlag(false);
        } else {
            getPlayed()
        }

    }, [resetFlag])

    //dixo.diacostudios.com/games/played/uno?startDate=2023-05-12&endDate=2023-10-12&limit=10&offset=2&orderBy=1
    const getPlayed = () => {
        setLoading(true)
        axios.get(`${API_URL === undefined ? '' : API_URL}/games/played/${id}?${filters.startDate === null || filters.startDate === undefined ? '' : 'startDate=' + filters.startDate + '&'}${filters.endDate === null || filters.endDate === undefined ? '' : 'endDate=' + filters.endDate + '&'}${filters.limit === null || filters.limit === undefined ? '' : 'limit=' + filters.limit + '&'}${'offset=' + filters.offset + '&orderBy=' + filters.orderBy}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(
                res => {
                    setPlayedList(res.data)
                    setLoading(false)
                }
            )
            .catch(
                err => {
                    console.log(err)
                }
            )
    }

    const offsetTableHandler = (page) => {
        setFilters((prev) => ({ ...prev, 'offset': page }))
        setResetFlag(true)
    }

    const updateOptionData = (name, id) => {
        setFilters((prev) => ({ ...prev, [name]: id }))
    }

    const updateDataPiker = (e, title) => {
        setFilters((prev) => ({ ...prev, [title]: e }))
    }

    const resetFillters = () => {
        setFilters({
            startDate: null,
            endDate: null,
            limit: 15,
            offset: 1,
            orderBy: 1
        })
        setResetFlag(true);
    }

    const updateOptionDataForLimit = (name, id) => {
        setFilters((prev) => ({ ...prev, [name]: id, 'offset': 1 }))
        setResetFlag(true)
    }

    return (
        <div className='played'>
            <div className="filters">

                <DatePikerFarsi classnamedatepicker={'playeddatepiker'} title={'startDate:'} value={filters.startDate} name={'startDate'} handlerChangeDate={updateDataPiker} />

                <DatePikerFarsi classnamedatepicker={'playeddatepiker'} title={'endDate:'} value={filters.endDate} name={'endDate'} handlerChangeDate={updateDataPiker} />

                <SelectOption classnameBox={'playeddatepiker'} readOnly={false} title={'orderby:'} name={'orderBy'} defaultValue={'ASC'} type={'status'} changeOptinValue={updateOptionData}
                    data={[
                        { id: 0, status: 'DESC' },
                        { id: 1, status: 'ASC' },
                    ]}
                />

                <SelectOption classnameBox={'filerinput'} readOnly={false} value={filters.limit} name={'limit'} defaultValue={'15'} type={'status'} changeOptinValue={updateOptionDataForLimit}
                    data={[
                        { id: 30, status: 30 },
                        { id: 40, status: 30 },
                        { id: 50, status: 30 },
                        { id: 60, status: 30 },
                    ]}
                />

                <Button title={'Filters'} className={'filtersBtn'} classnameBtn={'filtersBtnBox'} btnhandler={() => getPlayed()} />

                <div className="resetFillters" onClick={resetFillters}>
                    <HiOutlineTrash />
                </div>
            </div>

            <Table data={playedList?.data} sort={sortGamePlayed} list={playedList} offsetTable={offsetTableHandler} action={true} showDetailStatus={false} />
        </div>
    );
}

export default Played;
