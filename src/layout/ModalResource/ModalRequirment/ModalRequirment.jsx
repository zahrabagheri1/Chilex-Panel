import React, {useState } from 'react';
import './ModalRequirment.scss';
import axios from 'axios';
import Input from '../../../Components/Input/Input';
import SelectOption from '../../../Components/SelectOption/SelectOption';
import ButtonActionBlue from '../../../Components/ButtonActionBlue/ButtonActionBlue';
import Alert from '../../Alert/Alert';
import ButtonActionGray from '../../../Components/ButtonActionGray/ButtonActionGray';
import { useCookies } from 'react-cookie';
import { API_URL } from '../../../API_URL';

function ModalRequirment(props) {
  const [value, setValue] = useState()
      const [cookies, setCookies, removeCookie] = useCookies(['accessToken'])

  const [addRequirment, setAddRequirment] = useState({
    settingId: parseInt(props.settingId),
    type: 1
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
    setAddRequirment(prev => ({ ...prev, [e.target.name]: parseInt(e.target.value) }))
  }

  const updateOptionData = (name, id) => {
    setAddRequirment(prev => ({ ...prev, [name]: parseInt(id) }))
  }

  const sendData = () => {
    axios.post(`${API_URL === undefined ? '' : API_URL}/games/setting/requirement`, addRequirment,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + cookies.accessToken
      }
    }).then(
      res => {
        // show alert that new setting requirement creatting.
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
          setShowAlert({ status: true, msg: err.response.data.message, success: false })
          setTimeout(() => {
            setShowAlert({ status: false })
          }, 2000)
        }
      
    )
  }


  return (
    <div className='modalRequirments'>
      {showAlert.status === true ?
        <Alert message={showAlert.msg} success={showAlert.success} />
        :
        ''
      }
      <div className="modalRequirmentsMain">
        <div className="modalRequirmentsTitle">Add New Requirment</div>

        <div className="row">
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <Input type={'number'} inputclassname={'disabled'} name={'settingId'} value={addRequirment.settingId} title={'settingId'} readOnly={true} changeInputValue={changeValueInput} />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <SelectOption name={'type'} title={"type"} important={true} readOnly={false} defaultValue={'type'} value={1} type={'name'} data={resourceType} changeOptinValue={updateOptionData} />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <Input type={'number'} important={true} name={'min'} value={value} title={'min'} readOnly={false} changeInputValue={changeValueInput} />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <Input type={'number'} important={true} name={'max'} value={value} title={'max'} readOnly={false} changeInputValue={changeValueInput} />
          </div>
        </div>

        <div className="modalRequirmentsBtn">
          <ButtonActionBlue title={'Add Requirment'} handler={e => sendData(e)} />
          <ButtonActionGray title={'cancel'} handler={() => props.canceladd()} />
        </div>
      </div>
    </div >
  );
}

export default ModalRequirment;
