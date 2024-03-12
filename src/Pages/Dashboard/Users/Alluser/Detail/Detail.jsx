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

function Detail() {
  const [userItem, setUserItem] = useState()
  const [showAlert, setShowAlert] = useState({ status: false, msg: '' })
  const { loading, setLoading } = useContext(LoadingContext)
  const [openModal, setOpenModal] = useState()
  const [cookies] = useCookies(['accessToken']);
  const [editAble, setEditAble] = useState(false)
  const { goToLoginPage } = useContext(LoginContext);
  const navigate = useNavigate()
  const { id } = useParams()


  useEffect(() => {
    goToLoginPage(cookies.accessToken);
    getUserItems()
  }, [])

  const getUserItems = () => {
    setLoading(true)
    axios.get(`${API_URL === undefined ? '' : API_URL}/admin-stuff/get-items-of-user/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.accessToken
        }
      })
      .then(
        res => {
          setUserItem(res.data.data)
          setLoading(false)
        }
      )
      .catch(
        err => {
          console.log(err)
        }
      )
  }

  // console.log(userItem)

  const hundelOpenModal = () => {
    setOpenModal(true)
  }

  const hundelBack = () => {
    navigate(-1)
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
        <div className="titleUserName">Details Of {id}</div>
        <div></div>
        {/* <div className='addItem' onClick={hundelOpenModal}>
          <HiPlus />
        </div> */}
      </div>

        <Table data={userItem} sort={sortUserItems} action={true} showDetail={()=>{}}/>

      {/* {openModal === true ? <ModalItem gameName={id} canceladd={() => setOpenModal(false)} /> : null} */}

    </div>
  );
}

export default Detail;
