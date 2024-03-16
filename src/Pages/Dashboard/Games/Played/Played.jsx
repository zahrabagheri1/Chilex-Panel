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
    const [data, setData] = useState()
    const [cookies] = useCookies(['accessToken']);
    const { loading, setLoading } = useContext(LoadingContext);
    const { goToLoginPage } = useContext(LoginContext);
    const [filter, setFilter] = useState({
        startDate: moment(dateNow).subtract(1, 'months').format('jYYYY-jM-jD'),
        endDate: moment(dateNow).format('jYYYY-jM-jD'),
        limit: 20,
        offset: 1,
        orderBy: 1
    })

    const { id } = useParams()

    useEffect(() => {
        goToLoginPage(cookies.accessToken);
        getPlayed()
    }, [])

    //dixo.diacostudios.com/games/played/uno?startDate=2023-05-12&endDate=2023-10-12&limit=10&offset=2&orderBy=1
    const getPlayed = () => {
        setLoading(true)
        axios.get(`${API_URL === undefined ? '' : API_URL}/games/played/${id}?${filter.startDate === null || filter.startDate === undefined ? '' : 'startDate=' + filter.startDate + '&'}${filter.endDate === null || filter.endDate === undefined ? '' : 'endDate=' + filter.endDate + '&'}${filter.limit === null || filter.limit === undefined ? '' : 'limit=' + filter.limit + '&'}${'offset=' + filter.offset + '&orderBy=' + filter.orderBy}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(
                res => {
                    setData(res.data.data)
                    setLoading(false)
                }
            )
            .catch(
                err => {
                    console.log(err)
                }
            )
    }

    const updateOptionData = (name, id) => {
        setFilter((prev) => ({ ...prev, [name]: id }))
    }

    const updateDataPiker = (e, title) => {
        setFilter((prev) => ({ ...prev, [title]: e }))
    }

    const resetFillters = () => {
        setFilter({
            startDate: null,
            endDate: null,
            limit: 15,
            offset: 1,
            orderBy: 1
        })
    }

    const filterhandler = () => {
        getPlayed()
    }

    return (
        <div className='played'>
            <div className="filter">

                <DatePikerFarsi classnamedatepicker={'playeddatepiker'} title={'startDate:'} value={filter.startDate} name={'startDate'} handlerChangeDate={updateDataPiker} />

                <DatePikerFarsi classnamedatepicker={'playeddatepiker'} title={'endDate:'} value={filter.endDate} name={'endDate'} handlerChangeDate={updateDataPiker} />

                <SelectOption classnameBox={'playeddatepiker'} readOnly={false} title={'orderby:'} name={'orderBy'} defaultValue={'ASC'} type={'status'} changeOptinValue={updateOptionData}
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

            <Table data={data} sort={sortGamePlayed} action={true} showDetailStatus={false} />
        </div>
    );
}

export default Played;
