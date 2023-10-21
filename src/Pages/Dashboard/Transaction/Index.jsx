import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from '../../../layout/Table/Table';
import { adminTransaction } from '../../../Data/Sort';
import { ScrollContainer } from 'react-indiana-drag-scroll';
import 'react-indiana-drag-scroll/dist/style.css'



function Index() {
  const [Data, setData] = useState([]);
  useEffect(() => {
    axios.post('/admin-transaction/all',
      {
        limit: parseInt(10),
        offset: parseInt(1)
      }).then((res) => {
        setData(res.data.data)
        console.log(res.data.data)

      }).catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <div>
      <ScrollContainer>
        <Table data={Data} sort={adminTransaction} action={true}/>
      </ScrollContainer>
    </div>
  );
}

export default Index;
