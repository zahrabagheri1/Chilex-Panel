import React, { useState } from 'react';
import Alert from '../../../../../layout/Alert/Alert'
import { API_URL } from '../../../../../API_URL';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Input from '../../../../../Components/Input/Input';
import ButtonActionGray from '../../../../../Components/ButtonActionGray/ButtonActionGray';
import ButtonActionBlue from '../../../../../Components/ButtonActionBlue/ButtonActionBlue';
import './AddNotification.scss';

const props = {
    modalTitle: '',
    type: '',
    path: '',
    handlerClose: '',
    handelerSubmit: '',
    data: ''
}

function Index(props) {
    const [notification, setNotification] = useState();
    const [cookies] = useCookies(['accessToken']);
    const [showAlert, setShowAlert] = useState({
        status: false, msg: '', success: null
    })

    const updateInputData = (e) => {
        if (e.target.name === 'usersIds') {
            setNotification((prev) => ({ ...prev, [e.target.name]: parseInt(e.target.value) }))
            // console.log(typeof parseInt(e.target.value))
        } else {
            setNotification((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        }
    }

    const handlerClose = () => {
        props.canceladd()
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
                            props.canceladd()
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
            <div className="mainNotif">
                <div className="titleNotif">Add New Notification</div>
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <Input name={'usersIds'} type={'number'} title={'usersIds'} changeInputValue={updateInputData} />
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <Input name={'title'} type={'text'} title={'title'} changeInputValue={updateInputData} />
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <Input name={'body'} type={'text'} title={'body'} changeInputValue={updateInputData} />
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <Input name={'image'} type={'text'} title={'image'} changeInputValue={updateInputData} />
                    </div>

                </div>

                <div className="notifbtn">
                    <ButtonActionGray title={'Cancel'} handler={handlerClose} />
                    <ButtonActionBlue title={'Done'} handler={addNotification} />
                </div>


            </div>
        </div>
    )
}

export default Index