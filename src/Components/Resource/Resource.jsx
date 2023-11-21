import React, { useState } from 'react';
import './Resource.scss';
import ButtonActionGreen from '../ButtonActionGreen/ButtonActionGreen';
import ButtonActionRed from '../ButtonActionRed/ButtonActionRed';
import Input from '../Input/Input';
import SelectOption from '../SelectOption/SelectOption';

function Resources(props) {
    const [edit, setEdit] = useState(false)



    const resourceType = [
        { id: 0, name: 'Gem' },
        { id: 1, name: 'Coin' },
        { id: 2, name: 'Cup' },
        { id: 3, name: 'XP' }
    ]

    const sendAndEditData = (index) => {
        setEdit(!edit)
    }

    const deleteData = () => {

    }

    const changeValueInput = (e) => {
        console.log(e);
    }


    const updateOptionData = () => {

    }



    return (
        props.data === undefined || props.data === null ? '' :

            props.data.map((requirement, index) => (
                <div key={index} className="resourceBox row">
                    <div className="row col-xl-11 col-lg-11 col-md-11 col-sm-11 col-xs-11">
                        {Object.entries(requirement).map(([key, value], index) => (
                            <div key={index} className="resourceItem col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                {
                                    key === 'type' ?
                                        <SelectOption name={key} readOnly={edit === false ? true : false} defaultValue={key} value={value} type={'name'} data={resourceType} changeOptinValue={updateOptionData} />
                                        :
                                        key === 'createdAt' || key === 'updatedAt' || key === 'id' ?
                                            <Input type={typeof value === 'number' ? 'number' : 'text'} inputclassname={'disabled'} name={key} value={value} title={key} readOnly={true} changeInputValue={changeValueInput} />
                                            :
                                            <Input type={typeof value === 'number' ? 'number' : 'text'} inputclassname={edit === false ? 'disabled' : ''} name={key} value={value} title={key} readOnly={edit === true ? false : true} changeInputValue={changeValueInput} />

                                }
                            </div>
                        ))
                        }
                    </div>
                    <div className="resourceBtn col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1">
                        <ButtonActionGreen title={'Edit'} handler={() => sendAndEditData(index)} />
                        <ButtonActionRed title={'Delete'} handler={deleteData} />
                    </div>
                </div>
            ))
    );
}

export default Resources;
