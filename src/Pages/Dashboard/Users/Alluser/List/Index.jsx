import React, { useContext, useEffect, useState } from 'react';
import Table from '../../../../../layout/Table/Table';
import axios from 'axios';
import { sortUserList } from '../../../../../Data/Sort';
import { useNavigate } from 'react-router-dom';
import { HiMiniArrowUpTray } from "react-icons/hi2";
import { RiUserForbidFill } from "react-icons/ri";
import { HiOutlineFilter } from "react-icons/hi";
import './List.scss';
import SelectOption from '../../../../../Components/SelectOption/SelectOption';
import Input from '../../../../../Components/Input/Input';
import ModalBanUser from '../../../../../layout/ModalBanUser/ModalBanUser';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../../Loading/LoadingContext';
import DatePikerFarsi from '../../../../../Components/DatePikerFarsi/DatePikerFarsi';
import { API_URL } from '../../../../../API_URL';
import { LoginContext } from '../../../../Login/LoginContext';
import ButtonActionBlue from '../../../../../Components/ButtonActionBlue/ButtonActionBlue';
import ButtonActionGray from '../../../../../Components/ButtonActionGray/ButtonActionGray';

function Index() {
  const [userList, setUserList] = useState()
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  const { loading, setLoading } = useContext(LoadingContext);
  const { goToLoginPage } = useContext(LoginContext);
  const [resetFlag, setResetFlag] = useState(false);
  const [filterBox, setFilterBox] = useState(false);
  const [exportBox, setExportBox] = useState(false)
  const [userIds, setUserIds] = useState([])
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    name: null,
    email: null,
    phone: null,
    ban: 0,
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
    order: 0,
    exportUserIds: false
  })


  const resetFillters = () => {
    setFilters({
      name: null,
      email: null,
      phone: null,
      ban: 0,
      // createdAt:  moment(dateNow).format('YYYY-M-D'),
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
    setFilterBox(false)
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

  const offsetTableHandler = (page) => {
    setFilters((prev) => ({ ...prev, 'page': page }))
    setResetFlag(true)
  }

  const updateOptionDataForLimit = (name, id) => {
    setFilters((prev) => ({ ...prev, [name]: id, 'page': 1 }))
  }

  const exportUsers = () => {
    setExportBox(!exportBox)
    setFilters((prev) => ({ ...prev, ["exportUserIds"]: true }))
    setUserIds(userList.data[userList.data.length - 1].userIds)
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
    setFilterBox(false)
    axios.get(`${API_URL === undefined ? '' : API_URL}/admin/users?${filters.name === undefined || filters.name === null ? '' : 'name=' + filters.name + '&'}${filters.email === undefined || filters.email === null ? '' : 'email=' + filters.email + '&'}${filters.phone === undefined || filters.phone === null ? '' : 'phone=' + filters.phone + '&'}${filters.ban === undefined || filters.ban === null ? '' : 'ban=' + filters.ban + '&'}${filters.createdAt === undefined || filters.createdAt === null ? '' : 'createdAt=' + filters.createdAt + '&'}${filters.createdAtType === undefined || filters.createdAtType === null ? '' : 'createdAtType=' + filters.createdAtType + '&'}${filters.register === undefined || filters.register === null ? '' : 'register=' + filters.register + '&'}${filters.inviteBy === undefined || filters.inviteBy === null ? '' : 'inviteBy=' + filters.inviteBy + '&'}${filters.lastOnline === undefined || filters.lastOnline === null ? '' : 'lastOnline=' + filters.lastOnline + '&'}${filters.limit === undefined || filters.limit === null ? '' : 'limit=' + filters.limit + '&'}${filters.online === undefined || filters.online === null ? '' : 'online=' + filters.online + '&'}${filters.unfinishedGame === undefined || filters.unfinishedGame === null ? '' : 'unfinishedGame=' + filters.unfinishedGame + '&'}${filters.page === undefined || filters.page === null ? '' : 'page=' + filters.page + '&'}${filters.sortBy === undefined || filters.sortBy === null ? '' : 'sortBy=' + filters.sortBy + '&'}${filters.order === undefined || filters.order === null ? '' : 'order=' + filters.order + "&"}${filters.exportUserIds === null || filters.exportUserIds === undefined ? '' : 'exportUserIds=' + filters.exportUserIds}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.accessToken
        }
      })
      .then(
        res => {
          setUserList(res.data)
          setLoading(false)
        }
      )
      .catch(
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

  return (
    <div className='userList'>
      <div className="top">
        <div className="filterBox">
          <div className='filterBtn' onClick={() => setFilterBox(!filterBox)}>
            <HiOutlineFilter className='icon' />
            <div>Filter</div>
          </div>

          <div className={`filter row ${filterBox ? 'activeFilter' : ''}`}>
            <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
              <Input type={'text'} placeholder={'name...'} title={"name"} name={'name'} changeInputValue={updateInputData} />
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
              <Input type={'text'} placeholder={'email...'} title={"email"} name={'email'} changeInputValue={updateInputData} />
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
              <Input type={'text'} placeholder={'phone...'} title={"phone"} name={'phone'} changeInputValue={updateInputData} />
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
              <SelectOption readOnly={false} name={'ban'} title={"Ban users"} defaultValue={'all users'} type={'status'} changeOptinValue={updateOptionData}
                data={[
                  { id: 0, status: 'all users' },
                  { id: 1, status: 'ban users' }
                ]}
              />
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
              <DatePikerFarsi value={Date.now()} title={'lastOnline'} name={'lastOnline'} handlerChangeDate={updateDataPiker} />
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
              <SelectOption readOnly={false} name={'register'} title={'register'} defaultValue={'register'} type={'status'} changeOptinValue={updateOptionData}
                data={[
                  { id: 0, status: 'all' },
                  { id: 1, status: 'guest' },
                  { id: 2, status: 'google' },
                  { id: 3, status: 'phone' }
                ]}
              />

            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
              <SelectOption readOnly={false} name={'online'} title={'online'} defaultValue={'offline and online users'} type={'status'} changeOptinValue={updateOptionData}
                data={[
                  { id: 0, status: 'offline users' },
                  { id: 1, status: 'online users' },
                  { id: 2, status: 'offline and online users' }
                ]}
              />
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
              <SelectOption readOnly={false} name={'unfinishedGame'} title={'unfinishedGame'} defaultValue={'all users'} type={'status'} changeOptinValue={updateOptionData}
                data={[
                  { id: 0, status: 'all users' },
                  { id: 1, status: 'createdat' },
                  { id: 2, status: 'online' },
                  { id: 3, status: 'unfinished games' }
                ]}
              />
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">

              <SelectOption readOnly={false} name={'sortBy'} title={'sortBy'} defaultValue={'createdat'} type={'status'} changeOptinValue={updateOptionData}
                data={[
                  { id: 0, status: 'bot' },
                  { id: 1, status: 'createdat' },
                  { id: 2, status: 'online' },
                  { id: 3, status: 'unfinished games' }
                ]}
              />
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
              <SelectOption readOnly={false} name={'order'} title={'orderBy'} defaultValue={'ASC'} type={'status'} changeOptinValue={updateOptionData}
                data={[
                  { id: 0, status: 'ASC' },
                  { id: 1, status: 'DESC' },
                ]}
              />

            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
              <SelectOption readOnly={false} value={filters.limit} title={'limit'} name={'limit'} defaultValue={'20'} type={'status'} changeOptinValue={updateOptionDataForLimit}
                data={[
                  { id: 15, status: 15 },
                  { id: 20, status: 20 },
                  { id: 40, status: 40 },
                  { id: 60, status: 60 },
                  { id: 80, status: 80 },
                  { id: 100, status: 100 },
                ]}
              />
            </div>

            <div className="filterResetBtn col-xl-12 col-lg-12 col-md-12 col-ms-12 col-xs-12">
              <ButtonActionBlue title={'Filter'} classnameBtn={'filterBtnBox'} handler={banUser} />
              <ButtonActionGray title={'Reset Filter'} classnameBtn={'filterBtnBox'} handler={resetFillters} />
            </div>
          </div>
        </div>

        <div className="exportBtnBox">
          <div className='exportBtn' onClick={exportUsers}>
            <HiMiniArrowUpTray className='icon' />
            <div>Export</div>
          </div>

          <div className={`export ${exportBox ? 'activeExport' : ''}`}>
            <div className="data-title">All User Ids</div>
            <textarea className="data-text" name="" id="" value={userIds} ></textarea>
          </div>
        </div>

        <ModalBanUser />

      </div>


      <Table data={userList?.data} sort={sortUserList} list={userList} offsetTable={offsetTableHandler} action={true} pagintion={userList?.total_pages} showDetail={showDetailBanUser} />
    </div>
  );
}

export default Index;
