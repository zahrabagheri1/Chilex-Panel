import React from 'react'
import './AlrtConnetion.scss'
import { FiWifi, FiWifiOff } from "react-icons/fi";

function AlrtConnetion(props) {
  console.log(props)
  return (
    <div className='disconnected'>
      <div className={`disconnectedWallpaper ${props.status ? '': 'offline'}`}>
        <div className="content">
          <div className="icon">
            {
              props.status ? <FiWifi /> : <FiWifiOff />
            }
          </div>
          {
            props.status ?
              <div className="details">
                <span>You're online now</span>
              </div>
              :
              <div className="details">
                <span>You're Offline</span>
              </div>
          }

        </div>
      </div>


    </div>
  )
}

export default AlrtConnetion