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
  const [filter, setFilter] = useState({
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
    limit: 15,
    online: 2,
    unfinishedGame: 0,
    page: 1,
    sortBy: 1,
    order: 0
  })

  const navigate = useNavigate()

  const resetFillters = () => {
    setFilter({
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
      limit: 15,
      online: 2,
      unfinishedGame: 0,
      page: 1,
      sortBy: 1,
      order: 0
    })
    setResetFlag(true);
  }

  const filterhandler = () => {
    banUser()
  }

  const updateOptionData = (name, id) => {
    setFilter((prev) => ({ ...prev, [name]: id }))
  }

  const updateInputData = (e) => {
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const showDetailBanUser = (id) => {
    navigate(`${id}`)
  }

  const updateDataPiker = (e, title) => {
    setFilter((prev) => ({ ...prev, [title]: e }))
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
    axios.get(`${API_URL === undefined ? '' : API_URL}/admin/users?${filter.name === undefined || filter.name === null ? '' : 'name=' + filter.name + '&'}${filter.email === undefined || filter.email === null ? '' : 'email=' + filter.email + '&'}${filter.phone === undefined || filter.phone === null ? '' : 'phone=' + filter.phone + '&'}${filter.ban === undefined || filter.ban === null ? '' : 'ban=' + filter.ban + '&'}${filter.createdAt === undefined || filter.createdAt === null ? '' : 'createdAt=' + filter.createdAt + '&'}${filter.createdAtType === undefined || filter.createdAtType === null ? '' : 'createdAtType=' + filter.createdAtType + '&'}${filter.register === undefined || filter.register === null ? '' : 'register=' + filter.register + '&'}${filter.inviteBy === undefined || filter.inviteBy === null ? '' : 'inviteBy=' + filter.inviteBy + '&'}${filter.lastOnline === undefined || filter.lastOnline === null ? '' : 'lastOnline=' + filter.lastOnline + '&'}${filter.limit === undefined || filter.limit === null ? '' : 'limit=' + filter.limit + '&'}${filter.online === undefined || filter.online === null ? '' : 'online=' + filter.online + '&'}${filter.unfinishedGame === undefined || filter.unfinishedGame === null ? '' : 'unfinishedGame=' + filter.unfinishedGame + '&'}${filter.page === undefined || filter.page === null ? '' : 'page=' + filter.page + '&'}${filter.sortBy === undefined || filter.sortBy === null ? '' : 'sortBy=' + filter.sortBy + '&'}${filter.order === undefined || filter.order === null ? '' : 'order=' + filter.order}`,
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
        <div className="filter">
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

          <Button title={'Filter'} className={'filterBtn'} classnameBtn={'filterBtnBox'} btnhandler={filterhandler} />


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
