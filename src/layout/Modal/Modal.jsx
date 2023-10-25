import React, { useEffect, useState } from 'react';
import ButtonActionRed from '../../Components/ButtonActionRed/ButtonActionRed';
import ButtonActionGreen from '../../Components/ButtonActionGreen/ButtonActionGreen';
import Form from '../Form/Form';

import './Modal.scss';
import axios from 'axios';

function Modal(props) {

  const [data, setData] = useState(null);
  const [addBandel, setBandel] = useState(null);

  useEffect(() => {
    setData(props.data)
  }, [props])

  // useEffect(()=>{
  //   axios.post()
  //   .then(
  //     res => {
  //       setBandel(res.data.dat)
  //     }
  //   )
  //   .catch(
  //     err=> {
  //       console.log(err)
  //     }
  //   )
  // })

  const handlerClose = ()=>{
    // props.handlerClose()
  }

  const handlerSubmit = () =>{

  }

  return (
    <div className='modal'>
      <div className='main'>
        <div className='mainModal'>
          <Form/>
        </div>

        <div>
          <div className='backbtn'>
              <ButtonActionRed title={'Back'} handler={handlerClose}/>
          </div>

          <div className="acsseptbtn">
            <ButtonActionGreen title={'Submit'} handler={handlerSubmit}/>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Modal;
