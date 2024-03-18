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
import { RiUserForbidFill } from 'react-icons/ri';

const props = {
    modalTitle: '',
    type: '',
    path: '',
    handlerClose: '',
    handelerSubmit: '',
    data: ''
}

function ModalBanUser(props) {
    const [banuserBox, setBanuserBox] = useState(false)
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

    const banUser = () => {
        axios.post(`${API_URL === undefined ? '' : API_URL}/admin-ban/ban`, banuser,
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
        <div className="banuserBox">
            {showAlert.status === true ?
                <Alert message={showAlert.msg} success={showAlert.success} />
                :
                ''
            }
            <div className="banuserBtn" onClick={() => setBanuserBox(!banuserBox)}>
                <RiUserForbidFill className='icon' />
                <div>Ban user</div>
            </div>

            <div className={`banuser row ${banuserBox ? 'activebanuser' : ''}`}>
                <div className="col-xl-6 col-lg-6 col-md-6 col-ms-12 col-xs-12">
                    <Input name={'userId'} type={'text'} title={'userId'} placeholder={'userId...'} changeInputValue={updateInputData} />
                </div>

                <div className="col-xl-6 col-lg-6 col-md-6 col-ms-12 col-xs-12">
                    <SelectOption readOnly={false} title={"type"} name={'type'} defaultValue={'type'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'Player name is offensive' },
                            { id: 1, status: 'inactive' },
                            { id: 2, status: 'chating' },
                            { id: 3, status: 'voice chat is offensive' },
                        ]}
                    />
                </div>

                <div className="col-xl-12 col-lg-12 col-md-12 col-ms-12 col-xs-12">
                    <Input name={'description'} type={'text'} placeholder={'description...'} title={'description'} changeInputValue={updateInputData} />

                </div>

                <div className="banusercancelbtn col-xl-12 col-lg-12 col-md-12 col-ms-12 col-xs-12">
                    <ButtonActionBlue title={'Ban User'} handler={banUser} />
                    <ButtonActionGray title={'Cancel'} handler={() => setBanuserBox(false)} />
                </div>
            </div>
        </div>
    );
}

export default ModalBanUser;
