import React, { useState } from 'react';
import './Select.scss';

function Select(props) {
    const [click, setClick]= useState(false);
    const clickHandler = ()=>{
        setClick(!click)
    }

    let data = props.data

 
    return (
    <div className='btn'>
      <div className='btnTitle' onClick={clickHandler}>
        {/* {data.map(item =>(item[props.dataKey] === props.defaultValue ? item[props.textField] : ''))} */}
        {props.textField}
      </div>
      <div className='box' style={{display: (click === true ? "flex": 'none')}}>
        {data.map((item)=>(
          <div className='item'>{item[props.type]}</div>
        ))} 
      </div>
    </div>
  );
}

export default Select;


// <Select
                    
// dataKey="id"
// textField="price"
// value={value}
// defaultValue={1}
// onChange={(nextValue) => setValue(nextValue.id)}
// data={[
//     { id: 0, price: "gemBundle" },
//     { id: 1, price: "coinBundle" },
//     { id: 2, price: "Item" },
// ]}
// />