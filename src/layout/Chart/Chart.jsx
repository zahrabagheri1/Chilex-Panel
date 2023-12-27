import React, { useContext, useEffect, useState } from 'react';
import SelectOption from '../../Components/SelectOption/SelectOption';
import Input from '../../Components/Input/Input';
import './Chart.scss';
import axios from 'axios';
import { LineController, PolarAreaController } from 'chart.js';
import DatePikerFarsi from '../../Components/DatePikerFarsi/DatePikerFarsi';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment-jalaali';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../Pages/Loading/LoadingContext';


function Chart() {
    const dateNow = Date.now();
    const [cookies] = useCookies(['accessToken']);
    const [data, setData] = useState({})
    const { loading, setLoading } = useContext(LoadingContext)
    const [filter, setFilter] = useState({
        statuses: null,
        gatewayTypes: null,
        type: 1,
        startDate: moment(dateNow).subtract(1, 'months').format('jYYYY/jM/jD'),
        endtDate: moment(dateNow).format('jYYYY/jM/jD'),
    })

    const updateOptionData = (name, id) => {
        setFilter(prev => ({ ...prev, [name]: id }))
    }

    const updateDataPiker = (e, title) => {
        setFilter((prev) => ({ ...prev, [title]: e }))
    }


    useEffect(() => {
        getChart()
    }, [filter])

    //admin-transaction/chart?statuses%5B%5D=5&gatewayTypes%5B%5D=1&type=1&startDate=2023-11-24&endtDate=2023-11-27
    const getChart = () => {
        setLoading(!loading)
        axios.get(`/admin-transaction/chart?${filter.statuses === null || filter.statuses === undefined ? '' : ('statuses[]=' + filter.statuses + '&')}${filter.gatewayTypes === null || filter.gatewayTypes === undefined ? '' : ('gatewayTypes[]=' + filter.gatewayTypes + '&')}${'type=' + filter.type + '&'}${'startDate=' + filter.startDate + '&'}${'endtDate=' + filter.endtDate}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(res => {
                setData(res.data.data)
                setLoading(loading)
            })
            .catch(
                err => {
                    console.log(err)
                }
            )
    }
    const chartData = {
        series: [
            {
                name: 'South',
                // data: [10, 25, 45, 25, 35, 12, 25, 14, 18, 16, 17, 19]
                // data: data === undefined || data === null || data == {} ? {} : data
                data: [{
                    x: moment('2023-02-10').format('jYYYY/jM/jD'),
                    y: 25
                },
                {
                    x: moment('2023-02-12').format('jYYYY/jM/jD'),
                    y: 60
                },
                {
                    x: moment('2023-02-14').format('jYYYY/jM/jD'),
                    y: 40
                },
                {
                    x: moment('2023-02-16').format('jYYYY/jM/jD'),
                    y: 50
                },
                {
                    x: moment('2023-02-18').format('jYYYY/jM/jD'),
                    y: 70
                }]
            },
        ],

        options: {
            chart: {
                height: 350,
                type: 'area',
                id: 'realtime',
                background: 'none',
                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                        speed: 1000
                    }
                },
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: true,
                }
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
            colors: ['#0C499B'],
            dataLabels: {
                enabled: false,
            },
            fill: {
                type: 'solid',
                opacity: [0.5, 1],
            },
            // labels: ['Dec 01', 'Dec 02', 'Dec 03', 'Dec 04', 'Dec 05', 'Dec 06', 'Dec 07', 'Dec 08', 'Dec 09 ', 'Dec 10', 'Dec 11'],
            labels: [],
            markers: {
                size: 0
            },
            // yaxis: [
            //     {
            //         title: {
            //             text: 'Series A',
            //         },
            //     },
            //     {
            //         opposite: true,
            //         title: {
            //             text: 'Series B',
            //         },
            //     },
            // ],
            tooltip: {
                // shared: true,
                // intersect: false,
                // y: {
                //     formatter: function (y) {
                //         if (typeof y !== "undefined") {
                //             return y.toFixed(0) + " points";
                //         }
                //         return y;
                //     }
                // }
            },
            xaxis: {
                // type: 'datetime',
            },
            theme: {
                mode: 'dark',
                palette: 'palette1',
                monochrome: {
                    enabled: true,
                    color: '#0C499B',
                    shadeTo: 'dark',
                    shadeIntensity: 1
                },
            }
        },
    };

    return (
        <div className='chart-filter-bg' >
            {data === undefined || data === null ? '' :
                <div className="chart-filter-box row">
                    <div className="chart-filter-title col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">Transaction</div>
                    <div className="chart-box col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">
                        <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={350} />
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
                                value={filter.startDate}
                                title="startDate"
                            />
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-6">
                            <DatePikerFarsi
                                handlerChangeDate={updateDataPiker}
                                value={filter.endtDate}
                                title="endtDate"
                            />
                        </div>

                    </div>
                </div>
            }
        </div >
    );
}

export default Chart;


