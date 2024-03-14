import React from 'react';
import './Charts.scss';
import OnlinesChart from './OnlinesChart/Index';
import AllGamesChart from './AllGamesChart/Index';
import SoccerChart from './SoccerChart/Index';

function Charts() {

    //? GET
    //? /admin/charts/ludo


    //? GET
    //? /admin/charts/yatzy


    //? GET
    //? /admin/charts/backgammon


    //? GET
    //? /admin/charts/uno


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
        </div>
    );
}

export default Charts;
