import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Table from '../../../../../layout/Table/Table';

function Details() {
  const [detail, setDetail] = useState(null);
  const { id } = useParams()

  useEffect(() => {
    axios.get(`/admin-stuff/get-bundle/${id}`)
      .then(res => {
        setDetail(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  console.log(detail)

  return (
    <div>
      <Table data={detail}/>
    </div>
  );
}

export default Details;
