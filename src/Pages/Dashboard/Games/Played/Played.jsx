import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import Table from '../../../../layout/Table/Table';
import { sortGamePlayed } from '../../../../Data/Sort';
import './Played.scss';
import Input from '../../../../Components/Input/Input';
import SelectOption from '../../../../Components/SelectOption/SelectOption';
import DatePikerFarsi from '../../../../Components/DatePikerFarsi/DatePikerFarsi';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../Loading/LoadingContext';
import { LoginContext } from '../../../Login/LoginContext';
import { HiOutlineTrash } from 'react-icons/hi2';
import { API_URL }  from '../../../../API_URL';

const props = {
    gameName: 'ludo',
}

function Played() {
    const [data, setData] = useState()
    const [cookies] = useCookies(['accessToken']);
    const { loading, setLoading } = useContext(LoadingContext);
    const { goToLoginPage } = useContext(LoginContext);
    const [filter, setFilter] = useState({
        startDate: null,
        endDate: null,
        limit: null,
        offset: 1,
        orderBy: 1
    })
    const { id } = useParams()

    useEffect(() => {
        goToLoginPage(cookies.accessToken);
        getPlayed()
    }, [filter])

    //dixo.diacostudios.com/games/played/uno?startDate=2023-05-12&endDate=2023-10-12&limit=10&offset=2&orderBy=1
    const getPlayed = () => {
        setLoading(!loading)
        axios.get(`${API_URL === undefined ? '' : API_URL}/games/played/${id}?${filter.startDate === null || filter.startDate === undefined ? '' : 'startDate=' + filter.startDate + '&'}${filter.endDate === null || filter.endDate === undefined ? '' : 'endDate=' + filter.endDate + '&'}${filter.limit === null || filter.limit === undefined ? '' : 'limit=' + filter.limit + '&'}${'offset=' + filter.offset + '&orderBy=' + filter.orderBy}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(
                res => {
                    console.log(res.data.data)
                    setData(res.data.data)
                    setLoading(loading)
                }
            )
            .catch(
                err => {
                    console.log(err)
                }
            )
    }


    const updateInputData = (e) => {
        setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }))
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
            limit: null,
            offset: 1,
            orderBy: 1
        })
    }


    return (
        <div className='played'>
            <div className="filter">
                <div className="row">

                    <div className='col-xl-2 col-lg-2 col-md-4 col-sm-6 col-xs-12'>
                        <DatePikerFarsi value={'1402/02/02'} title={'startDate'} handlerChangeDate={updateDataPiker} />
                    </div>

                    <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-xs-12">
                        <DatePikerFarsi value={'1402/02/02'} title={'endDate'} handlerChangeDate={updateDataPiker} />
                    </div>

                    <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-xs-12">
                        <Input name={'limit'} type={'number'} title={"limit"} placeholder={'limit'} changeInputValue={updateInputData} />
                    </div>

                    <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-xs-12">
                        <Input name={'offset'} type={'number'} title={"offset"} placeholder={'offset'} changeInputValue={updateInputData} />
                    </div>

                    <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-xs-12">
                        <SelectOption readOnly={false} name={'orderBy'} defaultValue={'orderBy'} type={'status'} changeOptinValue={updateOptionData}
                            data={[
                                { id: 0, status: 'DESC' },
                                { id: 1, status: 'ASC' },
                            ]}
                        />
                    </div>
                </div>

                <div className="resetFillters" onClick={resetFillters}>
                    <HiOutlineTrash />
                </div>
            </div>

            <ScrollContainer>
                <Table data={data} sort={sortGamePlayed} action={true} showDetailStatus={false} />
            </ScrollContainer>
        </div>
    );
}

export default Played;
