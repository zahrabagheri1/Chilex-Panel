import React, { useState } from 'react';
import './SelectOption.scss';
import { HiOutlineChevronDown } from "react-icons/hi2";

function SelectOption(props) {
  const data = props.data;
  const [changeTitle, setChangeTitle] = useState(null);
  const [click, setClick] = useState(false);

  const clickHandler = () => {
    setClick(!click)
  }

  const changeTitleHandler = (e) => {
    setChangeTitle(e)
    setClick(!click)

  }

  return (
    <div>
      <div className='title'>{props.defaultValue}:</div>
      <div className="btn">
        <div className='btnTitle' onClick={clickHandler}>
          {changeTitle === null ? props.defaultValue : changeTitle}
          <HiOutlineChevronDown className='chevronDown' style={{ transform: (click === true ? "rotate(180deg)" : 'rotate(0)') }} />
        </div>
        <div className='box' style={{ display: (click === true ? "flex" : 'none') }}>
          {data?.map((item) => (
            <div className='item' onClick={() => changeTitleHandler(item[props.type])}>{item[props.type]}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectOption;



// <SelectOption
//       dataKey="id"
//       defaultValue="color"
//       value={value}
//       onChange={(nextValue) => setValue(nextValue.id)}
//       data={[
//         { id: 1, color: "Red" },
//         { id: 2, color: "Yellow" },
//         { id: 3, color: "Blue" },
//       ]}
//     />