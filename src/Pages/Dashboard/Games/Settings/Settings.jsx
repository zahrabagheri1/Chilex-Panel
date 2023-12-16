import React, { useEffect, useState } from 'react';
import { HiPlus } from "react-icons/hi2";
import Button from '../../../../Components/Button/Button';
import SettingsCard from '../../../../Components/SettingsCard/SettingsCard';
import axios from 'axios';
import './Settings.scss';
import ModalSetting from '../../../../layout/ModalSetting/ModalSetting';

const props = {
  gameName: 'backgammon'
}

function Settings() {
  const [data, setData] = useState()
  const [openModal, setOpenModal] = useState()


  useEffect(() => {
    getSettings()
  }, [])

  const getSettings = () => {
    axios.get(`/games/settings/${props.gameName}`).then(
      res => {
        setData(res.data.data)
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

  return (
    <div className='settings'>
      <div className="addBox">
        <div className='addSetting' onClick={hundelOpenModal}>
          <HiPlus />
        </div>
      </div>
      <div className="row">
        {
          data?.map(card => (
            <div key={card.id} className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <SettingsCard data={card} getData={getSettings} gameName={props.gameName}/>
            </div>
          ))
        }
      </div>

      {openModal === true ? <ModalSetting canceladd={()=>setOpenModal(false)}/> : null}
    </div>
  );
}

export default Settings;
