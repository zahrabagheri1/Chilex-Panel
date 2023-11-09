import React from 'react';
import Input from '../../Components/Input/Input';
import './Time.scss';

function Time(props) {
    return (
        <div className='time'>
            <div>Time</div>
            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <Input classname={'controlinput'} name={'hour'} type={'number'} title={'hour'} changeInputValue={props.timeInput} />
            </div>
            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <Input classname={'controlinput'} name={'minemt'} type={'number'} title={'minemt'} changeInputValue={props.timeInput} />
            </div>
            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <Input classname={'controlinput'} name={'seconed'} type={'number'} title={'seconed'} changeInputValue={props.timeInput} />
            </div>
        </div>
    );
}

export default Time;
