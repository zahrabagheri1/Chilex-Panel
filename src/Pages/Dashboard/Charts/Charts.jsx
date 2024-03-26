import React from 'react';
import './Charts.scss';
import OnlinesChart from './OnlinesChart/Index';
import AllGamesChart from './AllGamesChart/Index';
import SoccerChart from './SoccerChart/Index';
import LudoChart from './LudoChart/Index';
import YatzyChart from './YatzyChart/Index';
import UnoChart from './UnoChart/Index';
import BackgammonChart from './BackgammonChart/Index';
import { FaUsers } from "react-icons/fa";
import ReactApexChart from 'react-apexcharts';

function Charts() {
    const dataOFChart = [
        { x: 35, y: "Jan" },
        { x: 65, y: "Feb" },
        { x: 24, y: "Mar" },
        { x: 54, y: "Apr" },
        { x: 12, y: "May" },
        { x: 74, y: "Jun" },
    ]

    const dataOFChartX = []
    const dataOFChartY = []

    dataOFChart.map(item => (
        dataOFChartX.push(item.x)
    ))
    dataOFChart.map(item => (
        dataOFChartY.push(item.y)
    ))

    const items = {

        series: [{
            name: "Desktops",
            data: dataOFChartX
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Product Trends by Month',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: dataOFChartY,
            }
        },


    };

    return (
        <div className='charts'>

            <div className="dashbordBoxs">
                <div className="usersonlineBox">

                </div>
                <div className="allgamesBox"></div>
                <div className="soccerBox"></div>
                <div className="loduBox"></div>
                <div className="yatzyBox"></div>
                <div className="unoBox"></div>
                <div className="backgammonBox"></div>
            </div>

            <div className="">
                {/* <div className="chartBox">
                    <ReactApexChart options={items.options} series={items.series} type="line" height={350} />
                </div> */}

                <div className="chartBox col-xl-8 col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <OnlinesChart />
                </div>
                {/* <AllGamesChart /> */}
                {/* <SoccerChart /> */}
                {/* <LudoChart /> */}
                {/* <YatzyChart /> */}
                {/* <UnoChart /> */}
                {/* <BackgammonChart /> */}
            </div>
        </div>
    );
}

export default Charts;
