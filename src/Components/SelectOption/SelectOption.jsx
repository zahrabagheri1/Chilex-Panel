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
  const [changeTitle, setChangeTitle] = useState(props.value);
  const [click, setClick] = useState(false);

  const clickHandler = (e) => {
    setClick(!click)
  }

  const changeTitleHandler = (e, id) => {
    setChangeTitle(e)
    setClick(!click)
    props.changeOptinValue(props.name, id)
  }


  const changeOptionHandler = (e, id) => {
    props.changeOptionValue(id)
    console.log(e.target)
  }


  return (
    <div className={`optionBox ${props.classnameBox}`}>
      <div className="optionTitleBox">
        <div className='title'>{props.defaultValue}</div>
        {
          props.important === true ?
            <div className="shouldfill"></div>
            :
            ''
        }
      </div>
      {
        props.readOnly === false ?
          <div className={`btn ${props.classname}`} >
            <div className='btnTitle' onClick={clickHandler} >
              {
                changeTitle === null ?
                  typeof props.defaultValue === 'boolean' ?
                    props.data.map(item => (
                      item.id === props.defaultValue?
                      'dsfsd':''
                    ))
                    :
                    ''
                  :
                  changeTitle
              }
              <HiOutlineChevronDown className='chevronDown' style={{ transform: (click === true ? "rotate(180deg)" : 'rotate(0)') }} />
            </div>
            <div className='box' style={{ display: (click === true ? "flex" : 'none') }}>
              {data?.map((item) => (
                <div className='option' value={item.id} onClick={() => changeTitleHandler(item[props.type], item.id)}>{item[props.type]}</div>
              ))}
            </div>
          </div>
          :
          <div className={`btn ${props.classname}`} >
            <div className='btnTitleRO' onClick={clickHandler} >
              {changeTitle === null ? props.defaultValue : changeTitle}
            </div>
          </div>
      }
    </div>
  );
}

export default SelectOption;



