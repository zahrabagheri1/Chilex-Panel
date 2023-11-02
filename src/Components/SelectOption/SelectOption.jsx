import React, { useState } from 'react';
import './SelectOption.scss';
import { HiOutlineChevronDown } from "react-icons/hi2";


// const props = {
//   dataKey: "id",
//   name: 'stufftype',
//   defaultValue: "color",
//   type: 'bundle',
//   value: { value },
//   onChange: (nextValue) => setValue(nextValue.id),
//   data: [
//     { id: 0, bundle: 'Gem bundle' },
//     { id: 1, bundle: 'Coin bundle' },
//     { id: 2, bundle: 'Item' }
//   ],
// }

function SelectOption(props) {
  const data = props.data;
  const [changeTitle, setChangeTitle] = useState(null);
  const [click, setClick] = useState(false);
  const [value, setValue] = useState(props.value);

  const clickHandler = (e) => {
    setClick(!click)
  }

  const changeTitleHandler = (e, id) => {
    console.log("name and id :",e, id)
    setChangeTitle(e)
    setClick(!click)
    props.changeOptinValue(id)
  }


  const changeOptionHandler = (e, id) => {
    props.changeOptionValue(id)
    console.log(e.target)
  }


  return (
    <div>
      <div className='title'>{props.defaultValue}</div>
      <div className={`btn ${props.classname}`} >
        <div className='btnTitle' onClick={clickHandler} >
          {changeTitle === null ? props.defaultValue : changeTitle}
          <HiOutlineChevronDown className='chevronDown' style={{ transform: (click === true ? "rotate(180deg)" : 'rotate(0)') }} />
        </div>
        <div className='box' style={{ display: (click === true ? "flex" : 'none') }}>
          {data?.map((item) => (
            <div className='option' value={item.id} onClick={() => changeTitleHandler(item[props.type],item.id)}>{item[props.type]}</div>

          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectOption;



