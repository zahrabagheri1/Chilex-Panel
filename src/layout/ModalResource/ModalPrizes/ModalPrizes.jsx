import React, { useState } from 'react';
import './ModalPrizes.scss';
import axios from 'axios';
import Input from '../../../Components/Input/Input';
import SelectOption from '../../../Components/SelectOption/SelectOption';
import ButtonActionBlue from '../../../Components/ButtonActionBlue/ButtonActionBlue';
import Alert from '../../Alert/Alert';
import ButtonActionGray from '../../../Components/ButtonActionGray/ButtonActionGray';
import { useCookies } from 'react-cookie';
import { API_URL }  from '../../../API_URL';

function ModalPrizes(props) {
  const [addPrize, setAddPrize] = useState({
    settingId: parseInt(props.settingId),
    type: 1
  })
  const [cookies] = useCookies(['accessToken']);
  const [showAlert, setShowAlert] = useState({
    status: false, msg: '', success: null
  })

  const resourceType = [
    { id: 0, name: 'Gem' },
    { id: 1, name: 'coin' },
    { id: 2, name: 'cup' },
    { id: 3, name: 'xp' },
  ]

  const changeValueInput = (e) => {
    setAddPrize(prev => ({ ...prev, [e.target.name]: parseInt(e.target.value) }))
  }

  const updateOptionData = (name, id) => {
    setAddPrize(prev => ({ ...prev, [name]: parseInt(id) }))
  }


  const sendData = () => {
    axios.post(`${API_URL === undefined ? '' : API_URL}/games/setting/prize`, addPrize,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.accessToken
        }
      })
      .then(
        res => {
          // show alert that new setting prize creatting.
          setShowAlert({ status: true, msg: 'Created Prize succesful', success: true })
          setTimeout(() => {
            setShowAlert({ status: false })
            setTimeout(() => {
              props.canceladd()
            }, 0)
          }, 2000)
          props.onchange()
        }
      ).catch(
        err => {
          setShowAlert({ status: true, msg: err.response.data.message, success: false })
          setTimeout(() => {
            setShowAlert({ status: false })
          }, 2000)
        }
      )
  }

  return (
    <div className='modalPrizes'>
      {showAlert.status === true ?
        <Alert message={showAlert.msg} success={showAlert.success} />
        :
        ''
      }
      <div className="modalPrizesMain">
        <div className="modalPrizesTitle">Add New Prize</div>

        <div className="row">
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <Input type={'number'} inputclassname={'disabled'} name={'settingId'} value={addPrize.settingId} title={'settingId'} readOnly={true} changeInputValue={changeValueInput} />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <Input type={'number'} name={'amount'} important={true}  title={'amount'} readOnly={false} changeInputValue={changeValueInput} />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <SelectOption name={'type'} important={true} readOnly={false} defaultValue={'type'} type={'name'} data={resourceType} changeOptinValue={updateOptionData} />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <Input type={'number'} important={true} name={'rank'}  title={'rank'} readOnly={false} changeInputValue={changeValueInput} />
          </div>
        </div>

        <div className="modalPrizesBtn">
          <ButtonActionBlue title={'Add Prize'} handler={() => sendData()} />
          <ButtonActionGray title={'cancel'} handler={() => props.canceladd()} />
        </div>
      </div>
    </div >
  );
}

export default ModalPrizes;
