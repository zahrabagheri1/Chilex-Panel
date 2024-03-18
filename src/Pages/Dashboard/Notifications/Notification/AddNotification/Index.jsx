import React, { useState } from 'react';
import Alert from '../../../../../layout/Alert/Alert'
import { API_URL } from '../../../../../API_URL';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Input from '../../../../../Components/Input/Input';
import ButtonActionGray from '../../../../../Components/ButtonActionGray/ButtonActionGray';
import ButtonActionBlue from '../../../../../Components/ButtonActionBlue/ButtonActionBlue';
import './AddNotification.scss';
import { HiPlus } from 'react-icons/hi2';

function Index(props) {
    const [notification, setNotification] = useState();
    const [addNotifBox, setaddNotifBox] = useState(false);
    const [cookies] = useCookies(['accessToken']);
    const [showAlert, setShowAlert] = useState({
        status: false, msg: '', success: null
    })

    const updateInputData = (e) => {
        if (e.target.name === 'usersIds') {
            setNotification((prev) => ({ ...prev, [e.target.name]: [parseInt(e.target.value)] }))
        } else {
            setNotification((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        }
    }

    const addNotification = () => {
        axios.post(`${API_URL === undefined ? '' : API_URL}/fcm`, notification,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(
                res => {
                    setShowAlert({ status: true, msg: res.statusText, success: true })
                    setTimeout(() => {
                        setShowAlert({ status: false })
                        setTimeout(() => {
                            setaddNotifBox(false)
                        }, 0)
                    }, 3000)
                }
            )
            .catch(
                err => {
                    setShowAlert({ status: true, msg: err.message + ".   Filling the blank", success: false })
                    setTimeout(() => {
                        setShowAlert({ status: false })

                    }, 4000)
                }
            )
    }

    return (
        <div className='modalNotif'>
            {showAlert.status === true ?
                <Alert message={showAlert.msg} success={showAlert.success} />
                :
                ''
            }

            <div className="addNotifBox">
                <div className='addNotifBtn' onClick={() => setaddNotifBox(!addNotifBox)}>
                    <HiPlus className='icon' />
                    <div className="">New Notif</div>
                </div>

                <div className={`addNotif row ${addNotifBox ? 'activeaddNotif' : ''}`}>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                        <Input name={'usersIds'} type={'number'} title={'usersIds'} placeholder={'userId...'} changeInputValue={updateInputData} />
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                        <Input name={'title'} type={'text'} title={'title'} placeholder={'title...'} changeInputValue={updateInputData} />
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                        <Input name={'image'} type={'text'} title={'image'} placeholder={'image...'} changeInputValue={updateInputData} />
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-ms-12 col-xs-12">
                        <Input name={'body'} type={'text'} title={'body'} placeholder={'body on notif...'}  changeInputValue={updateInputData} />
                    </div>

                    <div className="addNotifcancelBtn col-xl-12 col-lg-12 col-md-12 col-ms-12 col-xs-12">
                        <ButtonActionBlue title={'Done'} handler={addNotification} />
                        <ButtonActionGray title={'Cancel'} handler={() => setaddNotifBox(false)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index