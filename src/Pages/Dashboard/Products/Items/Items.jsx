import React, { useEffect, useState } from 'react';
import './Items.scss';
import { HiPencilSquare } from "react-icons/hi2";
import Table from '../../../../layout/Table/Table';
import {sortItems} from '../../../../Data/Sort';
import axios from 'axios';

function Index() {
  const [items, setItems] = useState([]);

  console.log(items)
  const addItemHandler = ()=>{

  }

  useEffect(()=>{
    axios.get('/admin-stuff/items-all')
    .then((res)=>{
      // console.log(res.data.data)
      setItems(res.data.data)
    })
    // .catch(err => console.log(err))
  },[])
  
  return (
    <div className='items'>
      
      <div className='addItem' onClick={addItemHandler}>
        <HiPencilSquare className='icon'/>
      </div>


      <Table data={items} sort={sortItems} action={true}/>
      <div>
        
      </div>
    </div>
  );
}

export default Index;
