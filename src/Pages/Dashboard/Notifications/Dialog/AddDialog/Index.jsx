import React, { useState } from 'react';
import Alert from '../../../../../layout/Alert/Alert'
import { API_URL } from '../../../../../API_URL';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Input from '../../../../../Components/Input/Input';
import ButtonActionGray from '../../../../../Components/ButtonActionGray/ButtonActionGray';
import ButtonActionBlue from '../../../../../Components/ButtonActionBlue/ButtonActionBlue';
import './AddDialog.scss';

function Index(props) {
    const [dialog, setDialog] = useState();
    const [addDialogBox, setaddDialogBox] = useState(false);
    const [cookies] = useCookies(['accessToken']);
    const [showAlert, setShowAlert] = useState({
        status: false, msg: '', success: null
    })

    const updateInputData = (e) => {
        if (e.target.name === 'usersIds') {
            setDialog((prev) => ({ ...prev, [e.target.name]: parseInt(e.target.value) }))
            console.log(typeof parseInt(e.target.value))
        } else {
            setDialog((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        }
    }

    const handlerClose = () => {
        props.canceladd()
    }

    const addDialog = () => {
        axios.post(`${API_URL === undefined ? '' : API_URL}/dialog`, dialog,
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
                            setaddDialogBox(false)
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
        <div className='modalDialog'>
            {showAlert.status === true ?
                <Alert message={showAlert.msg} success={showAlert.success} />
                :
                ''
            }

            <div className="addDialogBox">
                <div className='addDialogBtn' onClick={() => setaddDialogBox(!addDialogBox)}>
                    <HiPlus className='icon' />
                    <div className="">New Dialog</div>
                </div>

                <div className={`addDialog row ${addDialogBox ? 'activeaddDialog' : ''}`}>
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
                        <Input name={'body'} type={'text'} title={'body'} placeholder={'body on notif...'} changeInputValue={updateInputData} />
                    </div>

                    <div className="addDialogcancelBtn col-xl-12 col-lg-12 col-md-12 col-ms-12 col-xs-12">
                        <ButtonActionBlue title={'Done'} handler={addDialogication} />
                        <ButtonActionGray title={'Cancel'} handler={() => setaddDialogBox(false)} />
                    </div>
                </div>
            </div>
            <div className="mainDialog">
                <div className="titleDialog">Add New Dialog</div>
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <Input name={'usersIds'} type={'number'} title={'usersIds'} changeInputValue={updateInputData} />
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <Input name={'message'} type={'text'} title={'message'} changeInputValue={updateInputData} />
                    </div>

                </div>

                <div className="dialogbtn">
                    <ButtonActionGray title={'Cancel'} handler={handlerClose} />
                    <ButtonActionBlue title={'Done'} handler={addDialog} />
                </div>


            </div>
        </div>
    )
}

export default Index