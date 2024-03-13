import React, { useState } from 'react';
import './ModalAddPirce.scss';
import { useCookies } from 'react-cookie';
import { API_URL } from '../../API_URL';
import axios from 'axios';
import Alert from '../Alert/Alert';
import Input from '../../Components/Input/Input';
import SelectOption from '../../Components/SelectOption/SelectOption';
import ButtonActionGray from '../../Components/ButtonActionGray/ButtonActionGray';
import ButtonActionBlue from '../../Components/ButtonActionBlue/ButtonActionBlue';

const props = {
    bundleId: 0,
    amount: 0,
    type: 0
}



function ModalAddPirce(props) {
    const [addPrice, setaddPrice] = useState(
        {
            bundleId: parseInt(props.bundleId),
            amount: null,
            type: null
        }
    );
    const [cookies] = useCookies(['accessToken']);
    const [showAlert, setShowAlert] = useState
        ({
            status: false, msg: '', success: null
        })

    const handleInputData = (e) => {
        setaddPrice((prev) => ({ ...prev, [e.target.name]: parseInt(e.target.value) }))

    }

    const handleOptionData = (name, id) => {
        setaddPrice((prev) => ({ ...prev, [name]: parseInt(id) }))
    }

    const handlerClose = () => {
        props.canceladd()
    }

    const addPrices = () => {
        axios.post(`${API_URL === undefined ? '' : API_URL}/admin-stuff/bundle/add-price`, addPrice,
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
        <div className='modaladdPrice'>
            {showAlert.status === true ?
                <Alert message={showAlert.msg} success={showAlert.success} />
                :
                ''
            }
            <div className="mainaddPrice">
                <div className="titleaddPrice">Add New Price</div>
                <div className="row">
                    <div className="titleB col-xl-4 col-lg-3 col-md-3 col-sm-4 col-xs-12">
                        <div className='header-title'>bundle Id</div>
                        <div className='data-title'>{props.bundleId}</div>
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <Input name={'amount'} type={'number'} title={'amount'} changeInputValue={handleInputData} />
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <SelectOption readOnly={false} name={'type'} defaultValue={'type'} type={'status'} changeOptinValue={handleOptionData}
                            data={[
                                { id: 0, status: 'Gem' },
                                { id: 1, status: 'Coin' },
                                { id: 2, status: 'Rial' },
                                { id: 3, status: 'Free' },
                            ]}
                        />
                    </div>

                </div>

                <div className="addPricebtn">
                    <ButtonActionGray title={'Cancel'} handler={handlerClose} />
                    <ButtonActionBlue title={'Add new price'} handler={addPrices} />
                </div>

            </div>
        </div>
    );
}

export default ModalAddPirce