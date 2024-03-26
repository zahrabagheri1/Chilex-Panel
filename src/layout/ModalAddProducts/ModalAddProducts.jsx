import React, { useEffect, useState } from 'react';
import ButtonActionGray from '../../Components/ButtonActionGray/ButtonActionGray';
import ButtonActionBlue from '../../Components/ButtonActionBlue/ButtonActionBlue';
import Input from '../../Components/Input/Input';
import SelectOption from '../../Components/SelectOption/SelectOption';
import './ModalAddProducts.scss';
import axios from 'axios';
import Alert from '../Alert/Alert';
import Prices from '../Prices/Prices';
import Time from '../Time/Time';
import { useCookies } from 'react-cookie';
import DatePikerFarsi from '../../Components/DatePikerFarsi/DatePikerFarsi';
import moment from 'moment-jalaali';

function ModalAddProducts(props) {
  const [showAlert, setShowAlert] = useState({
    status: false, msg: '', success: false
  })

  
  const [addElement, setAddElement] = useState({
    prices: [],
    stuffType: props.type === 'bundle' ? null : 2,
  })

      const [cookies, setCookies, removeCookie] = useCookies(['accessToken'])

  const handlerClose = (e) => {
    props.handlerClose()
  }

  const handlerSubmit = () => {
    axios.post('/admin-stuff/create-stuff', addElement,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.accessToken
        }
      })
      .then(
        res => {
          setShowAlert({ status: true, msg: res.statusText, success: true })
          setTimeout(() => {
            setShowAlert({ status: false, msg: res.statusText, success: true })

          }, 3000)
        }
      )
      .catch(
        err => {
          setShowAlert({ status: true, msg: err.response.data.message, success: false })
          setTimeout(() => {
            setShowAlert({ status: false, msg: err.response.data.message, success: false })

          }, 3000)
        }
      )
  }

  const addInputData = (e) => {
    if (e.target.type === 'number') {
      setAddElement((prev) => ({ ...prev, [e.target.name]: parseInt(e.target.value) }))
    } else {
      setAddElement((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
  }

  const addOptionData = (name, id) => {
    setAddElement((prev) => ({ ...prev, [name]: parseInt(id) }))
  }

  const addDataPiker = (e, title) => {
    setAddElement((prev) => ({ ...prev, [title]: e }))
  }

  const sendPriceAmute = (priceList) => {
    addElement.prices.push(priceList)
  }

  const sendActivityInteralTime = (timeList) => {
    setAddElement((prev) => ({ ...prev, ['activityIntervalTime']: timeList }))
  }

  return (
    <div className='modal'>
      {showAlert.status === true ?
        <Alert message={showAlert.msg} success={showAlert.success} />
        :
        ''
      }
      <div className='main'>

        <div className='titleModal'>
          {props.modalTitle}
        </div>

        <div className='mainModal row'>
          {/* StuffType */}
          {
            props.type === 'bundle' ?
              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-12">
                <SelectOption readOnly={false} title={'stuffType'}  name={'stuffType'} important={true} defaultValue={'stuffType'} type={'status'} changeOptinValue={addOptionData}
                  data={[
                    { id: 0, status: 'Gem bundle' },
                    { id: 1, status: 'Coin bundle' }
                  ]}
                />
              </div>
              :
              ''
          }

          {/* Name */}
          <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-12">
            <Input type={'text'} name={'name'} important={true} title={'name'} changeInputValue={addInputData} />
          </div>

          {/* Sku */}
          <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-12">
            <Input name={"sku"} type={'text'} important={true} title={'sku'} changeInputValue={addInputData} />
          </div>

          {/* Amount */}
          <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-12">
            <Input name={'amount'} type={'number'} title={'amount'} changeInputValue={addInputData} />
          </div>

          {/* Image */}
          <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-12">
            <Input name={'image'} type={'text'} title={'image'} changeInputValue={addInputData} />
          </div>

          {/* Tier */}
          <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-12">
            <SelectOption readOnly={false} title={'tier'}  name={'tier'} defaultValue={'tier'} type={'status'} changeOptinValue={addOptionData}
              data={[
                { id: 0, status: 'DEFAULT' },
                { id: 1, status: 'COMMON' },
                { id: 2, status: 'RARE' },
                { id: 3, status: 'EPIC' },
                { id: 4, status: 'LEGENDARY' }
              ]}
            />
          </div>

          {/* ExpireTime */}
          <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-12">
            <DatePikerFarsi classnamedatepicker={'controlDatePiker'} value={moment(Date.now()).format('jYYYY/jM/jD')} title={'expireTime'} handlerChangeDate={addDataPiker} />
          </div>

          {/* emoteItemType */}
          {
            props.type === 'item' ?
              // emoteItemType 
              <>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-12">
                  <SelectOption readOnly={false}  name={'emoteItemType'} title={'emoteItemType'}  defaultValue={'emoteItemType'} type={'status'} changeOptinValue={addOptionData}
                    data={[
                      { id: 0, status: 'Aninations' },
                    ]}
                  />
                </div>
                {/* Category */}
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-12">
                  <SelectOption readOnly={false} important={true} name={'category'} title={'category'}  defaultValue={'category'} type={'status'} changeOptinValue={addOptionData}
                    data={[
                      { id: 0, status: 'ELSE' },
                      { id: 1, status: 'GAME' },
                      { id: 2, status: 'CHARACTER' }
                    ]}
                  />
                </div>

                {/* characterItemType */}
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-12">
                  <SelectOption readOnly={false} name={'characterItemType'} defaultValue={'characterItemType'} title={'characterItemType'} type={'status'} changeOptinValue={addOptionData} disable={addElement.category === 2 ? false : true}
                    data={[
                      { id: 0, status: 'CLOTHES' },
                      { id: 1, status: 'FACE' },
                      { id: 2, status: 'HAIR' },
                      { id: 3, status: 'BEARD' },
                      { id: 4, status: 'EYE' },
                      { id: 5, status: 'EYEBROWS' },
                      { id: 6, status: 'GLASESS' },
                      { id: 7, status: 'MASK' },
                      { id: 8, status: 'HAT' }
                    ]}
                  />
                </div>

                {/* GameId */}
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-12">
                  <SelectOption readOnly={false} title={'gameId'}  name={'gameId'} defaultValue={'Game'} type={'status'} changeOptinValue={addOptionData} disable={addElement.category === 1 ? false : true}
                    data={[
                      { id: 0, status: 'Ludo' },
                      { id: 1, status: 'Uno' },
                      { id: 2, status: 'Backgammon ' },
                      { id: 3, status: 'Soccer' },
                      { id: 4, status: 'Yadzy' },
                    ]}
                  />
                </div>

                {/* gameItemType */}
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-12">
                  <SelectOption readOnly={false} title={'gameItemType'}  name={'gameItemType'} defaultValue={'gameItemType'} type={'status'} changeOptinValue={addOptionData} disable={addElement.category === 1 ? false : true}
                    data={[
                      { id: 0, status: 'DICE SKIN' },
                      { id: 1, status: 'CARD SKIN' },
                      { id: 2, status: 'FLAG SKIN' },
                      { id: 3, status: 'FORMATION' }
                    ]}
                  />
                </div>
              </>
              : ''
          }

          {/* DatasetId */}
          <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-12">
            <Input important={true} name={'datasetId'} type={'text'} title={'datasetId'} changeInputValue={addInputData} />
          </div>

          {/* DatasetGroup */}
          <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-12">
            <Input name={'datasetGroup'} type={'text'} title={'datasetGroup'} changeInputValue={addInputData} />
          </div>

          {/* status */}
          <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-12">
            <SelectOption readOnly={false} title={'status'}  name={'status'} important={true} defaultValue={'Status'} type={'status'} changeOptinValue={addOptionData}
              data={[
                { id: 0, status: 'Active' },
                { id: 1, status: 'Deactive' }
              ]}
            />
          </div>

          {/* Prices */}
          <div className='modalBoxs col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <Prices important={true} stuffType={addElement.stuffType} sendPrice={sendPriceAmute} />
          </div>

          {/* activityIntervalTime */}
          {
            props.type === 'bundle' ?
              <div className='modalBoxs col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                <Time active={true} important={true} sendTime={sendActivityInteralTime} />
              </div>
              : ''
          }

        </div>

        <div className='btns'>
          <div className='backbtn'>
            <ButtonActionGray title={'Back'} handler={handlerClose} />
          </div>

          <div className="acsseptbtn">
            <ButtonActionBlue title={'Submit'} handler={handlerSubmit} />
          </div>
        </div>

      </div>
    </div >

  );
}

export default ModalAddProducts;
