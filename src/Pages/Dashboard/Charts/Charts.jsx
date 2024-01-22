import React, { useContext, useEffect, useState } from 'react';
import './Charts.scss';
import Chart from '../../../layout/Chart/Chart';
import { useCookies } from 'react-cookie';
import moment from 'moment-jalaali';
import axios from 'axios';
import { LoadingContext } from '../../Loading/LoadingContext';
import { LoginContext } from '../../Login/LoginContext';
import { API_URL } from '../../../API_URL';

function Charts() {
    var dataChart = [];
    const dateNow = Date.now();
    const [cookies] = useCookies(['accessToken']);
    const [transactionData, setTransactionData] = useState({});
    const { loading, setLoading } = useContext(LoadingContext)
    const { goToLoginPage } = useContext(LoginContext);
    const [filter, setFilter] = useState({
        statuses: null,
        gatewayTypes: null,
        type: 1,
        startDate: moment(dateNow).subtract(1, 'months').format('jYYYY-jM-jD'),
        endtDate: moment(dateNow).format('jYYYY-jM-jD'),
    })

    useEffect(() => {
        goToLoginPage(cookies.accessToken);
        getChart()
    }, [filter])

    console.log(API_URL)

    //admin-transaction/chart?statuses%5B%5D=5&gatewayTypes%5B%5D=1&type=1&startDate=2023-11-24&endtDate=2023-11-27
    const getChart = () => {
        setLoading(!loading)
        axios.get(`${API_URL === undefined ? '' : API_URL}/admin-transaction/chart?${filter.statuses === null || filter.statuses === undefined ? '' : ('statuses[]=' + filter.statuses + '&')}${filter.gatewayTypes === null || filter.gatewayTypes === undefined ? '' : ('gatewayTypes[]=' + filter.gatewayTypes + '&')}${'type=' + filter.type + '&'}${'startDate=' + filter.startDate + '&'}${'endtDate=' + filter.endtDate}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(res => {
                res.data.data.map(item => {
                    var makeObj = {}
                    for (const key in item) {
                        makeObj[key] = item[key];
                    }
                    dataChart.push(makeObj);
                })
                setTransactionData(dataChart)
                // console.log(dataChart)
                // console.log(res.data.data)
                setLoading(loading)
            })
            .catch(
                err => {
                    console.log(err)
                }
            )
    }

    const chartDataOption = {
        series: [
            {
                name: 'South',
                data: [
                    {
                        x: "2023-12-20",
                        y: "1"
                    },
                    {
                        x: "2023-12-21",
                        y: "1"
                    },
                    {
                        x: "2023-12-22",
                        y: "3"
                    },
                    {
                        x: "2023-12-23",
                        y: "2"
                    },
                    {
                        x: "2023-12-24",
                        y: "3"
                    },
                    {
                        x: "2023-12-25",
                        y: "1"
                    },
                    {
                        x: "2023-12-26",
                        y: "3"
                    },
                    {
                        x: "2023-12-27",
                        y: "2"
                    },
                    {
                        x: "2023-12-28",
                        y: "6"
                    }
                ]
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
            // labels: [],
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
        dataChart == [] || dataChart == {} || dataChart === undefined || dataChart === null ? '' :
            <div className='charts row'>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6"><Chart chartData={chartDataOption} chartName={'Transaction1'} /></div>
            </div>
    );
}

export default Charts;
