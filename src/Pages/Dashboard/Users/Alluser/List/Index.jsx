import React, { useContext, useEffect, useState } from 'react';
import Table from '../../../../../layout/Table/Table';
import axios from 'axios';
import { sortUserList } from '../../../../../Data/Sort';
import { useNavigate } from 'react-router-dom';
import { HiMiniArrowUpTray, HiOutlineTrash, HiUserMinus } from "react-icons/hi2";
import './List.scss';
import SelectOption from '../../../../../Components/SelectOption/SelectOption';
import Input from '../../../../../Components/Input/Input';
import ModalBanUser from '../../../../../layout/ModalBanUser/ModalBanUser';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../../Loading/LoadingContext';
import DatePikerFarsi from '../../../../../Components/DatePikerFarsi/DatePikerFarsi';
import { API_URL } from '../../../../../API_URL';
import { LoginContext } from '../../../../Login/LoginContext';
import Button from '../../../../../Components/Button/Button';

function Index() {
  const [userList, setUserList] = useState()
  const [modal, setModal] = useState()
  const { loading, setLoading } = useContext(LoadingContext);
  const [resetFlag, setResetFlag] = useState(false);
  const { goToLoginPage } = useContext(LoginContext);
  const [cookies] = useCookies(['accessToken']);
  const [filters, setFilters] = useState({
    name: null,
    email: null,
    phone: null,
    ban: 0,
    // createdAt:  moment(dateNow).format('jYYYY-jM-jD'),
    createdAt: null,
    createdAtType: 1,
    register: 0,
    inviteBy: 0,
    lastOnline: 0,
    limit: 20,
    online: 2,
    unfinishedGame: 0,
    page: 1,
    sortBy: 1,
    order: 0
  })

  const navigate = useNavigate()

  const resetFillters = () => {
    setFilters({
      name: null,
      email: null,
      phone: null,
      ban: 0,
      // createdAt:  moment(dateNow).format('jYYYY-jM-jD'),
      createdAt: null,
      createdAtType: 1,
      register: 0,
      inviteBy: 0,
      lastOnline: 0,
      limit: 20,
      online: 2,
      unfinishedGame: 0,
      page: 1,
      sortBy: 1,
      order: 0
    })
    setResetFlag(true);
  }

  const filtershandler = () => {
    banUser()
  }

  const updateOptionData = (name, id) => {
    setFilters((prev) => ({ ...prev, [name]: id }))
  }

  const updateInputData = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const showDetailBanUser = (id) => {
    navigate(`${id}`)
  }

  const updateDataPiker = (e, title) => {
    setFilters((prev) => ({ ...prev, [title]: e }))
  }

  const handelOpenModal = () => {
    setModal(true)
  }

  useEffect(() => {
    goToLoginPage(cookies.accessToken);
    if (resetFlag) {
      banUser();
      setResetFlag(false);
    } else {
      banUser()
    }
  }, [resetFlag])

  const banUser = () => {
    setLoading(true)
    axios.get(`${API_URL === undefined ? '' : API_URL}/admin/users?${filters.name === undefined || filters.name === null ? '' : 'name=' + filters.name + '&'}${filters.email === undefined || filters.email === null ? '' : 'email=' + filters.email + '&'}${filters.phone === undefined || filters.phone === null ? '' : 'phone=' + filters.phone + '&'}${filters.ban === undefined || filters.ban === null ? '' : 'ban=' + filters.ban + '&'}${filters.createdAt === undefined || filters.createdAt === null ? '' : 'createdAt=' + filters.createdAt + '&'}${filters.createdAtType === undefined || filters.createdAtType === null ? '' : 'createdAtType=' + filters.createdAtType + '&'}${filters.register === undefined || filters.register === null ? '' : 'register=' + filters.register + '&'}${filters.inviteBy === undefined || filters.inviteBy === null ? '' : 'inviteBy=' + filters.inviteBy + '&'}${filters.lastOnline === undefined || filters.lastOnline === null ? '' : 'lastOnline=' + filters.lastOnline + '&'}${filters.limit === undefined || filters.limit === null ? '' : 'limit=' + filters.limit + '&'}${filters.online === undefined || filters.online === null ? '' : 'online=' + filters.online + '&'}${filters.unfinishedGame === undefined || filters.unfinishedGame === null ? '' : 'unfinishedGame=' + filters.unfinishedGame + '&'}${filters.page === undefined || filters.page === null ? '' : 'page=' + filters.page + '&'}${filters.sortBy === undefined || filters.sortBy === null ? '' : 'sortBy=' + filters.sortBy + '&'}${filters.order === undefined || filters.order === null ? '' : 'order=' + filters.order}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.accessToken
        }
      })
      .then(
        res => {
          setUserList(res.data.data)
          setLoading(false)
        }
      )
      .catch(
        err => {
          console.log(err)
        }
      )
  }

  return (
    <div className='userList'>
      <div className="top">
        <div className="filters">
          <Input type={'text'} placeholder={'name...'} name={'name'} changeInputValue={updateInputData} />

          <Input type={'text'} placeholder={'email...'} name={'email'} changeInputValue={updateInputData} />

          <Input type={'text'} placeholder={'phone...'} name={'phone'} changeInputValue={updateInputData} />

          <SelectOption readOnly={false} name={'ban'} defaultValue={'ban or all'} type={'status'} changeOptinValue={updateOptionData}
            data={[
              { id: 0, status: 'all users' },
              { id: 1, status: 'ban users' }
            ]}
          />

          <DatePikerFarsi value={Date.now()} handlerChangeDate={updateDataPiker} />

          <SelectOption readOnly={false} name={'register'} defaultValue={'register'} type={'status'} changeOptinValue={updateOptionData}
            data={[
              { id: 0, status: 'all' },
              { id: 1, status: 'guest' },
              { id: 2, status: 'google' },
              { id: 3, status: 'phone' }
            ]}
          />

          <SelectOption readOnly={false} name={'online'} defaultValue={'off or online users'} type={'status'} changeOptinValue={updateOptionData}
            data={[
              { id: 0, status: 'offline users' },
              { id: 1, status: 'online users' },
              { id: 2, status: 'offline and online users' }
            ]}
          />

          <SelectOption readOnly={false} name={'unfinishedGame'} defaultValue={'all users'} type={'status'} changeOptinValue={updateOptionData}
            data={[
              { id: 0, status: 'all users' },
              { id: 1, status: 'createdat' },
              { id: 2, status: 'online' },
              { id: 3, status: 'unfinished games' }
            ]}
          />

          <SelectOption readOnly={false} name={'sortBy'} defaultValue={'createdat'} type={'status'} changeOptinValue={updateOptionData}
            data={[
              { id: 0, status: 'bot' },
              { id: 1, status: 'createdat' },
              { id: 2, status: 'online' },
              { id: 3, status: 'unfinished games' }
            ]}
          />

          <SelectOption readOnly={false} name={'order'} defaultValue={'ASC'} type={'status'} changeOptinValue={updateOptionData}
            data={[
              { id: 0, status: 'ASC' },
              { id: 1, status: 'DESC' },
            ]}
          />

          <SelectOption classnameBox={'filerinput'} readOnly={false} value={filters.limit} name={'limit'} defaultValue={'20'} type={'status'} changeOptinValue={updateOptionData}
            data={[
              { id: 30, status: 30 },
              { id: 40, status: 40 },
              { id: 50, status: 50 },
              { id: 60, status: 60 },
            ]}
          />
          
          <Button title={'Filters'} className={'filtersBtn'} classnameBtn={'filtersBtnBox'} btnhandler={filtershandler} />


          <div className="resetFillters" onClick={resetFillters}>
            <HiOutlineTrash />
          </div>
        </div>

        <div className="banuser" onClick={handelOpenModal}>
          <HiMiniArrowUpTray className='icon' />
          <div>Export</div>
        </div>

        <div className="banuser" onClick={handelOpenModal}>
          <HiUserMinus className='icon' />
          <div>Ban user</div>
        </div>
      </div>


      <Table data={userList} sort={sortUserList} action={true} showDetail={showDetailBanUser} />



      {modal === true ?
        <ModalBanUser canceladd={() => setModal(false)} />
        : ''}
    </div>
  );
}

export default Index;
