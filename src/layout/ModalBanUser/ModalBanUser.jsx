import React, { useState } from 'react';
import './ModalBanUser.scss';
import Input from '../../Components/Input/Input';
import SelectOption from '../../Components/SelectOption/SelectOption';

const props = {
    modalTitle: '',
    type: '',
    path: '',
    handlerClose: '',
    handelerSubmit: '',
    data: ''
}


// userId * number
// type * number
// EVERYTHING: 0
// CHATING: 1
// description * string

function ModalBanUser() {
    const [banuser, setBanuser] = useState()

    const updateInputData = (e) => {
        if (e.target.type === 'number') {
            setBanuser((prev) => ({ ...prev, [e.target.name]: parseInt(e.target.value) }))
        } else {
            setBanuser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        }
    }

    const updateOptionData = (name, id) => {
        setBanuser((prev) => ({ ...prev, [name]: parseInt(id) }))
    }


    return (
        <div className='modalBanUser'>
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
                    
                </div>


            </div>
        </div>
    );
}

export default ModalBanUser;
