import React, { useEffect, useState } from 'react';
import './Items.scss';
import { HiPencilSquare } from "react-icons/hi2";
import Table from '../../../../layout/Table/Table';
import {sortItems} from '../../../../Data/Sort';
import axios from 'axios';

function Index() {
  const [items, setItems] = useState([]);

  useEffect(()=>{
    axios.post('/admin-stuff/items-all')
    .then((res)=>{
      // console.log(res.data.data)
      setItems(res.data.data)
    })
    .catch(
      err=>console.log(err)
    )
  },[])
  return (
    <div>
      <div>
        <HiPencilSquare/>
      </div>

      <Table data={items} sort={sortItems} action={true}/>
      
    </div>
  );
}

export default Index;
