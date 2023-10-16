import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {tableHeadUsers} from '../../../Data/Sort';
import './Users.scss';

function Index() {
  const [users, setUsers] = useState(null)
  useEffect(()=>{
    axios.get('https://retoolapi.dev/1LU0ue/data').then(res => setUsers(res.data)).catch( res => res.error)
  })

  return (
    <div className='users'>
      <table>
          <thead>
              <tr>{users === null ? '' : Object.keys(users[0]).map((item)=>(
                <th>{item}</th>
              ))}</tr>
          </thead>
          <tbody>
            {/* {console.log(users)} */}
              {users === null ? '' : users.map((user, k)=>(
                <tr key={k}>{Object.values(user).map((item, index)=>(
                  <td key={index}>{item}</td>
                ))}</tr>
              ))}
          </tbody>
      </table>
    </div>
  );
}

export default Index;
