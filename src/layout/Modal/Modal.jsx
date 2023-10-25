import React, { useEffect, useState } from 'react';
import ButtonActionRed from '../../Components/ButtonActionRed/ButtonActionRed';
import ButtonActionGreen from '../../Components/ButtonActionGreen/ButtonActionGreen';
import Input from '../../Components/Input/Input';
import SelectOption from '../../Components/SelectOption/SelectOption';
import './Modal.scss';
import axios from 'axios';

function Modal(props) {

  //! props => modalTitle , data

  const [data, setData] = useState(null);
  const [addBandel, setBandel] = useState(null);
  const [value, setValue] = useState(null)
  console.log(value)

  useEffect(() => {
    setData(props.data)
  }, [props])

  useEffect(()=>{
    axios.post('/admin-stuff/create-stuff')
    .then(
      res => {
        setBandel(res.data.dat)
        // console.log(res)
      }
    )
    .catch(
      err=> {
        console.log(err)
      }
    )
  })

  const handlerClose = (e) => {
    props.handlerClose()
  }

  const handlerSubmit = () => {

  }

  return (
    <div className='modal'>
      <div className='main'>

        <div className='titleModal'>
          {props.modalTitle}
        </div>

        <div className='mainModal'>
          <Input
            value={value}
            type={'number'}
            title={'limit'}
          />
          <SelectOption
            value={value}
            defaultValue={'bundleType'}
            type={'bandle'}
            data={[
              { id: 0, bandle: 'Gem Bandle' },
              { id: 1, bandle: 'Coin Bandle' }
            ]}
          />

          <SelectOption
            value={value}
            defaultValue={'bundleStatus'}
            type={'status'}
            data={[
              { id: 0, status: 'Active' },
              { id: 1, status: 'Deactive' }
            ]}
          />

          <SelectOption
            value={value}
            defaultValue={'priceStatus '}
            type={'status'}
            data={[
              { id: 0, status: 'Active' },
              { id: 1, status: 'Deactive' }
            ]}
          />
        </div>

        <div className='btns'>
          <div className='backbtn'>
            <ButtonActionRed title={'Back'} handler={handlerClose} />
          </div>

          <div className="acsseptbtn">
            <ButtonActionGreen title={'Submit'} handler={handlerSubmit} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Modal;
