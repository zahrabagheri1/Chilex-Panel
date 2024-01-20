import React, { useEffect, useState } from 'react';
import Input from '../../Components/Input/Input';
import './Time.scss';

function Time(props) {
    const [timeList, setTimeList] = useState({
        day: props.value?.day || null,
        hour: props.value?.hour || null,
        minute: props.value?.minute || null
    })

    const inputChange = (e) => {
        setTimeList((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // console.log(props.value, timeList)

    useEffect(() => {
        props.sendTime(timeList)
    }, [timeList])

    return (
        <div className='timeBox row'>
            <div className='timeTitle col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1'>
                <div className="title">Time</div>
                {
                    props.important === true ?
                        <div className="shouldfill"></div>
                        :
                        ''
                }
            </div>

            <div className='row col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8'>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <Input inputclassname={props.active === false ? 'disabled' : ''}  value={props.value?.day}  readOnly={props.active ? false : true} name={'day'} type={'number'} title={'day'} changeInputValue={inputChange} />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <Input inputclassname={props.active === false ? 'disabled' : ''} value={props.value?.hour} readOnly={props.active ? false : true} name={'hour'} type={'number'} title={'hour'} changeInputValue={inputChange} />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <Input inputclassname={props.active === false ? 'disabled' : ''} value={props.value?.minute} readOnly={props.active ? false : true} name={'minute'} type={'number'} title={'minute'} changeInputValue={inputChange} />
                </div>
            </div>


        </div >
    );
}

export default Time;
