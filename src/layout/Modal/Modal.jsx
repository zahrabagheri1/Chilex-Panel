import React, { useEffect, useState } from 'react';
import ButtonActionRed from '../../Components/ButtonActionRed/ButtonActionRed';
import ButtonActionGreen from '../../Components/ButtonActionGreen/ButtonActionGreen';
import Input from '../../Components/Input/Input';
import SelectOption from '../../Components/SelectOption/SelectOption';
import './Modal.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Modal(props) {

  //! props => modalTitle , data

  const [data, setData] = useState(null);
  const [addBandel, setBandel] = useState(null);
  const [value, setValue] = useState(null);
  const navigate = useNavigate();
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

  // const handlerClose = (e) => {
  //   navigate("./")
  // }

  const handlerSubmit = () => {

  }


  const changeName = () => {}
  const changeSku = () => {}
  const changeAmout = () => {}
  const changeImage = () => {}
  const changeExpireTime = () => {}

  return (
    <div className='modal'>
      <div className='main'>

        <div className='titleModal'>
          {props.modalTitle}
        </div>

        <div className='mainModal'>
          <SelectOption classname={'control'} value={value} name={'stuffType'} defaultValue={'Type'} type={'bundle'}
            data={[
              { id: 0, bundle: 'Gem bundle' },
              { id: 1, bundle: 'Coin bundle' },
              { id: 2, bundle: 'Item' }
            ]}
          />

          <Input classname={'controlinput'} value={value} type={'text'} title={'name'} changeInputValue={changeName} />

          <Input classname={'controlinput'} value={value} type={'text'} title={'sku'} changeInputValue={changeSku} />

          <Input classname={'controlinput'} value={value} type={'text'} title={'amount'} changeInputValue={changeAmout} />

          <Input classname={'controlinput'} value={value} type={'url'} title={'image'} changeInputValue={changeImage} />

          <SelectOption classname={'control'} value={value} name={'prices'} defaultValue={'Price'} type={'status'}
            data={[
              { id: 0, status: 'Gem' },
              { id: 1, status: 'Coin' },
              { id: 2, status: 'Rial' },
            ]}
          />

          <Input classname={'controlinput'} value={value} type={'date'} title={'ExpireTime'} changeInputValue={changeExpireTime} />


          <SelectOption classname={'control'} value={value} name={'gameId'} defaultValue={'Game'} type={'status'}
            data={[
              { id: 0, status: 'Ludo' },
              { id: 1, status: 'Uno' },
              { id: 2, status: 'Backgammon ' },
              { id: 3, status: 'Soccer' },
              { id: 4, status: 'Yadzy' },
            ]}
          />

          <SelectOption classname={'control'} value={value} name={'status'} defaultValue={'Status'} type={'status'}
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