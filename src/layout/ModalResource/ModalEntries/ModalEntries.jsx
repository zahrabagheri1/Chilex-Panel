import React, { useEffect, useState } from 'react';
import './ModalEntries.scss';
import axios from 'axios';
import Input from '../../../Components/Input/Input';
import SelectOption from '../../../Components/SelectOption/SelectOption';
import ButtonActionBlue from '../../../Components/ButtonActionBlue/ButtonActionBlue';
import Alert from '../../Alert/Alert';
import ButtonActionGray from '../../../Components/ButtonActionGray/ButtonActionGray';
import { useCookies } from 'react-cookie';
import { API_URL } from '../../../API_URL';

function ModalEntries(props) {
  const [cookies] = useCookies(['accessToken']);
  const [addEntry, setAddEntry] = useState({
    settingId: parseInt(props.settingId)
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
    setAddEntry(prev => ({ ...prev, [e.target.name]: parseInt(e.target.value) }))
  }

  const updateOptionData = (name, id) => {
    setAddEntry(prev => ({ ...prev, [name]: parseInt(id) }))
  }

  const sendData = () => {
    axios.post(`${API_URL === undefined ? '' : API_URL}/games/setting/entry`, addEntry,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + cookies.accessToken
    }
    })
      .then(
        res => {
          // show alert that new setting entry creatting.
          setShowAlert({ status: true, msg: 'Created Entry succesful', success: true })
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

        }
      )
  }

  useEffect(() => {
    sendData()
  }, [])

  return (
    <div className='modalEntries'>
      {showAlert.status === true ?
        <Alert message={showAlert.msg} success={showAlert.success} />
        :
        ''
      }
      <div className="modalEntriesMain">
        <div className="modalEntriesTitle">Add New Entry</div>

        <div className="row">
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <Input type={'number'} inputclassname={'disabled'} name={'settingId'} value={addEntry.settingId} title={'settingId'} readOnly={true} changeInputValue={(e) => changeValueInput(e)} />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <Input type={'number'} important={true} name={'amount'} title={'amount'} value={''} readOnly={false} changeInputValue={changeValueInput} />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <SelectOption name={'type'} important={true} readOnly={false} defaultValue={'type'} type={'name'} data={resourceType} changeOptinValue={updateOptionData} />
          </div>
        </div>

        <div className="modalEntriesBtn">
          <ButtonActionBlue title={'Add Entry'} handler={() => sendData()} />
          <ButtonActionGray title={'cancel'} handler={() => props.canceladd()} />
        </div>
      </div>
    </div >
  );
}

export default ModalEntries;
