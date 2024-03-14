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
    const [transactionData, setTransactionData] = useState();
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


    //? GET
    //? /admin/charts/onlines
    
    
    //? GET
    //? /admin/charts/allgames
    
    
    //? GET
    //? /admin/charts/soccer
    
    
    //? GET
    //? /admin/charts/ludo
    
    
    //? GET
    //? /admin/charts/yatzy
    
    
    //? GET
    //? /admin/charts/backgammon
    
    
    //? GET
    //? /admin/charts/uno




    //admin-transaction/chart?statuses%5B%5D=5&gatewayTypes%5B%5D=1&type=1&startDate=2023-11-24&endtDate=2023-11-27
    const getChart = () => {
        setLoading(true)
        axios.get(`${API_URL === undefined ? '' : API_URL}/admin-transaction/chart?${filter.statuses === null || filter.statuses === undefined ? '' : ('statuses[]=' + filter.statuses + '&')}${filter.gatewayTypes === null || filter.gatewayTypes === undefined ? '' : ('gatewayTypes[]=' + filter.gatewayTypes + '&')}${'type=' + filter.type + '&'}${'startDate=' + filter.startDate + '&'}${'endtDate=' + filter.endtDate}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(res => {
                setTransactionData(res.data.data)
                setLoading(false)
            })
            .catch(
                err => {
                    console.log(err)
                }
            )
    }


    return (
        dataChart == [] || dataChart == {} || dataChart === undefined || dataChart === null ? '' :
            <div className='charts row'>
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12"><Chart chartData={transactionData} chartName={'Transaction1'} /></div>
            </div>
    );
}

export default Charts;
