import React, { useEffect, useState } from 'react';
import './Admin.scss';
import axios from 'axios';

function Index() {
    const [data , setData] = useState(null);
    // console.log(data[0])
    useEffect(()=>{
        axios.get('https://retoolapi.dev/DQqY1W/data')
        .then(response => setData(response.data))
    },[])

  return (
    <div className='userPlatform'>
        { data === null ? '' : Object.entries(data[0]).map(([key, value, i])=>(
            <div className='iteme' key={i}>
                <div className='key'>{`${key}:`}</div>
                <div className='value'>{value}</div>
            </div>
        ))}
    </div>
  );
}

export default Index;
