import React from 'react';
import './Charts.scss';
import OnlinesChart from './OnlinesChart/Index';
import AllGamesChart from './AllGamesChart/Index';
import SoccerChart from './SoccerChart/Index';
import LudoChart from './LudoChart/Index';
import YatzyChart from './YatzyChart/Index';
import UnoChart from './UnoChart/Index';
import BackgammonChart from './BackgammonChart/Index';

function Charts() {
    return (
        <div className='charts row'>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12">
                <OnlinesChart />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12">
                <AllGamesChart />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12">
                <SoccerChart />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12">
                <LudoChart />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12">
                <YatzyChart />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12">
                <UnoChart />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12">
                <BackgammonChart />
            </div>
        </div>
    );
}

export default Charts;
