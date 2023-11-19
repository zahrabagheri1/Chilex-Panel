import React, { useState } from 'react';
import './SettingsCard.scss';
import Input from '../Input/Input';
import { HiPencilSquare } from "react-icons/hi2";
import ButtonActionGreen from '../../Components/ButtonActionGreen/ButtonActionGreen';
import Switch from '../Switch/Switch';
import SelectOption from '../SelectOption/SelectOption';


const props = {
    id: '1',
    name: '2p (bronze)',
    active: true,
    game: 'ludo',
    playersLength: 2,
    type: 'quick',
    description: 'description',
    level: 1,
    botLevel: 2,
    createdAt: '2023-11-16T09:07:02.831Z',
    updatedAt: '2023-11-16T09:07:02.831Z'
}

const editable = [
    { name: 'name', status: true, select: false },
    { name: 'active', status: true, select: false },
    { name: 'game', status: false, select: false },
    { name: 'playersLength', status: true, select: true },
    { name: 'description', status: true, select: false },
    { name: 'botLevel', status: true, select: true },
    { name: 'id', status: false, select: false },
    { name: 'type', status: false, select: false },
    { name: 'level', status: false, select: false },
    { name: 'createdAt', status: false, select: false },
    { name: 'updatedAt', status: false, select: false },

]

function SettingsCard() {
    const [edit, setEdit] = useState(false)
    const [active, setActive] = useState(false)

    const sendAndEditData = () => {
        setEdit(!edit)

    }
    const changeValueInput = (e) => {

    }
    const updateOptionData = (e) => {

    }
    const switchHandlerPrice = (boolean, id) => {
        console.log("boolean,id", boolean, id);
    };

    const botLevel = [{ id: 0, name: 'Easy' }, { id: 1, name: 'Medium' }, { id: 2, name: 'Hard' }]
    const playersLength = [{ id: 0, name: '2 Player' }, { id: 1, name: '3 Player' }, { id: 2, name: '3 Player' }]

    return (
        <div className='settingCard'>
            <div className='settingStatus'>
                <div className={`settingdiactive ${active === true ? 'settingActive' : ''}`}></div>
                <div className='settingName'>{props.game}</div>
            </div>
            <div className='settingDetail row'>
                {

                    Object.entries(props).map(([key, value], index) => (

                        editable.map((item) => (
                            item.name === key ?
                                <div key={index} className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                    {
                                        typeof value === 'boolean' ?
                                            <Switch id={index} title={key} defaultChecked={value === 0 ? true : false} disabled={edit === false ? true : false} onChange={switchHandlerPrice} />
                                            :
                                            item.status === false ?
                                                < Input type={typeof value === 'number' ? 'number' : 'text'} inputclassname={'disabled'} className="cupName" name={key} value={value} title={key} readOnly={true} changeInputValue={changeValueInput} />
                                                :
                                                item.select === false ?
                                                    < Input type={typeof value === 'number' ? 'number' : 'text'} inputclassname={edit === false ? 'disabled' : ''} className="cupName" name={key} value={value} title={key} readOnly={edit === true ? false : true} changeInputValue={changeValueInput} />
                                                    :
                                                    item.name === 'botLevel' ?
                                                        <SelectOption name={key} readOnly={edit === false ? true: false} defaultValue={key} value={'Easy'} type={'name'} data={botLevel} changeOptinValue={updateOptionData}/>
                                                        :
                                                            item.name === 'playersLength' ?
                                                                <SelectOption name={key} readOnly={edit === false ? true:false} defaultValue={key} value={'4 Player'} type={'name'} data={playersLength} changeOptinValue={updateOptionData}/>
                                                                :
                                                                ''
                                    }
                                </div>
                                :
                                ''
                        ))
                    ))
                }
                <div className="btnEdit">
                    <div className='update'><ButtonActionGreen title={'Edit'} handler={sendAndEditData} /></div>
                </div>

            </div>

        </div>

    );
}

export default SettingsCard;
