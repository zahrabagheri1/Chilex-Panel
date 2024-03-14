import React, { useContext, useEffect, useState } from 'react'
import './OnlinesChart.scss'
import axios from 'axios';
import { API_URL } from '../../../../API_URL';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../Loading/LoadingContext';
import { LoginContext } from '../../../Login/LoginContext';
import moment from 'moment-jalaali';
import ReactApexChart from 'react-apexcharts';
import SelectOption from '../../../../Components/SelectOption/SelectOption';
import DatePikerFarsi from '../../../../Components/DatePikerFarsi/DatePikerFarsi';

function Index() {
  const dateNow = Date.now();
  const [onlineUser, setOnlineUser] = useState()
  const [cookies] = useCookies(['accessToken'])
  const { loading, setLoading } = useContext(LoadingContext)
  const { goToLoginPage } = useContext(LoginContext)
  const [filter, setFilter] = useState({
    startDate: moment(dateNow).subtract(1, 'months').format('jYYYY-jM-jD'),
    endDate: moment(dateNow).format('jYYYY-jM-jD'),
    type: 3
  })

  const updateOptionData = (name, id) => {
    setFilter(prev => ({ ...prev, [name]: id }))
  }

  const updateDataPiker = (e, title) => {
    setFilter((prev) => ({ ...prev, [title]: e }))
  }

  useEffect(() => {
    goToLoginPage(cookies.accessToken)
    getOnlineChart()
  }, [filter])

  //chilexdev.diacostudios.com/admin/charts/onlines?startDate=%09%202020-02-25&endDate=%09%202020-02-25&type=1
  const getOnlineChart = () => {
    setLoading(true)
    axios.get(`${API_URL === undefined ? '' : API_URL}/admin/charts/onlines?${filter.startDate === null || filter.startDate === undefined ? '' : ('startDate=' + filter.startDate + '&')}${filter.endDate === null || filter.endDate === undefined ? '' : ('endDate=' + filter.endDate + '&')}${filter.type === null || filter.type === undefined ? '' : ('type=' + filter.type)}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.accessToken
        }
      }).then(
        res => {
          setOnlineUser(res.data.data)
          setLoading(false)
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
  }

  const chartDataOption = {
    series: [
      {
        name: 'onlineUser',
        data: onlineUser
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
      <div className="chart-filter-box row">
        <div className="chart-filter-title col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">Online Users</div>
        <div className="chart-box col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">
          <ReactApexChart options={chartDataOption.options} series={chartDataOption.series} type="area" />
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
              value={filter.endDate}
              title="endtDate"
            />
          </div>

        </div>
      </div>
    </div >
  )
}

export default Index