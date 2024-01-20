import React, { useContext, useEffect, useState } from 'react';
import { HiPlus, HiChevronLeft } from "react-icons/hi2";
import SettingsCard from '../../../../Components/SettingsCard/SettingsCard';
import axios from 'axios';
import './Settings.scss';
import ModalSetting from '../../../../layout/ModalSetting/ModalSetting';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../Loading/LoadingContext';
import { LoginContext } from '../../../Login/LoginContext';
import API_URL from '../../../../API_URL';

const props = {
  gameName: 'backgammon'
}

function Settings() {
  const [data, setData] = useState()
  const [cookies] = useCookies(['accessToken']);
  const [openModal, setOpenModal] = useState()
  const { loading, setLoading } = useContext(LoadingContext);
  const { goToLoginPage } = useContext(LoginContext);
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    goToLoginPage(cookies.accessToken);
    getSettings()
  }, [])

  const getSettings = () => {
    setLoading(!loading)
    axios.get(API_URL + `/games/settings/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.accessToken
        }
      }
    )
      .then(
        res => {
          setData(res.data.data)
          setLoading(loading)
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
  }

  const hundelOpenModal = () => {
    setOpenModal(true)
  }
  const hundelBack = () => {
    navigate(-1)
  }

  return (
    <div className='settings'>
      <div className="addBox">
        <div className='backSetting' onClick={hundelBack}>
          <HiChevronLeft />
        </div>
        <div className="titleSetting">Game Settings</div>
        <div className='addSetting' onClick={hundelOpenModal}>
          <HiPlus />
        </div>
      </div>
      <div className="row">
        {
          data?.map(card => (
            <div key={card.id} className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <SettingsCard data={card} getData={getSettings} gameName={id} />
            </div>
          ))
        }
      </div>

      {/* what is "id"? id is the name og game that we need it to show in other component */}
      {openModal === true ? <ModalSetting gameName={id} canceladd={() => setOpenModal(false)} /> : null}

    </div>
  );
}

export default Settings;
