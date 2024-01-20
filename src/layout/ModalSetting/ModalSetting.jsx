import React, { useEffect, useState } from 'react';
import './ModalSetting.scss';
import axios from 'axios';
import Input from '../../Components/Input/Input';
import SelectOption from '../../Components/SelectOption/SelectOption';
import ButtonActionBlue from '../../Components/ButtonActionBlue/ButtonActionBlue';
import ButtonActionGray from '../../Components/ButtonActionGray/ButtonActionGray';
import Alert from '../Alert/Alert';
import { useCookies } from 'react-cookie';
import API_URL from '../../API_URL';

function ModalSetting(props) {
  const [cookies] = useCookies(['accessToken']);
  const [addSetting, setAddSetting] = useState({ game: props.gameName})
  const [error, setError] = useState()
  const [showAlert, setShowAlert] = useState({
    status: false, msg: '', success: null
  })

  const handlerSubmit = () => (
    axios.post(API_URL + `/games/setting`, addSetting,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.accessToken
        }
      })
      .then(
        res => {
          // show alert that new setting creatting.
          setShowAlert({ status: true, msg: res.statusText, success: true })
          setTimeout(() => {
            setShowAlert({ status: false })
            setTimeout(() => {
              props.canceladd()
            }, 0)
          }, 3000)
        }
      )
      .catch(
        err => {
          console.log(err)
          setShowAlert({ status: true, msg: err.message + ".   Filling the blank", success: false })
          setTimeout(() => {
            setShowAlert({ status: false })

          }, 4000)
        }
      )
  )

  const updateInputData = (e) => {
    setAddSetting((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const updateOptionData = (name, id) => {
   setAddSetting((prev) => ({ ...prev, [name]:  id })) 
  }

  const handlerClose = () => {
    props.canceladd()
  }
  
  useEffect(()=>{
    // props.gameName !== 'uno' || props.gameName !== 'ludo' ? setAddSetting((prev) => ({ ...prev, playersLength:  2 })): ''
  },)

  const botLevel = [{ id: 0, name: 'Easy' }, { id: 1, name: 'Medium' }, { id: 2, name: 'Hard' }]
  const playersLength = [{ id: 0, name: '2 Player' }, { id: 1, name: '3 Player' }, { id: 2, name: '4 Player' }]

  return (
    <div className='modalSetting'>

      {showAlert.status === true ?
        <Alert message={showAlert.msg} success={showAlert.success} />
        :
        ''
      }

      <div className='mainSetting'>
        <div className='titleModalSetting'>Add New Setting</div>
        <div className='row'>
          <div className="modalSettingNG col-xl-2 col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <div className='modalSettingNGTitle' >Game</div>
            <div className='modalSettingNGText' >{props.gameName}</div>
          </div>

          <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <Input name={'name'} type={'text'} title={'name'} changeInputValue={updateInputData} />
          </div>

          <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <SelectOption name={'botLevel'} readOnly={false} defaultValue={'botLevel'} value={'botLevel'} type={'name'} data={botLevel} changeOptinValue={updateOptionData} />
          </div>
          {
            props.gameName === 'uno' || props.gameName === 'ludo' ?
              <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <SelectOption name={'playersLength'} readOnly={false} defaultValue={'playersLength'} value={'playersLength'} type={'name'} data={playersLength} changeOptinValue={updateOptionData} />
              </div>
              : ''
          }

          <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <Input name={'description'} type={'text'} title={'description'} changeInputValue={updateInputData} />
          </div>

        </div>

        <div className='btns'>
          <div className='backbtn'>
            <ButtonActionGray title={'Cancel'} handler={handlerClose} />
          </div>

          <div className="acsseptbtn">
            <ButtonActionBlue title={'Submit'} handler={handlerSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalSetting;
