import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Table from '../../../../layout/Table/Table';
import { sortGamePlayed } from '../../../../Data/Sort';
import './Played.scss';
import SelectOption from '../../../../Components/SelectOption/SelectOption';
import DatePikerFarsi from '../../../../Components/DatePikerFarsi/DatePikerFarsi';
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../Loading/LoadingContext';
import { LoginContext } from '../../../Login/LoginContext';
import { API_URL } from '../../../../API_URL';
import moment from 'moment-jalaali';
import { HiOutlineFilter } from 'react-icons/hi';
import ButtonActionBlue from '../../../../Components/ButtonActionBlue/ButtonActionBlue';
import ButtonActionGray from '../../../../Components/ButtonActionGray/ButtonActionGray';

function Played() {
    const dateNow = Date.now()
    const [playedList, setPlayedList] = useState()
    const [cookies, setCookies, removeCookie] = useCookies(['accessToken'])
    const navigate = useNavigate()
    const [resetFlag, setResetFlag] = useState(false);
    const [filterBox, setFilterBox] = useState(false)
    const { loading, setLoading } = useContext(LoadingContext);
    const { goToLoginPage } = useContext(LoginContext);
    const [filters, setFilters] = useState({
        startDate: moment(dateNow).subtract(1, 'months').format('YYYY-M-D'),
        endDate: moment(dateNow).format('YYYY-M-D'),
        limit: 20,
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
        setFilterBox(false)
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
                    if (err.response.status === 500 || err.response.data.message === "Unauthorized") {
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
            startDate: moment(dateNow).subtract(1, 'months').format('YYYY-M-D'),
            endDate: moment(dateNow).format('YYYY-M-D'),
             limit: 20,
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
            <div className="top">
                <div className="filterBox">
                    <div className='filterBtn' onClick={() => setFilterBox(!filterBox)}>
                        <HiOutlineFilter className='icon' />
                        <div>Filter</div>
                    </div>

                    <div className={`filter row ${filterBox ? 'activeFilter' : ''}`}>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-ms-12 col-xs-12">
                            <DatePikerFarsi title={'startDate'} value={filters.startDate} name={'startDate'} handlerChangeDate={updateDataPiker} />
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-ms-12 col-xs-12">
                            <DatePikerFarsi title={'endDate'} value={filters.endDate} name={'endDate'} handlerChangeDate={updateDataPiker} />
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption readOnly={false} title={'orderby'} name={'orderBy'} defaultValue={'ASC'} type={'status'} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'DESC' },
                                    { id: 1, status: 'ASC' },
                                ]}
                            />
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption readOnly={false} value={filters.limit} title={"limit"} name={'limit'} defaultValue={'20'} type={'status'} changeOptinValue={updateOptionDataForLimit}
                                data={[
                                    { id: 15, status: 15 },
                                    { id: 20, status: 20 },
                                    { id: 40, status: 40 },
                                    { id: 60, status: 60 },
                                    { id: 80, status: 80 },
                                    { id: 100, status: 100 },
                                ]}
                            />
                        </div>

                        <div className="filterResetBtn col-xl-12 col-lg-12 col-md-12 col-ms-12 col-xs-12">
                            <ButtonActionBlue title={'Filter'} classnameBtn={'filterBtnBox'} handler={getPlayed} />
                            <ButtonActionGray title={'Reset Filter'} classnameBtn={'filterBtnBox'} handler={resetFillters} />
                        </div>
                    </div>
                </div>
            </div>

            <Table data={playedList?.data} sort={sortGamePlayed} list={playedList} offsetTable={offsetTableHandler} action={true} showDetailStatus={false} />
        </div>
    );
}

export default Played;
