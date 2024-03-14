import React, { useState } from 'react';
import SelectOption from '../../Components/SelectOption/SelectOption';
import './Chart.scss';
import DatePikerFarsi from '../../Components/DatePikerFarsi/DatePikerFarsi';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment-jalaali';

function Chart(props) {
    const dateNow = Date.now();
    const [filter, setFilter] = useState({
        statuses: null,
        gatewayTypes: null,
        type: 1,
        startDate: moment(dateNow).subtract(1, 'months').format('jYYYY-jM-jD'),
        endtDate: moment(dateNow).format('jYYYY-jM-jD'),
    })

    const updateOptionData = (name, id) => {
        setFilter(prev => ({ ...prev, [name]: id }))
    }

    const updateDataPiker = (e, title) => {
        setFilter((prev) => ({ ...prev, [title]: e }))
    }

    const chartDataOption = {
        series: [
            {
                name: 'South',
                data: props.chartData
            },
        ],
        options: {
            chart: {
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
            markers: {
                size: 0
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
            {props.chartData === undefined || props.chartData === null ? '' :
                <div className="chart-filter-box row">
                    <div className="chart-filter-title col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">{props.chartName}</div>
                    <div className="chart-box col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">
                        <ReactApexChart options={chartDataOption.options} series={chartDataOption.series} type="area"/>
                    </div>

                    <div className="filter-chart col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
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


