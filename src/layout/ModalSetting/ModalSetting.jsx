import React, { useEffect, useState } from 'react';
import './ModalSetting.scss';
import axios from 'axios';
import Input from '../../Components/Input/Input';
import SelectOption from '../../Components/SelectOption/SelectOption';
import ButtonActionBlue from '../../Components/ButtonActionBlue/ButtonActionBlue';
import ButtonActionGray from '../../Components/ButtonActionGray/ButtonActionGray';
import Alert from '../Alert/Alert';

function ModalSetting(props) {
  const [data, setData] = useState()
  const [addSetting, setAddSetting] = useState({})
  const [error, setError] = useState()
  const [showAlert, setShowAlert] = useState({
    status: false, msg: '', success: null
  })

  const handlerSubmit = () => (
    axios.post(`/games/setting`, addSetting)
      .then(
        res => {
          setData(res.data)
          // show alert that new setting creatting.
          if (res.status < 300 && res.status >= 200) {
            setShowAlert({ status: true, msg: res.statusText, success: true })
            setTimeout(() => {
              setShowAlert({ status: false })
              setTimeout(() => {
                props.canceladd()
              }, 0)
            }, 3000)
      
          }

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
    setAddSetting((prev) => ({ ...prev, [name]: id }))
  }

  const handlerClose = () => {
    props.canceladd()
  }

  const botLevel = [{ id: 0, name: 'Easy' }, { id: 1, name: 'Medium' }, { id: 2, name: 'Hard' }]
  const game = [{ id: 0, name: 'ludo' }, { id: 1, name: 'uno' }, { id: 2, name: 'Backgammon' }, { id: 3, name: 'Soccer' }, { id: 4, name: 'Yadzy' }]
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
          <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <Input name={'name'} type={'text'} title={'name'} changeInputValue={updateInputData} />
          </div>

          <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <Input name={'game'} type={'text'} title={'game'} changeInputValue={updateInputData} />
          </div>
          {/* we have 5 games so i think it should be  work with id */}

          {/* <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <SelectOption name={'game'} readOnly={false} defaultValue={'game'} value={'value'} type={'name'} data={game} changeOptinValue={updateOptionData} />
          </div> */}

          <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <SelectOption name={'playersLength'} readOnly={false} defaultValue={'playersLength'} value={'playersLength'} type={'name'} data={playersLength} changeOptinValue={updateOptionData} />
          </div>

          <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <Input name={'description'} type={'text'} title={'description'} changeInputValue={updateInputData} />
          </div>

          <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <SelectOption name={'botLevel'} readOnly={false} defaultValue={'botLevel'} value={'botLevel'} type={'name'} data={botLevel} changeOptinValue={updateOptionData} />
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
