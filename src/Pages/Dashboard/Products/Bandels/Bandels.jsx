import React, { useEffect, useState } from 'react';
import './Bandels.scss';
import Table from '../../../../layout/Table/Table';
import { sortBandels } from '../../../../Data/Sort';
import { HiPencilSquare } from "react-icons/hi2";
import axios from 'axios';
import ScrollContainer from 'react-indiana-drag-scroll';
import Modal from '../../../../layout/Modal/Modal';

function Index() {
  const [bandels, setBandels] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    axios.get('/admin-stuff/bundles-all')
      .then((res) => {
        console.log(res.data.data)
        setBandels(res.data.data)
        setModal(true)
      })
      .catch(err => console.log(err))
  }, [])


  const addBandelHandler = () => {
  }
  
  const handelOpenModal = () => {
    setModal(!modal)

  }
  const handlerCloseModal = () => {
    setModal(false)

  }

  return (
    <div className='bandels'>
      <ScrollContainer>
        <Table data={bandels} sort={sortBandels} action={true} />
      </ScrollContainer>

      <div className='addBandel' onClick={handelOpenModal}>
        <HiPencilSquare className='icon' />
      </div>


      {modal === true ?
        <div className="modalBandel">
          <Modal data={bandels} handelerOpen={handelOpenModal}  handlerClose={handlerCloseModal}/>
        </div>

        : ''
      }
    </div>
  );
}

export default Index;
