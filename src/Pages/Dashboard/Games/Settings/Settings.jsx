import React, { useEffect, useState } from 'react';
import { HiPlus } from "react-icons/hi2";
import Button from '../../../../Components/Button/Button';
import SettingsCard from '../../../../Components/SettingsCard/SettingsCard';
import axios from 'axios';
import './Settings.scss';

const props = {
  gameName: 'ludo'
}

function Settings() {
  const [data, setData] = useState()

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

  const hundelOpenModal =()=>{

  }
  
  return (
    <div className='settings'>
      <div className='addBundle' onClick={hundelOpenModal}>
        <HiPlus className='icon' />
      </div>
      <div className="row">
        {
          [...Array(3)].map(card => (
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <SettingsCard />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Settings;
