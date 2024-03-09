import React, { useContext, useEffect, useState } from 'react'
import Table from '../../../../layout/Table/Table'
import ScrollContainer from 'react-indiana-drag-scroll'
import { HiOutlineTrash, HiPlus } from 'react-icons/hi2'
import Button from '../../../../Components/Button/Button'
import Input from '../../../../Components/Input/Input'
import AddDialog from './AddDialog/Index';
import { LoadingContext } from '../../../Loading/LoadingContext'
import { LoginContext } from '../../../Login/LoginContext'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { sortDialog } from '../../../../Data/Sort'
import { API_URL } from '../../../../API_URL';
import axios from 'axios'


function Index() {
  const [dialog, setDialog] = useState(null);
  const [modal, setModal] = useState(false);
  const [cookies] = useCookies(['accessToken']);
  const { loading, setLoading } = useContext(LoadingContext);
  const { goToLoginPage } = useContext(LoginContext);
  const navigate = useNavigate();
  const [resetFlag, setResetFlag] = useState(false);
  const [filters, setFilters] = useState({
    userId: null,
    limit: 20,
    page: 1
  })

  //fcm?userId=0&limit=20&page=1

  useEffect(() => {
    goToLoginPage(cookies.accessToken);
    if (resetFlag) {
      reqDialog();
      setResetFlag(false);
    } else {
      reqDialog()
    }
  }, [resetFlag])

  const reqDialog = () => {
    setLoading(true)
    axios.get(`${API_URL === undefined ? '' : API_URL}/dialog?${filters.userId === null || filters.userId === undefined ? '' : 'userId=' + filters.userId + '&'}${filters.limit === null || filters.limit === undefined ? '' : 'limit=' + filters.limit + '&'}${filters.page === null || filters.page === undefined ? '' : 'page=' + filters.page}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.accessToken
        }
      })
      .then(
        res => {
          setDialog(res.data.data)
          setLoading(false)
        }
      )
      .catch(
        err => console.log(err)
      )
  }

  const resetFillters = () => {
    setFilters({
      userId: null,
      limit: 20,
      page: 1
    })
    setResetFlag(true);
  }

  const showDetailNotif = (id) => {
    // navigate(`${id}`)
  }

  const hundelOpenModal = () => {
    setModal(true)
  }

  const handlerCloseModal = () => {
    setModal(false)
  }

  const updateInputData = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const filterhandler = () => {
    reqDialog()
  }

  return (
    <div className='notifList'>
      <div className='top'>
        <div className='filter'>
          <div className="row">
            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
              <Input name={'userId'} type={'text'} title={"userId"} placeholder={'userId'} value={filters.userId} changeInputValue={updateInputData} />
            </div>

            {/* <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                    <Input name={'limit'} type={'number'} title={"limit"} placeholder={'limit'} changeInputValue={updateInputData} />
                </div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
                    <Input name={'page'} type={'number'} title={"page"} placeholder={'page'} changeInputValue={updateInputData} />
                </div> */}

            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12">
              <Button title={'Filter'} className={'filterBtn'} classnameBtn={'filterBtnBox'} btnhandler={filterhandler} />
            </div>

          </div>
          <div className="resetFillters" onClick={resetFillters}>
            <HiOutlineTrash />
          </div>
        </div>

        <div className='addnotif' onClick={hundelOpenModal}>
          <HiPlus className='icon' />
        </div>
      </div>

      <ScrollContainer>
        <Table data={dialog} sort={sortDialog} action={true} showDetail={showDetailNotif} />
      </ScrollContainer>

      {modal === true ?
        <AddDialog canceladd={() => setModal(false)} />
        : ''
      }
    </div>
  )
}

export default Index