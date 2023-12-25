import React, { useEffect, useState } from 'react';
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
  const [data, setData] = useState(props.data)
  const [changeTitle, setChangeTitle] = useState();
  const [click, setClick] = useState(false);

  const clickHandler = (e) => {
    setClick(!click)
  }

  const changeTitleHandler = (e, id) => {
    setChangeTitle(e)
    setClick(!click)
    props.changeOptinValue(props.name, id)
  }


  useEffect(() => {
    data.map(item => (
      item.id === props.value ?
        setChangeTitle(item.name)
        : ''
    ))
  }, [])

  return (
    <div className={`optionBox ${props.classnameBox}`}>
      <div className="optionTitleBox">
        <div className='title'>{props.name}</div>
        {
          props.important === true ?
            <div className="shouldfill"></div>
            :
            ''
        }
      </div>
      {
        props.readOnly === false ?
          <div className={`btn ${props.classname} ${props.disable === true ? 'disableSelect' : ''}`} >
            <div className='btnTitle' onClick={clickHandler} >
              <div className="btnTitleText">
                {
                  changeTitle === null || changeTitle === undefined ?
                    props.defaultValue
                    :
                    changeTitle
                }
              </div>
              <HiOutlineChevronDown className='chevronDown' style={{ transform: (click === true ? "rotate(180deg)" : 'rotate(0)') }} />
            </div>
            <div className='box' style={{ display: (click === true ? "flex" : 'none') }}>
              {data?.map((item, index) => (
                <div  key={index} className='option' value={item.id} onClick={() => changeTitleHandler(item[props.type], item.id)}>{item[props.type]}</div>
              ))}
            </div>
          </div>
          :
          <div className={`btn ${props.classname}`} >
            <div className='btnTitleRO' onClick={clickHandler} >
              {changeTitle === null || changeTitle === undefined ? props.defaultValue : changeTitle}
            </div>
          </div>
      }
    </div>
  );
}

export default SelectOption;



