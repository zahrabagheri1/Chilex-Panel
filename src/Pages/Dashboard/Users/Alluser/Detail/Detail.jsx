import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingContext } from '../../../../Loading/LoadingContext';
import { useCookies } from 'react-cookie';
import { LoginContext } from '../../../../Login/LoginContext';
import { HiCheck, HiChevronLeft, HiMiniXMark, HiPencilSquare } from 'react-icons/hi2';
import './Detail.scss'
import Alert from '../../../../../layout/Alert/Alert';
import moment from 'moment-jalaali';
import Input from '../../../../../Components/Input/Input';
import API_URL from '../../../../../API_URL';

function Detail() {
  const [users, setUsers] = useState()
  const [showAlert, setShowAlert] = useState({ status: false, msg: '' })
  const { loading, setLoading } = useContext(LoadingContext)
  const [cookies] = useCookies(['accessToken']);
  const [editAble, setEditAble] = useState(false)
  const [updateUsesr, setUpdatedataUser] = useState(
    {
      name: null,
      email: null,
      phone: null,
      ban: null,
      coin: null,
      gem: null
    }
  )
  const { goToLoginPage } = useContext(LoginContext);
  const navigate = useNavigate()
  const { id } = useParams()


  useEffect(() => {
    goToLoginPage(cookies.accessToken);
    // detailUser()
  }, [])

  const detailUser = () => {
    setLoading(!loading)
    axios.get(API_URL + `${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.accessToken
        }
      })
      .then(
        res => {
          console.log(res)
          setUsers(res.data.data)

        }
      )
      .catch(
        err => {
          console.log(err)
        }
      )
  }

  const sendData = () => {
    axios.patch(API_URL + `/admin/users/${id}`,
      {
        name: updateUsesr.name === null || updateUsesr.name === undefined ? users.name : updateUsesr.name,
        email: updateUsesr.email === null || updateUsesr.email === undefined ? users.email : updateUsesr.email,
        phone: updateUsesr.phone === null || updateUsesr.phone === undefined ? users.phone : updateUsesr.phone,
        ban: updateUsesr.ban === null || updateUsesr.ban === undefined ? users.ban : updateUsesr.ban,
        coin: updateUsesr.coin === null || updateUsesr.coin === undefined ? users.coin : updateUsesr.coin,
        gem: updateUsesr.gem === null || updateUsesr.gem === undefined ? users.gem : updateUsesr.gem

      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.accessToken
        }
      }).then(
        res => {
          console.log(res)
          setShowAlert({ status: true, msg: res.message, success: true })
          setTimeout(() => {
            setShowAlert({ status: false, msg: res.message })
          }, 3000)
        }
      )
      .catch(
        err => {
          console.log(err)
          setShowAlert({ status: true, msg: err.message, success: true })
          setTimeout(() => {
            setShowAlert({ status: false, msg: err.message })
          }, 3000)
        }
      )

  }

  const changeValueInput = (e) => {
    setUpdatedataUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
}

  const editData = () => {
    setEditAble(!editAble)
  }

  const editDataCancel = () => {
    setEditAble(!editAble)
  }

  const hundelBack = () => {
    navigate(-1)
  }

  return (
    <div className='alluserDetial'>
      {showAlert.status === true ?
        <Alert message={showAlert.msg} success={showAlert.success} />
        :
        ''
      }
      <div className="addBox">
        <div className='backUser' onClick={hundelBack}>
          <HiChevronLeft />
        </div>
        <div className="titleUser">Details Of User {id}</div>
        <div className="btnEdit">
          {editAble ?
            <div className="btnEditCancel">
              <div className='editUser' onClick={sendData}>
                <HiCheck />
              </div>
              <div className='editUser' onClick={editDataCancel}>
                <HiMiniXMark />
              </div>
            </div>
            :
            <div className='editUser' onClick={editData}>
              <HiPencilSquare />
            </div>
          }
        </div>
      </div>
      <div className='boxOfDetail row'>
        {
          users === null || users === undefined ? '' :
            Object.entries(users).map(([key, value], index) => (
              key === 'updatedAt' || key === 'createdAt' ?
                <div key={index} className='titleB col-xl-3 col-lg-3 col-md-4 col-ms-6 col-xs-6'>
                  <div className='header-title'>{key}</div>
                  <div className='data-title'>{moment(value, 'YYYY/MM/DD').format('jYYYY/jM/jD')}</div>
                </div>

                :
                <Input inputclassname={editAble === false ? 'disabled' : ''} name={key} title={key} value={value} type={key === 'amount' ? 'number' : 'text'} readOnly={editAble ? false : true} changeInputValue={changeValueInput} />
             
            ))
        }

      </div>

    </div>
  );
}

export default Detail;
