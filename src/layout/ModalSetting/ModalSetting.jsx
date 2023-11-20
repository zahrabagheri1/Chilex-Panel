import React, { useEffect } from 'react';
import './ModalSetting.scss';
import axios from 'axios';

function ModalSetting() {
  useEffect(()=>(
    axios.post(`/games/setting`).then().catch()
  ))
  return (
    <div>
      
    </div>
  );
}

export default ModalSetting;
