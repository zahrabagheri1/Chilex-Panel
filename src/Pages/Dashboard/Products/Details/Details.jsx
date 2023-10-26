import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Details() {
  const [detail, setDetail] = useState(null);
  const { id } = useParams()

  useEffect(() => {
    axios.get(`/admin-stuff/get-bundle/${1}`)
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
      vvvvb vnbvbvnnnnnnnnnnnnnnnnnnn
    </div>
  );
}

export default Details;
