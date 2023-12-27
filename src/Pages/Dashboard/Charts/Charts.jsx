import React, { useContext, useEffect, useState } from 'react';
import './Charts.scss';
import Chart from '../../../layout/Chart/Chart';
import { useCookies } from 'react-cookie';
import moment from 'moment-jalaali';
import axios from 'axios';
import { LoadingContext } from '../../Loading/LoadingContext';

function Charts() {
    const dateNow = Date.now();
    const [cookies] = useCookies(['accessToken']);
    const [data, setData] = useState({});
    const { loading, setLoading } = useContext(LoadingContext)
    const [filter, setFilter] = useState({
        statuses: null,
        gatewayTypes: null,
        type: 1,
        startDate: moment(dateNow).subtract(1, 'months').format('jYYYY/jM/jD'),
        endtDate: moment(dateNow).format('jYYYY/jM/jD'),
    })

    useEffect(() => {
        getChart()
    }, [filter])

    //admin-transaction/chart?statuses%5B%5D=5&gatewayTypes%5B%5D=1&type=1&startDate=2023-11-24&endtDate=2023-11-27
    const getChart = () => {
        setLoading(!loading)
        axios.get(`/admin-transaction/chart?${filter.statuses === null || filter.statuses === undefined ? '' : ('statuses[]=' + filter.statuses + '&')}${filter.gatewayTypes === null || filter.gatewayTypes === undefined ? '' : ('gatewayTypes[]=' + filter.gatewayTypes + '&')}${'type=' + filter.type + '&'}${'startDate=' + filter.startDate + '&'}${'endtDate=' + filter.endtDate}`,
            {
                headers: {
                    accessToken: cookies.accessToken,
                }
            })
            .then(res => {
                setLoading(loading)
                setData(res.data.data)
            })
            .catch(
                err => {
                    // console.log(err)
                }
            )
    }

    return (
        <div className='charts row'>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6"><Chart data={data} /></div>
        </div>
    );
}

export default Charts;
