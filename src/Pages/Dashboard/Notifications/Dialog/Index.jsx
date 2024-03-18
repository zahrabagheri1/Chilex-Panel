import React, { useContext, useEffect, useState } from 'react'
import Table from '../../../../layout/Table/Table'
import Input from '../../../../Components/Input/Input'
import AddDialog from './AddDialog/Index'
import { LoadingContext } from '../../../Loading/LoadingContext'
import { LoginContext } from '../../../Login/LoginContext'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { sortDialog } from '../../../../Data/Sort'
import { API_URL } from '../../../../API_URL'
import axios from 'axios'
import SelectOption from '../../../../Components/SelectOption/SelectOption'
import ButtonActionGray from '../../../../Components/ButtonActionGray/ButtonActionGray'
import ButtonActionBlue from '../../../../Components/ButtonActionBlue/ButtonActionBlue'
import './Dialog.scss'
import { HiOutlineFilter } from 'react-icons/hi'


function Index() {
  const [dialogList, setDialogList] = useState(null);
  const [modal, setModal] = useState(false);
  const [cookies] = useCookies(['accessToken']);
  const { loading, setLoading } = useContext(LoadingContext);
  const { goToLoginPage } = useContext(LoginContext);
  const navigate = useNavigate();
  const [resetFlag, setResetFlag] = useState(false);
  const [filterBox, setFilterBox] = useState(false);
  const [filters, setFilters] = useState({
    userId: null,
    limit: 15,
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
    setFilterBox(false)
    axios.get(`${API_URL === undefined ? '' : API_URL}/dialog?${filters.userId === null || filters.userId === undefined ? '' : 'userId=' + filters.userId + '&'}${filters.limit === null || filters.limit === undefined ? '' : 'limit=' + filters.limit + '&'}${filters.page === null || filters.page === undefined ? '' : 'page=' + filters.page}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.accessToken
        }
      })
      .then(
        res => {
          setDialogList(res.data)
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
      limit: 15,
      page: 1
    })
    setResetFlag(true)
  }

  const updateInputData = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const offsetTableHandler = (page) => {
    setFilters((prev) => ({ ...prev, 'offset': page }))
    setResetFlag(true)
  }

  const updateOptionDataForLimit = (name, id) => {
    setFilters((prev) => ({ ...prev, [name]: id, 'offset': 1 }))
  }

  return (
    <div className='dialogList'>
      <div className='top'>
        <div className="filterBox">
          <div className='filterBtn' onClick={() => setFilterBox(!filterBox)}>
            <HiOutlineFilter className='icon' />
            <div>Filter</div>
          </div>

          <div className={`filter row ${filterBox ? 'activeFilter' : ''}`}>
            <div className="col-xl-6 col-lg-6 col-md-6 col-ms-12 col-xs-12">
              <Input name={'userId'} type={'text'} placeholder={'userId...'} title={'userId'} value={filters.userId} changeInputValue={updateInputData} />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-ms-12 col-xs-12">
              <SelectOption readOnly={false} value={filters.limit} title={"limit"} name={'limit'} defaultValue={'15'} type={'status'} changeOptinValue={updateOptionDataForLimit}
                data={[
                  { id: 15, status: 15 },
                  { id: 20, status: 20 },
                  { id: 30, status: 30 },
                  { id: 40, status: 40 },
                  { id: 50, status: 50 },
                  { id: 60, status: 60 },
                ]}
              />
            </div>

            <div className="filterResetBtn col-xl-12 col-lg-12 col-md-12 col-ms-12 col-xs-12">
              <ButtonActionBlue title={'Filter'} classnameBtn={'filterBtnBox'} handler={reqDialog} />
              <ButtonActionGray title={'Reset Filter'} classnameBtn={'filterBtnBox'} handler={resetFillters} />
            </div>
          </div>
        </div>
        
        <AddDialog />
      </div>

      <Table data={dialogList?.data} sort={sortDialog} action={true} list={dialogList} offsetTable={offsetTableHandler} showDetailStatus={false} />

    </div>
  )
}

export default Index