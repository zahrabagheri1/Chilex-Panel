import React, { useEffect, useState } from 'react';
import './Bundle.scss';
import Table from '../../../../../layout/Table/Table';
import { sortBundles } from '../../../../../Data/Sort';
import { HiPlus } from "react-icons/hi2";
import axios from 'axios';
import ScrollContainer from 'react-indiana-drag-scroll';
import Modal from '../../../../../layout/Modal/Modal';
import { useNavigate, useParams } from 'react-router-dom';


function Bundle() {
    const [bundles, setBundles] = useState([]);
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    
  
    useEffect(() => {
      axios.get('/admin-stuff/bundles-all')
        .then((res) => {
          // console.log(res.data.data)
          setBundles(res.data.data)
        })
        .catch(err => console.log(err))
    }, [])
  
    const showDetailBandle =(id)=>{
      navigate(`${id}`)
    }
  
    const hundelOpenModal = () => {
      setModal(true)
    }
    const handlerCloseModal = () => {
      setModal(false)
    }
  
  return (
    <div className='bundles'>
      <div className='top'>
        
        <div className='filter'>
        </div>

        <div className='addBundle' onClick={hundelOpenModal}>
          <HiPlus className='icon' />
        </div>
      </div>

      <ScrollContainer>
        <Table data={bundles} sort={sortBundles} action={true} showDetail={showDetailBandle}  />
      </ScrollContainer>

      {modal === true ?
        <div className="modalBundle">
          <Modal 
            modalTitle={'Add New Bandle'} 
            data={bundles}
            path={'bundles'} 
            hundelerSubmit={hundelOpenModal} 
            handlerClose={handlerCloseModal}
          />
        </div>
        : ''
      }
    </div>
  );
}

export default Bundle;
