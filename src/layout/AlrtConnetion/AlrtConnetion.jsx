import React from 'react'
import './AlrtConnetion.scss'
import { FiWifi, FiWifiOff } from "react-icons/fi";

function AlrtConnetion(props) {
  return (
    <div className='disconnected'>
      <div class="disconnectedWallpaper offline">
        <div class="content">
          <div class="icon">
            {
              props.status ?
                <FiWifi />
                :
                <FiWifiOff />

            }
          </div>
          {
            props.status ?
              <div class="details">
                <span>You're online now</span>
                <p>Hurray! Internet is connected.</p>
              </div>
              :
              <div class="details">
                <span>You're Offline</span>
                <p>Sorry! Internet is disconnected.</p>
              </div>
          }

        </div>
      </div>


    </div>
  )
}

export default AlrtConnetion