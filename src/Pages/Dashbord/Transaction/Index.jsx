import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from '../../../layout/Table/Table';

function Index() {
    const [Data, setData] = useState([]);
    useEffect(()=>{
        axios.get('/admin-transaction/all?limit=20&offset=1').then((res) =>{
            setData(res.data.data)
            // console.log(res.data)

        } ).catch(err=>{
            console.log(err)
        })
    },[])
  return (
    <div>
      <Table data={Data}/>
    </div>
  );
}

export default Index;
