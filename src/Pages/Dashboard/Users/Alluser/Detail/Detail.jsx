import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingContext } from '../../../../Loading/LoadingContext';
import { useCookies } from 'react-cookie';
import { LoginContext } from '../../../../Login/LoginContext';
import { HiChevronLeft, HiPlus } from 'react-icons/hi2';
import './Detail.scss'
import Alert from '../../../../../layout/Alert/Alert';
import { API_URL } from '../../../../../API_URL';
import Table from '../../../../../layout/Table/Table';
import { sortUserItems } from '../../../../../Data/Sort';
import Input from '../../../../../Components/Input/Input';
import SelectOption from '../../../../../Components/SelectOption/SelectOption';
import ButtonActionBlue from '../../../../../Components/ButtonActionBlue/ButtonActionBlue';
import ButtonActionGray from '../../../../../Components/ButtonActionGray/ButtonActionGray';

function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [userItem, setUserItem] = useState()
  const [addItemsUserBox, setaddItemsUserBox] = useState(false)
  const [showAlert, setShowAlert] = useState({ status: false, msg: '' })
  const { loading, setLoading } = useContext(LoadingContext)
      const [cookies, setCookies, removeCookie] = useCookies(['accessToken'])

  const { goToLoginPage } = useContext(LoginContext);
  const [removeItem, setRemoveItem] = useState({
    userId: parseInt(id),
    itemId: null
  })

  useEffect(() => {
    goToLoginPage(cookies.accessToken);
    getUserItems()
  }, [])

  const getUserItems = () => {
    setLoading(true)
    setaddItemsUserBox(false)
    axios.get(`${API_URL === undefined ? '' : API_URL}/admin-stuff/get-items-of-user/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.accessToken
        }
      })
      .then(
        res => {
          setUserItem(res.data)
          setLoading(false)
        }
      )
      .catch(
        err => {
          if (err.response.data.statusCode === 401 && err.response.data.message === "Unauthorized") {
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


  const removeItemFromUser = () => {
    axios.post(`${API_URL === undefined ? '' : API_URL}/admin-stuff/remove-item-for-user`, removeItem, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + cookies.accessToken
      }
    }).then(
      res => {
        console.log(res)
      }
    ).catch(
      err => {
        console.log(err)
      }
    )
  }
  const hundelBack = () => {
    navigate(-1)
  }

  const updateInputData = (e) => {
    setRemoveItem((prev) => ({ ...prev, [e.target.name]: parseInt(e.target.value) }))
  }

  return (
    <div className='allUserItem'>
      {showAlert.status === true ?
        <Alert message={showAlert.msg} success={showAlert.success} />
        :
        ''
      }
      <div className="addBox">
        <div className='backUser' onClick={hundelBack}>
          <HiChevronLeft />
        </div>

        <div className="titleUserName">Details Of user {id}</div>


        <div className="addItemsUserBox">
          <div className="addItemsUserBtn" onClick={() => setaddItemsUserBox(!addItemsUserBox)}>
            <HiPlus className='icon' />
            <div>Remove Item</div>
          </div>

          <div className={`addItemsUser row ${addItemsUserBox ? 'activeaddItemsUser' : ''}`}>
            <div className="col-xl-6 col-lg-6 col-md-6 col-ms-12 col-xs-12">
              <Input name={'userId'} value={removeItem.userId} type={'number'} readOnly={true} title={'userId'} placeholder={'userId...'} changeInputValue={updateInputData} />
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-ms-12 col-xs-12">
              <Input name={'itemId'} type={'number'} placeholder={'itemId...'} title={'itemId'} changeInputValue={updateInputData} />
            </div>

            <div className="addItemsUsercancelbtn col-xl-12 col-lg-12 col-md-12 col-ms-12 col-xs-12">
              <ButtonActionBlue title={'remove Item'} handler={removeItemFromUser} />
              <ButtonActionGray title={'Cancel'} handler={() => setaddItemsUserBox(false)} />
            </div>
          </div>
        </div>
      </div>

      <Table data={userItem?.data} sort={sortUserItems} list={false} action={true} showDetailStatus={false} />

    </div>
  );
}

export default Detail;
