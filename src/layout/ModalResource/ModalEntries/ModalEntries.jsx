import React, { useEffect, useState } from 'react';
import './ModalEntries.scss';
import axios from 'axios';
import Input from '../../../Components/Input/Input';
import SelectOption from '../../../Components/SelectOption/SelectOption';
import ButtonActionBlue from '../../../Components/ButtonActionBlue/ButtonActionBlue';

const settingId = 2;

function ModalEntries(props) {
  const [value, setValue] = useState()
  const [addEntry, setAddEntry] = useState({
    settingId: settingId
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

  console.log(addEntry)

  const sendAndEditData = () => {
    axios.post(`/games/setting/entry`, addEntry)
      .then(
        res => {
          console.log(res.data)
        }
      ).catch(
        err => console.log(err)
      )
  }

  useEffect(() => {
    sendAndEditData()
  }, [])

  return (
    <div className='modalEntries'>
      <div className="modalEntriesMain">
        <div className="modalEntriesTitle">Add New Entry</div>

        <div className="row">
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <Input type={'number'} inputclassname={'disabled'} name={'settingId'} value={settingId} title={'settingId'} readOnly={true} changeInputValue={() => changeValueInput(settingId)} />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <Input type={'number'} important={true} name={'amount'} title={'amount'} value={''} readOnly={false} changeInputValue={changeValueInput} />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <SelectOption name={'type'} important={true} readOnly={false} defaultValue={'type'} type={'name'} data={resourceType} changeOptinValue={updateOptionData} />
          </div>
        </div>

        <div className="resourceBtn">
          <ButtonActionBlue title={'Add Entry'} handler={e => sendAndEditData(e)} />
        </div>
      </div>
    </div >
  );
}

export default ModalEntries;
