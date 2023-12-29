import React from 'react';
import './DatePikerFarsi.scss';
import "moment-timezone";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa";

function DatePikerFarsi(props) {
    const changeDate = (e) => {
        props.handlerChangeDate((e.year + '-' + e.month.number + '-' + e.day), props.title)
    }

    return (
        <div className='datepicker'>
            <div className="title">{props.title}</div>
            <DatePicker
                className={props.readOnly === true ? 'ableInupt' : false}
                calendar={persian}
                locale={persian_fa}
                onChange={changeDate}
                showOtherDays={true}
                buttons={true}
                shadow={false}
                focus={false}
                readOnly={props.readOnly === true ? true : false}
                format={'YYYY/MM/DD'}
                value={props.value}
            />

        </div>
    );
}

export default DatePikerFarsi;
