import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import Table from '../../../../layout/Table/Table';
import { sortGamePlayed } from '../../../../Data/Sort';
import './Played.scss';
import Input from '../../../../Components/Input/Input';
import SelectOption from '../../../../Components/SelectOption/SelectOption';

const props = {
    gameName: 'ludo',
}

function Played() {
    const [data, setData] = useState()
    const [filter, setFilter] = useState({
        startDate: null,
        endDate: null,
        limit: null,
        offset: 1,
        orderBy: 1
    })

    useEffect(() => {
        getPlayed()
    }, [filter])

    //dixo.diacostudios.com/games/played/uno?startDate=2023-05-12&endDate=2023-10-12&limit=10&offset=2&orderBy=1
    const getPlayed = () => {
        axios.get(`/games/played/${props.gameName}?${filter.startDate === null || filter.startDate === undefined ? '' : 'startDate=' + filter.startDate + '&'}${filter.endDate === null || filter.endDate === undefined ? '' : 'endDate=' + filter.endDate + '&'}${filter.limit === null || filter.limit === undefined ? '' : 'limit=' + filter.limit + '&'}${'offset=' + filter.offset + '&orderBy=' + filter.orderBy}`)
            .then(
                res => {
                    setData(res.data.data)
                    console.log(res.data.data)
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

    return (
        <div className='played'>
            <div className="filter row">
                <div className='col-xl-2 col-lg-2 col-md-4 col-sm-6 col-xs-12'>
                    <Input classname='controlinput' name={'startDate'} type={'date'} title={"Start Date"} placeholder={'Start Date'} changeInputValue={updateInputData} />
                </div>

                <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-xs-12">
                    <Input classname='controlinput' name={'endDate'} type={'date'} title={"End Date"} placeholder={'End Date'} changeInputValue={updateInputData} />
                </div>

                <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-xs-12">
                    <Input classname='controlinput' name={'limit'} type={'number'} title={"limit"} placeholder={'limit'} changeInputValue={updateInputData} />
                </div>

                <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-xs-12">
                    <Input classname='controlinput' name={'offset'} type={'number'} title={"offset"} placeholder={'offset'} changeInputValue={updateInputData} />
                </div>

                <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-xs-12">
                    <SelectOption classnameBox='control' name={'orderBy'} defaultValue={'orderBy'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'DESC' },
                            { id: 1, status: 'ASC' },
                        ]}
                    />
                </div>

            </div>

            <ScrollContainer>
                <Table data={data} sort={sortGamePlayed} action={true} />
            </ScrollContainer>
        </div>
    );
}

export default Played;
