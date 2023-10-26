import React, { useEffect, useState } from 'react';
import './Bandels.scss';
import Table from '../../../../layout/Table/Table';
import { sortBandels } from '../../../../Data/Sort';
import { HiPlus } from "react-icons/hi2";
import axios from 'axios';
import ScrollContainer from 'react-indiana-drag-scroll';
import Modal from '../../../../layout/Modal/Modal';
import { Outlet } from 'react-router-dom';

function Index() {
  const [bandels, setBandels] = useState([]);
  const [modal, setModal] = useState(false);
  const [detailBandel, setDetailBandel] = useState(false);

  useEffect(() => {
    axios.get('/admin-stuff/bundles-all')
      .then((res) => {
        console.log(res.data.data)
        setBandels(res.data.data)
      })
      .catch(err => console.log(err))
  }, [])


  const showss = () => {
    setDetailBandel(true)
  }

  const handelOpenModal = () => {
    setModal(true)

  }
  const handlerCloseModal = () => {
    setModal(false)

  }

  return (
    <div className='bandels'>
      <div className='top'>

        <div className='filter'>
        </div>

        <div className='addBandel' onClick={handelOpenModal}>
          <HiPlus className='icon' />
        </div>
      </div>

      <ScrollContainer>
        <Table data={bandels} sort={sortBandels} action={true} showDetail={showss} />
      </ScrollContainer>


      {modal === true ?
        <div className="modalBandel">
          <Modal modalTitle={'Add New Bandle'} data={bandels} handelerSubmit={handelOpenModal} handlerClose={handlerCloseModal} />
        </div>

        : ''
      }


      {detailBandel === true ?
        <div>
          <Outlet/>
        </div>
        : ''}
    </div>
  );
}

export default Index;
