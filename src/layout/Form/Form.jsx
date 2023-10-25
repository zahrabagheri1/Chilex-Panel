import React, { useState } from 'react';
import Input from '../../Components/Input/Input';
import SelectOption from '../../Components/SelectOption/SelectOption';
import './Form.scss';

function Form() {
    const [value, setValue] = useState(null)

    return (
        <>
            <form className='form'>
                <Input
                    value={value}
                    type={'number'}
                    title={'limit'}
                />


                <SelectOption
                    value={value}
                    defaultValue={'bundleType'}
                    type={'bandle'}
                    data={[
                        { id: 0, bandle: 'Gem Bandle' },
                        { id: 1, bandle: 'Coin Bandle' }
                    ]}
                />

                <SelectOption
                    value={value}
                    defaultValue={'bundleStatus'}
                    type={'status'}
                    data={[
                        { id: 0, status: 'Active' },
                        { id: 1, status: 'Deactive' }
                    ]}
                />

                <SelectOption
                    value={value}
                    defaultValue={'priceStatus '}
                    type={'status'}
                    data={[
                        { id: 0, status: 'Active' },
                        { id: 1, status: 'Deactive' }
                    ]}
                />

            </form>

        </>
    );
}

export default Form;
