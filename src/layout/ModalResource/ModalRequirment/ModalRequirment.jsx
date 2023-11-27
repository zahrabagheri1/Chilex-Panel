import React, { useEffect, useState } from 'react';
import './ModalRequirment.scss';
import axios from 'axios';
import Input from '../../../Components/Input/Input';
import SelectOption from '../../../Components/SelectOption/SelectOption';
import ButtonActionBlue from '../../../Components/ButtonActionBlue/ButtonActionBlue';

const settingId = 2

function ModalRequirment(props) {
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
    axios.post(`/games/setting/requirement`, addRequirment).then(
      res => {
        console.log(res.data)
      }
    ).catch(
      err => console.log(err.message)
    )
    props.mousedown() 
  }

  useEffect(() => {
    sendAndEditData()
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
            <SelectOption name={'type'}  important={true} readOnly={false} defaultValue={'type'} value={1} type={'name'} data={resourceType} changeOptinValue={updateOptionData} />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <Input type={'number'}  important={true}  name={'min'} value={value} title={'min'} readOnly={false} changeInputValue={changeValueInput} />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <Input type={'number'} important={true}  name={'max'} value={value} title={'max'} readOnly={false} changeInputValue={changeValueInput} />
          </div>
        </div>

        <div className="resourceBtn">
          <ButtonActionBlue title={'Add Requirment'} handler={e => sendAndEditData(e)} />
        </div>
      </div>
    </div >
  );
}

export default ModalRequirment;
