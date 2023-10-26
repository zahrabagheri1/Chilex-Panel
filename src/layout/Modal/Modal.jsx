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

  useEffect(() => {
    axios.post('/admin-stuff/create-stuff')
      .then(
        res => {
          setBandel(res.data.dat)
          // console.log(res)
        }
      )
      .catch(
        err => {
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
          <SelectOption value={value} name={'stuffType'} defaultValue={'Type'} type={'bandle'}
            data={[
              { id: 0, bandle: 'Gem Bandle' },
              { id: 1, bandle: 'Coin Bandle' },
              { id: 2, bandle: 'Item' }
            ]}
          />

          <Input value={value} type={'text'} title={'name'} />

          <Input value={value} type={'text'} title={'sku'} />

          <Input value={value} type={'text'} title={'amount'} />

          <Input value={value} type={'url'} title={'image'} />

          <SelectOption value={value} name={'prices'} defaultValue={'Price'} type={'status'}
            data={[
              { id: 0, status: 'Gem' },
              { id: 1, status: 'Coin' },
              { id: 2, status: 'Rial' },
            ]}
          />

          <Input value={value} type={'date'} title={'ExpireTime'} />


          <SelectOption value={value} name={'gameId'} defaultValue={'Game'} type={'status'}
            data={[
              { id: 0, status: 'Ludo' },
              { id: 1, status: 'Uno' },
              { id: 2, status: 'Backgammon ' },
              { id: 3, status: 'Soccer' },
              { id: 4, status: 'Yadzy' },
            ]}
          />

          <SelectOption value={value} name={'status'} defaultValue={'Status'} type={'status'}
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




{/* 
stuffType: number stuffType =>  gemBundle : 0 , coinBundle : 1 , Item : 2
name: string
amount: string
image: number
prices: [string]  
  prices: { type: enumPriceType, amount: number }[] , 
  type => GEM : 0 , COIN : 1 , RIAL : 2
expireTime: string
gameId: number
status: number  status => ACTIVE : 0 , DEACTIVE : 1
*/}