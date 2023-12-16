import React, { useEffect, useState } from 'react';
import SelectOption from '../../Components/SelectOption/SelectOption';
import Input from '../../Components/Input/Input';
import './Chart.scss';
import axios from 'axios';
import { LineController, PolarAreaController } from 'chart.js';
import DatePikerFarsi from '../../Components/DatePikerFarsi/DatePikerFarsi';



function Chart() {
    const [data, setData] = useState({})
    const [filter, setFilter] = useState({
        statuses: null,
        gatewayTypes: null,
        type: 1,
        startDate: '2023-11-24',
        endtDate: '2023-11-27',
    })

    const [state, setState] = useState()

    const updateOptionData = (name, id) => {
        setFilter(prev => ({ ...prev, [name]: id }))
    }
    
    const updateInputData = (e) => {
        setFilter(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const updateDataPiker = (e , title)=>{
        // console.log(e, title)
        setFilter((prev) => ({ ...prev, [title]: e }))
    }


    useEffect(() => {
        getChart()
    }, [filter])

    //admin-transaction/chart?statuses%5B%5D=5&gatewayTypes%5B%5D=1&type=1&startDate=2023-11-24&endtDate=2023-11-27
    const getChart = () => {
        axios.get(`/admin-transaction/chart?${filter.statuses === null || filter.statuses === undefined ? '' : ('statuses[]=' + filter.statuses + '&')}${filter.gatewayTypes === null || filter.gatewayTypes === undefined ? '' : ('gatewayTypes[]=' + filter.gatewayTypes + '&')}${'type=' + filter.type + '&'}${'startDate=' + filter.startDate + '&'}${'endtDate=' + filter.endtDate}`)
            .then(res => {
                setData(res.data)
            })
            .catch(
                err => {
                    console.log(err)
                }
            )
    }

    return (
        <div className='chart-filter-bg'>
            {data === undefined || data === null ? '' :
                <div className="chart-filter-box row">
                    <div className="chart-filter-title col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">Transaction</div>
                    <div className="chart-box col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">

                    </div>

                    <div className="filter-chart col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-6">
                            <SelectOption name={'statuses'} defaultValue={'statuses'} readOnly={false} type={'name'} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, name: 'pending' },
                                    { id: 1, name: 'true check result' },
                                    { id: 2, name: 'false check result' },
                                    { id: 3, name: 'failed' },
                                    { id: 4, name: 'successful' },
                                    { id: 5, name: 'refunded' }
                                ]} />
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-6">
                            <SelectOption name={'gatewayTypes'} defaultValue={'gatewayTypes'} readOnly={false} type={'name'} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, name: 'pasargad' },
                                    { id: 1, name: 'cafe bazaar' }
                                ]} />
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-6">
                            <SelectOption name={'type'} defaultValue={'monthly'} readOnly={false} type={'name'} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, name: 'hourly' },
                                    { id: 1, name: 'daily' },
                                    { id: 2, name: 'weekly' },
                                    { id: 3, name: 'monthly' },
                                    { id: 4, name: 'yearly' }
                                ]} />
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-6">
                            <DatePikerFarsi
                                handlerChangeDate={updateDataPiker}
                                value={'1402/02/02'}
                                title="startDate"
                            />
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-6">
                            <DatePikerFarsi
                                handlerChangeDate={updateDataPiker}
                                value={'1402/02/02'}
                                title="endtDate"
                            />
                        </div>

                    </div>
                </div>
            }
        </div>
    );
}

export default Chart;


