import axios from 'axios';
import React, { useEffect } from 'react';

function Setting() {
    
  const gameName ='uno'

  useEffect(()=>{
    getGameSetting()
  },[])
  
  const getGameSetting =()=>{
    axios.get(`/games/settings/${gameName}`)
    .then(
      res=>{
        console.log(res)
      }
    )
    .catch(
      err => {
        console.log(err)
      }
    )
  }

  return (
    <div className='setting'>
      
    </div>
  );
}

export default Setting;
