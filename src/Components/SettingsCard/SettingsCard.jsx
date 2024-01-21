import React, { useEffect, useState } from 'react';
import './SettingsCard.scss';
import Input from '../Input/Input';
import ButtonActionBlue from '../../Components/ButtonActionBlue/ButtonActionBlue';
import Switch from '../Switch/Switch';
import SelectOption from '../SelectOption/SelectOption';
import axios from 'axios';
import Button from '../Button/Button';
import moment from 'moment-jalaali';
import Alert from '../../layout/Alert/Alert';
import ButtonActionGray from '../ButtonActionGray/ButtonActionGray';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { API_URL } from '../../API_URL';

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

function SettingsCard(props) {

    const data = props.data;
    const navigate = useNavigate()
    const [edit, setEdit] = useState(false)
    const [updatedata, setUpdateData] = useState({})
    const [cookies] = useCookies(['accessToken']);
    const [showAlert, setShowAlert] = useState({
        status: false, msg: '', success: ''
    })

    const sendData = () => {
        axios.patch(API_URL + `/games/setting/${data.id}`, {
            name: updatedata.name === null || updatedata.name === undefined ? data.name : updatedata.name,
            active: updatedata.active === null || updatedata.active === undefined ? data.active : updatedata.active,
            game: updatedata.game === null || updatedata.game === undefined ? data.game : updatedata.game,
            playersLength: updatedata.playersLength === null || updatedata.playersLength === undefined ? data.playersLength : updatedata.playersLength,
            description: updatedata.description === null || updatedata.description === undefined ? data.description : updatedata.description,
            botLevel: updatedata.botLevel === null || updatedata.botLevel === undefined ? data.botLevel : updatedata.botLevel
        },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + cookies.accessToken
            }
        }).then(
            res => {
                props.getData()
                setShowAlert({ status: true, msg: res.statusText + '!  edit is successful', success: true })
                setTimeout(() => {
                    setShowAlert({ status: false, success: true })

                }, 3000)
                setEdit(false)
            }
        ).catch(
            err => {
                setShowAlert({ status: true, msg: err.statusText + 'name is same', success: false })
                setTimeout(() => {
                    setShowAlert({ status: false, success: true })

                    }, 3000)

                }
            )
    }

    const goToResources = () => {
        navigate(`/dashboard/games/settings/resources/${data.id}`)
    }


    const updateInputData = (e) => {
        if (e.target.type === 'number') {
            setUpdateData((prev) => ({ ...prev, [e.target.name]: parseInt(e.target.value) }))
            setEdit(true)
        } else {
            setUpdateData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            setEdit(true)
        }
    }

    const updateOptionData = (name, id) => {
        setUpdateData((prev) => ({ ...prev, [name]: parseInt(id) }))
        setEdit(true)
    }

    const switchHandlerPrice = (boolean, id) => {
        setUpdateData((prev) => ({ ...prev, ['active']: boolean }))
    };

    const botLevel = [{ id: 0, name: 'Easy' }, { id: 1, name: 'Medium' }, { id: 2, name: 'Hard' }]
    const playersLength = [{ id: 0, name: '2 Player' }, { id: 1, name: '3 Player' }, { id: 2, name: '4 Player' }]

    return (
        <div className='settingCard'>
            {showAlert.status === true ?
                <Alert message={showAlert.msg} success={showAlert.success} />
                :
                ''
            }
            <div className='settingName'>{props.data.game}</div>
            <div className='settingDetail row'>
                {
                    Object.entries(props.data).map(([key, value], index) => (
                        editable.map((item) => (
                            item.name === key ?
                                <div key={index} className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                    {
                                        typeof value === 'boolean' ?
                                            <Switch id={index} title={key} defaultChecked={value} disabled={edit === false ? true : false} onChange={switchHandlerPrice} />
                                            :
                                            item.status === false ?
                                                item.name === 'updatedAt' || item.name === 'createdAt' ?
                                                    <div className='titleB'>
                                                        <div className='header-title'>{key}</div>
                                                        <div className='data-title'>{moment(value, 'YYYY/MM/DD').format('jYYYY/jM/jD')}</div>
                                                    </div>

                                                    :
                                                < Input type={typeof value === 'number' ? 'number' : 'text'} inputclassname={'disabled'} name={key} value={value} title={key} readOnly={true} />
                                                :
                                                item.select === false ?
                                                    < Input type={typeof value === 'number' ? 'number' : 'text'} inputclassname={edit === false ? 'disabled' : ''} name={key} value={value} title={key} readOnly={edit === true ? false : true} changeInputValue={updateInputData} />
                                                    :
                                                    item.name === 'botLevel' ?
                                                        <SelectOption name={key} readOnly={edit === false ? true : false} defaultValue={key} value={value} type={'name'} data={botLevel} changeOptinValue={updateOptionData} />
                                                        :
                                                        item.name === 'playersLength' ?
                                                            props.gameName === 'ludo' || props.gameName === 'uno' ?
                                                                <SelectOption name={key} readOnly={edit === false ? true : false} defaultValue={key} value={value} type={'name'} data={playersLength} changeOptinValue={updateOptionData} />
                                                                :
                                                                <SelectOption name={key} readOnly={true} defaultValue={key} value={value} type={'name'} data={playersLength} changeOptinValue={updateOptionData} />
                                                            : null

                                    }
                                </div>
                                :
                                ''
                        ))
                    ))
                }

            </div>
            {
                edit === false ?
                    <div className="row">
                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                            <div className='update'><ButtonActionBlue title={'Edit'} handler={() => setEdit(true)} /></div>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                            <div className='update'><ButtonActionGray title={'resources'} handler={() => goToResources()} /></div>
                        </div>
                    </div>
                    :
                    <div className="row">
                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                            <div className='update'><ButtonActionBlue title={'Done'} handler={sendData} /></div>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                            <div className='update'><ButtonActionGray title={'Cancel'} handler={() => setEdit(false)} /></div>
                        </div>

                    </div>

            }

        </div>

    );
}

export default SettingsCard;
