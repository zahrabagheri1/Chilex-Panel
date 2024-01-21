import React, { useState } from 'react';
import './ModalBanUser.scss';
import Input from '../../Components/Input/Input';
import SelectOption from '../../Components/SelectOption/SelectOption';
import ButtonActionGray from '../../Components/ButtonActionGray/ButtonActionGray';
import ButtonActionBlue from '../../Components/ButtonActionBlue/ButtonActionBlue';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Alert from '../Alert/Alert';
import { API_URL } from '../../API_URL';

const props = {
    modalTitle: '',
    type: '',
    path: '',
    handlerClose: '',
    handelerSubmit: '',
    data: ''
}

function ModalBanUser(props) {
    const [banuser, setBanuser] = useState();
    const [cookies] = useCookies(['accessToken']);
    const [showAlert, setShowAlert] = useState({
        status: false, msg: '', success: null
    })

    const updateInputData = (e) => {
        if (e.target.name === 'userId') {
            setBanuser((prev) => ({ ...prev, [e.target.name]: parseInt(e.target.value) }))
        } else {
            setBanuser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        }
    }

    const updateOptionData = (name, id) => {
        setBanuser((prev) => ({ ...prev, [name]: parseInt(id) }))
    }

    const handlerClose = () => {
        props.canceladd()
    }

    const banUser = () => {
        axios.post(API_URL + `/admin-ban/ban`, banuser,
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
        <div className='modalBanUser'>
            {showAlert.status === true ?
                <Alert message={showAlert.msg} success={showAlert.success} />
                :
                ''
            }
            <div className="mainbanuser">
                <div className="titlebanuser">Ban User</div>
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <Input name={'userId'} type={'text'} title={'userId'} changeInputValue={updateInputData} />
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <SelectOption readOnly={false} name={'type'} defaultValue={'type'} type={'status'} changeOptinValue={updateOptionData}
                            data={[
                                { id: 0, status: 'EVERYTHING' },
                                { id: 1, status: 'CHATING' },
                            ]}
                        />
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <Input name={'description'} type={'text'} title={'description'} changeInputValue={updateInputData} />
                    </div>
                </div>

                <div className="banuserbtn">
                    <ButtonActionGray title={'Cancel'} handler={handlerClose} />
                    <ButtonActionBlue title={'Ban User'} handler={banUser} />
                </div>


            </div>
        </div>
    );
}

export default ModalBanUser;
