import React, { useEffect, useState } from 'react';
import './Bandels.scss';
import Table from '../../../../layout/Table/Table';
import {sortBandels} from '../../../../Data/Sort';
import axios from 'axios';

function Index() {
  const [bandels, setBandels] = useState();
  useEffect(()=>{
    axios.post('/admin-stuff/bundles-all')
    .then((res)=>{
      console.log(res.data.data)
      setBandels(res.data.data)
    })
    .catch(err => console.log(err))
  },[])

  return (
    <div>
      <Table data={bandels} sort={sortBandels} action={true}/>
    </div>
  );
}

export default Index;
