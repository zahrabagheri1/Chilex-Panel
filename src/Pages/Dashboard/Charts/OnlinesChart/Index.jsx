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
import { useNavigate } from 'react-router-dom';


function Index() {
  const dataOFChart = [
    { x: 35, y: "Jan" },
    { x: 65, y: "Feb" },
    { x: 24, y: "Mar" },
    { x: 54, y: "Apr" },
    { x: 12, y: "May" },
    { x: 74, y: "Jun" },
  ]
  const dateNow = Date.now();
  const [onlineUserList, setOnlineUserList] = useState(dataOFChart)
  const [cookies, setCookies, removeCookie] = useCookies(['accessToken'])
  const navigate = useNavigate()
  const { loading, setLoading } = useContext(LoadingContext)
  const { goToLoginPage } = useContext(LoginContext)
  const [filters, setFilters] = useState({
    startDate: moment(dateNow).subtract(1, 'months').format('YYYY-M-D'),
    endDate: moment(dateNow).format('YYYY-M-D'),
    type: 1
  })


  const dataOFChartX = []
  const dataOFChartY = []

  onlineUserList?.map(item => (
    dataOFChartY.push(item.y)
  ))


  switch (filters.type) {
    case 0:
        onlineUserList?.map(item => (
            dataOFChartX.push(moment(item.x).format('hh:mm A'))
        ))
        break;
    case 1:
        onlineUserList?.map(item => (
            dataOFChartX.push(moment(item.x).format('D MMMM'))
        ))
        break;
    case  2 :
        onlineUserList?.map(item => (
            dataOFChartX.push(moment(item.x).format('MMMM'))
        ))
        break;
    case 3:
        onlineUserList?.map(item => (
            dataOFChartX.push(moment(item.x).format('MMMM'))
        ))
        break;
        case 4:
        onlineUserList?.map(item => (
            dataOFChartX.push(moment(item.x).format('YYYY'))
        ))
        break;
    default:
        console.log("default");
}

  const updateOptionData = (name, id) => {
    setFilters(prev => ({ ...prev, [name]: id }))
  }

  const updateDataPiker = (e, title) => {
    console.log('datePiker' , title , e)
    setFilters((prev) => ({ ...prev, [title]: e }))
  }

  useEffect(() => {
    goToLoginPage(cookies.accessToken)
    getOnlineChart()
  }, [filters])

  const getOnlineChart = () => {
    setLoading(true)
    axios.get(`${API_URL === undefined ? '' : API_URL}/admin/charts/onlines?${filters.startDate === null || filters.startDate === undefined ? '' : ('startDate=' + filters.startDate + '&')}${filters.endDate === null || filters.endDate === undefined ? '' : ('endDate=' + filters.endDate + '&')}${filters.type === null || filters.type === undefined ? '' : ('type=' + filters.type)}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.accessToken
        }
      }).then(
        res => {
          setOnlineUserList(res.data.data)
          setLoading(false)
        }
      ).catch(
        err => {
          if (err.response.status === 500 || err.response.data.message === "Unauthorized") {
            removeCookie('accessToken', {
              expires: 'Thu, 01 Jan 1970 00:00:00 UTC',
            })
            navigate('/')
          } else {
            console.log(err)

          }
        }
      )
  }

  const chartDataOption = {
    series: [
      {
        name: 'onlineUserList',
        data: dataOFChartY
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
          show: true
        },
        zoom: {
          enabled: true,
        }
      },
      stroke: {
        curve: 'smooth',
        width: 3
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
      },
      xaxis: {
        categories: dataOFChartX,
      },

      yaxis: {
        title: {
          // text: 'Bytes Received'
        }
      }

    },
  };

  return (
    <div className='chart-filter-bg' >
      <div className="chart-filter-box row">
        <div className="chart-filter-title col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">Online Users</div>

        <div className="chart-box col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">
          <ReactApexChart options={chartDataOption.options} series={chartDataOption.series} type="area" height={250} />
        </div>

        <div className="filter-chart col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-6">
            <SelectOption name={'type'} title={'type'} defaultValue={'daily'} readOnly={false} type={'name'} changeOptinValue={updateOptionData}
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
              value={filters.startDate}
              title="startDate"
              name="startDate"
            />
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-6">
            <DatePikerFarsi
              handlerChangeDate={updateDataPiker}
              value={filters.endDate}
              title="endtDate"
              name="endtDate"
            />
          </div>

        </div>
      </div>
    </div >
  )
}

export default Index