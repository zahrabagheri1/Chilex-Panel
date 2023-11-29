import React from 'react';
import './Charts.scss';
import Chart from '../../../layout/Chart/Chart';

function Charts() {
    return (
        <div className='charts row'>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6"><Chart/></div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6"><Chart/></div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6"><Chart/></div>
        </div>
    );
}

export default Charts;
