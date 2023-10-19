import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { tableHeadUsers } from '../../../Data/Sort';
import './Users.scss';
import Table from '../../../layout/Table/Table';
import ScrollContainer from 'react-indiana-drag-scroll';

function Index() {
  const [users, setUsers] = useState(null);
  // useEffect(() => {
  //   axios.get('https://retoolapi.dev/1LU0ue/data')
  //   .then(res => {
  //     setUsers(res.data)
  //     console.log(res.data)
  //   }
  //   ).catch(res =>{res.error})
  // })

  return (
    <div className='users'>
      {/* <ScrollContainer className="scroll-container"> */}
        {/* <Table data={users} /> */}
      {/* </ScrollContainer> */}
    </div>
  );
}

export default Index;
