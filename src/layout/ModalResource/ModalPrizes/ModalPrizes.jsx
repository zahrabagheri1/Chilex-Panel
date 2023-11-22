import React, { useEffect, useState } from 'react';
import './ModalPrizes.scss';
import axios from 'axios';
import Input from '../../../Components/Input/Input';
import SelectOption from '../../../Components/SelectOption/SelectOption';
import ButtonActionGreen from '../../../Components/ButtonActionGreen/ButtonActionGreen';

const settingId = 2


function ModalPrizes() {
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
    axios.get(`/games/setting/prize`, addEntry)
      .then(
        res => {
          console.log(res)
        }
      ).catch(
        err => console.log(err)
      )
  }

  useEffect(() => {
   
  }, [])

  return (
    <div className='modalPrizes'>
      <div className="modalPrizesMain">
        <div className="modalPrizesTitle">Add New Prize</div>

        <div className="row">
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <Input type={'number'} inputclassname={'disabled'} name={'settingId'} value={settingId} title={'settingId'} readOnly={true} changeInputValue={changeValueInput} />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <Input type={'number'} name={'amount'} value={value} title={'amount'} readOnly={false} changeInputValue={changeValueInput} />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <SelectOption name={'type'} readOnly={false} defaultValue={'type'} value={1} type={'name'} data={resourceType} changeOptinValue={updateOptionData} />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <Input type={'number'} name={'rank'} value={value} title={'rank'} readOnly={false} changeInputValue={changeValueInput} />
          </div>
        </div>

        <div className="resourceBtn">
          <ButtonActionGreen title={'Add Entry'} handler={sendAndEditData} />
        </div>
      </div>
    </div >
  );
}

export default ModalPrizes;
