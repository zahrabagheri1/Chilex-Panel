import React from 'react';
import SelectOption from '../../Components/SelectOption/SelectOption';
import Input from '../../Components/Input/Input';

function Prices(props) {
    return (
        <div className='row'>
            <div className=''>Price</div>
            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <SelectOption classnameBox={'control'} name={'prices'} defaultValue={'Price'} type={'status'} changeOptinValue={props.priceSlect}
                    data={[
                        { id: 0, status: 'Gem' },
                        { id: 1, status: 'Coin' },
                        { id: 2, status: 'Tonam' },
                    ]}
                />
            </div>
            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <Input classname={'controlinput'} name={'amount'} type={'number'} title={'amount'} changeInputValue={props.priceInput} />
            </div>

            <div className=''>btn</div>
        </div>
    );
}

export default Prices;
