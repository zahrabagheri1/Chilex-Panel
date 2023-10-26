import React, { useEffect, useState } from 'react';
import './Bandel.scss';
import Table from '../../../../../layout/Table/Table';
import { sortBandels } from '../../../../../Data/Sort';
import { HiPlus } from "react-icons/hi2";
import axios from 'axios';
import ScrollContainer from 'react-indiana-drag-scroll';
import Modal from '../../../../../layout/Modal/Modal';
import { useNavigate, useParams } from 'react-router-dom';


function Bandel() {
    const [bandels, setBandels] = useState([]);
    const [modal, setModal] = useState(false);
    const [detailBandel, setDetailBandel] = useState(false);
  
    const navigation = useNavigate()
    const id = useParams()
  
    useEffect(() => {
      axios.get('/admin-stuff/bundles-all')
        .then((res) => {
          console.log(res.data.data)
          setBandels(res.data.data)
        })
        .catch(err => console.log(err))
    }, [])
  
    const showDetailBandle =()=>{
      navigation(`${id}`)
      console.log(id)
  
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
        <Table data={bandels} sort={sortBandels} action={true} showDetail={showDetailBandle}  />
      </ScrollContainer>


      {modal === true ?
        <div className="modalBandel">
          <Modal modalTitle={'Add New Bandle'} data={bandels} path={'bandels'} handelerSubmit={handelOpenModal} handlerClose={handlerCloseModal} />
        </div>

        : ''
      }
    </div>
  );
}

export default Bandel;
