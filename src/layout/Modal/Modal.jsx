import React, { useEffect, useState } from 'react';
import ButtonActionRed from '../../Components/ButtonActionRed/ButtonActionRed';
import ButtonActionGreen from '../../Components/ButtonActionGreen/ButtonActionGreen';
import Input from '../../Components/Input/Input';
import SelectOption from '../../Components/SelectOption/SelectOption';
import './Modal.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '../Alert/Alert';
import Prices from '../Prices/Prices';
import Time from '../Time/Time';

function Modal(props) {

  //! props => modalTitle , data

  const [data, setData] = useState(null);
  const [addBandel, setBandel] = useState(null);
  const [showAlert, setShowAlert] = useState({
    status: false, msg: ''
  })
  const [addElement, setAddElement] = useState({
    prices: [{ type: 0, amount: 5 }]
  })
  const navigate = useNavigate();

  // useEffect(() => {
  //   setData(props.data)
  // }, [props])

  // useEffect(() => {
  //   axios.post('/admin-stuff/create-stuff', {
  //     stuffType: addElement.stuffType === null || addElement.stuffType === undefined ? '' : parseInt(addElement.stuffType),
  //     name: addElement.name === null || addElement.name === undefined ? '' : addElement.name,
  //     sku: addElement.sku === null || addElement.sku === undefined ? '' : addElement.sku,
  //     amount: addElement.amount === null || addElement.amount === undefined ? '' : parseInt(addElement.amount),
  //     image: addElement.image === null || addElement.image === undefined ? '' : addElement.image,
  //     expireTime: addElement.expireTime === null || addElement.expireTime === undefined ? '' : addElement.expireTime,
  //     status: addElement.status === null || addElement.status === undefined ? '' : parseInt(addElement.status),
  //     category: addElement.category === null || addElement.category === undefined ? '' : parseInt(addElement.category),
  //     gameId: addElement.gameId === null || addElement.gameId === undefined ? '' : parseInt(addElement.gameId),
  //     type: addElement.type === null || addElement.type === undefined ? '' : parseInt(addElement.type),
  //     tier: addElement.tier === null || addElement.tier === undefined ? '' : parseInt(addElement.tier),
  //     activityIntervalTime: {}
  //   })
  //     .then(
  //       res => {
  //         setBandel(res.data.dat)
  //         // console.log(res)
  //       }
  //     )
  //     .catch(
  //       err => {
  //         console.log(err)
  //       }
  //     )
  // })

  const handlerClose = (e) => {
    props.handlerClose()
  }

  // const handlerClose = (e) => {
  //   navigate("./")
  // }

  const handlerSubmit = () => {



    axios.post('/admin-stuff/create-stuff', addElement)
      .then(
        res => {
          setBandel(res.data.dat)
        }
      )
      .catch(
        err => {
          console.log(err.message)

          setShowAlert({ status: true, msg: err.message })
          setTimeout(() => {
            setShowAlert({ status: false, msg: err.message })
            
          }, 3000)
        }
      )
  }




  const updateInputData = (e) => {
    if (e.target.type === 'number') {
      setAddElement((prev) => ({ ...prev, [e.target.name]: parseInt(e.target.value) }))
    } else {
      setAddElement((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
  }

  const updateOptionData = (name, id) => {
    setAddElement((prev) => ({ ...prev, [name]: parseInt(id) }))

    props.type === "item" ?
      setAddElement((prev) => ({ ...prev, ['stuffType']: 2 }))
      :
      ''
  }

  return (
    <div className='modal'>
      {showAlert.status === true ?
        <Alert message={showAlert.msg} />
        :
        ''
      }
      <div className='main'>

        <div className='titleModal'>
          {props.modalTitle}
        </div>

        <div className='mainModal row'>
          {
            props.type === 'bundle' ?
              <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <SelectOption classnameBox={'control'} name={'stuffType'} defaultValue={'stuffType'} type={'status'} changeOptinValue={updateOptionData}
                  data={[
                    { id: 0, status: 'Gem bundle' },
                    { id: 1, status: 'Coin bundle' }
                  ]}
                />
              </div>
              :
              ''
          }

          <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <Input classname={'controlinput'} type={'text'} name={'name'} title={'name'} changeInputValue={updateInputData} />
          </div>

          <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <Input classname={'controlinput'} name={"sku"} type={'text'} title={'sku'} changeInputValue={updateInputData} />
          </div>

          <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <Input classname={'controlinput'} name={'amount'} type={'number'} title={'amount'} changeInputValue={updateInputData} />
          </div>

          <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <Input classname={'controlinput'} name={'image'} type={'text'} title={'image'} changeInputValue={updateInputData} />
          </div>

          <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <SelectOption classnameBox={'control'} name={'tier'} defaultValue={'tier'} type={'status'} changeOptinValue={updateOptionData}
              data={[
                { id: 0, status: 'DEFAULT' },
                { id: 1, status: 'COMMON' },
                { id: 2, status: 'RARE' },
                { id: 3, status: 'EPIC' },
                { id: 4, status: 'LEGENDARY' }
              ]}
            />
          </div>

          <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <Input classname={'controlinput'} name={'expireTime'} type={'date'} title={'expireTime'} changeInputValue={updateInputData} />
          </div>

          <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <SelectOption classnameBox={'control'} name={'type'} defaultValue={'type'} type={'status'} changeOptinValue={updateOptionData}
              data={[
                { id: 0, status: 'CLOTHES' },
                { id: 1, status: 'FACE' },
                { id: 2, status: 'HAIR' },
                { id: 3, status: 'BEARD' },
                { id: 4, status: 'EYE' },
                { id: 5, status: 'EYEBROWS' },
                { id: 6, status: 'GLASESS' },
                { id: 7, status: 'MASK' },
                { id: 8, status: 'HAT' },
                { id: 9, status: 'DICE SKIN' },
                { id: 10, status: 'CARD SKIN' },
                { id: 11, status: 'FLAG SKIN' },
                { id: 12, status: 'FORMATION' }
              ]}
            />
          </div>

          <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <SelectOption classnameBox={'control'} name={'category'} defaultValue={'category'} type={'status'} changeOptinValue={updateOptionData}
              data={[
                { id: 0, status: 'ELSE' },
                { id: 1, status: 'GAME' },
                { id: 2, status: 'CHARACTER' }
              ]}
            />
          </div>

          <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <SelectOption classnameBox={'control'} name={'gameId'} defaultValue={'Game'} type={'status'} changeOptinValue={updateOptionData}
              data={[
                { id: 0, status: 'Ludo' },
                { id: 1, status: 'Uno' },
                { id: 2, status: 'Backgammon ' },
                { id: 3, status: 'Soccer' },
                { id: 4, status: 'Yadzy' },
              ]}
            />
          </div>

          <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <SelectOption classnameBox={'control'} name={'status'} defaultValue={'Status'} type={'status'} changeOptinValue={updateOptionData}
              data={[
                { id: 0, status: 'Active' },
                { id: 1, status: 'Deactive' }
              ]}
            />
          </div>



          <div className='priceBox col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12'>
              <Prices priceSlect={updateOptionData} priceInput={updateInputData}/>
          </div>

          <div className='priceBox col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12'>
              {/* <Time timeInput={updateInputData}/> */}
          </div>

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
    </div >

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