import React, { useEffect, useState } from 'react';
import './ModalRequirment.scss';
import axios from 'axios';
import Input from '../../../Components/Input/Input';
import SelectOption from '../../../Components/SelectOption/SelectOption';
import ButtonActionGreen from '../../../Components/ButtonActionGreen/ButtonActionGreen';

const settingId = 2

function ModalRequirment() {
  const [value, setValue] = useState()
  const [addRequirment, setAddRequirment] = useState({
    settingId: settingId
  })

  const resourceType = [
    { id: 0, name: 'Gem' },
    { id: 1, name: 'coin' },
    { id: 2, name: 'cup' },
    { id: 3, name: 'xp' },
  ]





  const changeValueInput = (e) => {
    setAddRequirment(prev => ({ ...prev, [e.target.name]: parseInt(e.target.value) }))
  }

  const updateOptionData = (name, id) => {
    setAddRequirment(prev => ({ ...prev, [name]: parseInt(id) }))
  }

  const sendAndEditData = () => {
    axios.post(`/games/setting/Requirment`, addRequirment).then(
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
    <div className='modalRequirments'>
      <div className="modalRequirmentsMain">
        <div className="modalRequirmentsTitle">Add New Requirment</div>

        <div className="row">
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <Input type={'number'} inputclassname={'disabled'} name={'settingId'} value={settingId} title={'settingId'} readOnly={true} changeInputValue={changeValueInput} />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <SelectOption name={'type'} readOnly={false} defaultValue={'type'} value={1} type={'name'} data={resourceType} changeOptinValue={updateOptionData} />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <Input type={'number'} name={'min'} value={value} title={'min'} readOnly={false} changeInputValue={changeValueInput} />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <Input type={'number'} name={'max'} value={value} title={'max'} readOnly={false} changeInputValue={changeValueInput} />
          </div>
        </div>

        <div className="resourceBtn">
          <ButtonActionGreen title={'Add Requirment'} handler={sendAndEditData} />
        </div>
      </div>
    </div >
  );
}

export default ModalRequirment;
