import React, { useEffect, useState } from 'react';
import './ModalPrizes.scss';
import axios from 'axios';
import Input from '../../../Components/Input/Input';
import SelectOption from '../../../Components/SelectOption/SelectOption';
import ButtonActionBlue from '../../../Components/ButtonActionBlue/ButtonActionBlue';
import Alert from '../../Alert/Alert';
import ButtonActionGray from '../../../Components/ButtonActionGray/ButtonActionGray';

const settingId = 2


function ModalPrizes(props) {
  const [value, setValue] = useState()
  const [addPrize, setAddPrize] = useState({
    settingId: settingId
  })

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

  console.log(addPrize)

  const sendData = () => {
    axios.post(`/games/setting/prize`, addPrize)
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
          if (err.status === 400) {
            setShowAlert({ status: true, msg: 'Created Prize succesful', success: true })
            setTimeout(() => {
              setShowAlert({ status: false })
              setTimeout(() => {
                props.canceladd()
              }, 0)
            }, 2000)
          }

        }
      )
  }

  useEffect(() => {
    sendData()
  }, [])

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
            <Input type={'number'} inputclassname={'disabled'} name={'settingId'} value={settingId} title={'settingId'} readOnly={true} changeInputValue={changeValueInput} />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <Input type={'number'} name={'amount'} important={true} value={value} title={'amount'} readOnly={false} changeInputValue={changeValueInput} />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <SelectOption name={'type'} important={true} readOnly={false} defaultValue={'type'} type={'name'} data={resourceType} changeOptinValue={updateOptionData} />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <Input type={'number'} important={true} name={'rank'} value={value} title={'rank'} readOnly={false} changeInputValue={changeValueInput} />
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
