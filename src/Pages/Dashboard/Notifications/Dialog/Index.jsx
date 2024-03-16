import React, { useContext, useEffect, useState } from 'react'
import Table from '../../../../layout/Table/Table'
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
import SelectOption from '../../../../Components/SelectOption/SelectOption'


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

  const updateInputData = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const updateOptionData = (name, id) => {
    setFilters((prev) => ({ ...prev, [name]: id }))
  }

  const filterhandler = () => {
    reqDialog()
  }

  return (
    <div className='notifList'>
      <div className='top'>
        <div className='filters'>
          <Input name={'userId'} classname={'filerinput'} type={'text'} placeholder={'userId'} value={filters.userId} changeInputValue={updateInputData} />

          <SelectOption classnameBox={'filerinput'} readOnly={false} value={filters.limit} name={'limit'} defaultValue={'20'} type={'status'} changeOptinValue={updateOptionData}
            data={[
              { id: 30, status: 30 },
              { id: 40, status: 40 },
              { id: 50, status: 50 },
              { id: 60, status: 60 },
            ]}
          />

          <Button title={'Filter'} className={'filterBtn'} classnameBtn={'filterBtnBox'} btnhandler={filterhandler} />
          <div className="resetFillters" onClick={resetFillters}>
            <HiOutlineTrash />
          </div>
        </div>

        <div className='addnotif' onClick={hundelOpenModal}>
          <HiPlus className='icon' />
          <div>Add Dialog</div>
        </div>
      </div>

      <Table data={dialog} sort={sortDialog} action={true} showDetail={showDetailNotif} />

      {modal === true ?
        <AddDialog canceladd={() => setModal(false)} />
        : ''
      }
    </div>
  )
}

export default Index