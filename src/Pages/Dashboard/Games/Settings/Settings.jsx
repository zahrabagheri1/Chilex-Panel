import React, { useEffect, useState } from 'react';
import Button from '../../../../Components/Button/Button';
import './Settings.scss';
import axios from 'axios';
import SettingsCard from '../../../../Components/SettingsCard/SettingsCard';

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

  return (
    <div className='settings'>
      <div className="row">
        {
          [...Array(3)].map(card => (
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <SettingsCard />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Settings;
