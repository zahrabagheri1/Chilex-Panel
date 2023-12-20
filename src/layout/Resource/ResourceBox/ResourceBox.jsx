import React, { useState } from 'react';
import SelectOption from '../../../Components/SelectOption/SelectOption';
import Input from '../../../Components/Input/Input';
import ButtonActionBlue from '../../../Components/ButtonActionBlue/ButtonActionBlue';
import ButtonActionGray from '../../../Components/ButtonActionGray/ButtonActionGray';
import axios from 'axios';
import Alert from '../../Alert/Alert';

function ResourceBox(props) {

    const [edit, setEdit] = useState(false)
    const [addRequirment, setAddRequirment] = useState({})
    const [showAlert, setShowAlert] = useState({
        status: false, msg: '', success: null
    })

    // console.log(addRequirment)

    const resourceType = [
        { id: 0, name: 'Gem' },
        { id: 1, name: 'Coin' },
        { id: 2, name: 'Cup' },
        { id: 3, name: 'XP' }
    ]

    const deleteRequirement = (id) => {
        axios.delete(`/games/setting/requirement/${id}`)
            .then(
                res => {
                    // show alert that  deleted successfully
                    if (res.status < 300 && res.status >= 200) {
                        setShowAlert({ status: true, msg: `Data by id: ${id} was delete successfully` })
                        setTimeout(() => {
                            setShowAlert({ status: false })
                        }, 2000)
                    }
                    props.onchange()
                }
            )
            .catch(
                err => console.log(err)
            )
    }

    const detelePrize = (id) => {
        console.log(id)
        axios.delete(`/games/setting/prize/${id}`)
            .then(
                res => {
                    // show alert that  deleted successfully
                    if (res.status < 300 && res.status >= 200) {
                        setShowAlert({ status: true, msg: 'Data deleted successfully' })
                        setTimeout(() => {
                            setShowAlert({ status: false })
                        }, 2000)
                    }
                    props.onchange()
                }
            )
            .catch(
                err => console.log(err)
            )

    }

    const deleteEntry = (id) => {
        axios.delete(`/games/setting/entry/${id}`)
            .then(
                res => {
                    // show alert that  deleted successfully
                    if (res.status < 300 && res.status >= 200) {
                        setShowAlert({ status: true, msg: 'Data deleted successfully' })
                        setTimeout(() => {
                            setShowAlert({ status: false })
                        }, 2000)
                    }

                    props.onchange()
                }
            )
            .catch(
                err => console.log(err)
            )

    }

    const editResource = (id, requirement) => {
        axios.patch(`/games/setting/requirement/${id}`, {
            type: addRequirment.type === null || addRequirment.type === undefined ? requirement.type : addRequirment.type,
            min: addRequirment.min === null || addRequirment.min === undefined ? requirement.min : addRequirment.min,
            max: addRequirment.max === null || addRequirment.max === undefined ? requirement.max : addRequirment.max

        })
            .then(
                res => {
                    if (res.status < 300 && res.status >= 200) {
                        setShowAlert({ status: true, msg: res.statusText, success: true })
                        setTimeout(() => {
                            setShowAlert({ status: false })
                        }, 2000)
                    }
                    props.onchange()
                    setEdit(false)
                }
            )
            .catch(
                err => console.log(err)
            )
    }

    const editEntry = (id, requirement) => {
        axios.patch(`/games/setting/entry/${id}`, {
            amount: addRequirment.amount === null || addRequirment.amount === undefined ? requirement.amount : addRequirment.amount,
            type: addRequirment.type === null || addRequirment.type === undefined ? requirement.type : addRequirment.type
        })
            .then(
                res => {
                    if (res.status < 300 && res.status >= 200) {
                        setShowAlert({ status: true, msg: res.statusText, success: true })
                        setTimeout(() => {
                            setShowAlert({ status: false })
                        }, 2000)
                    }
                    props.onchange()
                    setEdit(false)
                }
            )
            .catch(
                err => {
                    console.log(err)
                }
            )
    }
    const editPrize = (id, requirement) => {
        console.log(requirement.type)
        axios.patch(`/games/setting/prize/${id}`, {
            amount: addRequirment.amount === null || addRequirment.amount === undefined ? requirement.amount : addRequirment.amount,
            type: addRequirment.type === null || addRequirment.type === undefined ? requirement.type : addRequirment.type
        })
            .then(
                res => {
                    if (res.status < 300 && res.status >= 200) {
                        setShowAlert({ status: true, msg: res.statusText, success: true })
                        setTimeout(() => {
                            setShowAlert({ status: false })
                        }, 2000)
                    }
                    props.onchange()
                    setEdit(false)
                }
            )
            .catch(
                err => {
                    console.log(err)
                }
            )

    }

    const sendData = (id, type, requirement) => {
        if (type === 'requirements') {
            editResource(id, requirement)
        } else if (type === 'entries') {
            editEntry(id, requirement)
        } else {
            editPrize(id, requirement)
        }
    }

    const deleteData = (id, type) => {
        if (type === 'requirements') {
            deleteRequirement(id)
        } else if (type === 'entries') {
            deleteEntry(id)
        } else {
            detelePrize(id)
        }
    }

    const changeValueInput = (e) => {
        setAddRequirment(prev => ({ ...prev, [e.target.name]: parseInt(e.target.value) }))
    }

    const updateOptionData = (name, value) => {
        setAddRequirment(prev => ({ ...prev, [name]: parseInt(value) }))
    }

    return (
        <div className="resourceBox row">
            {showAlert.status === true ?
                <Alert message={showAlert.msg} success={showAlert.success} />
                :
                ''
            }
            <div className="row col-xl-11 col-lg-11 col-md-11 col-sm-11 col-xs-11">
                {Object.entries(props.requirement).map(([key, value], index) => (
                    <div key={index} className="resourceItem col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-6">
                        {
                            key === 'type' ?
                                <SelectOption name={key} readOnly={edit === false ? true : false} defaultValue={key} value={value} type={'name'} data={resourceType} changeOptinValue={updateOptionData} />
                                :
                                key === 'createdAt' || key === 'updatedAt' || key === 'id' || key === 'rank' ?
                                    <Input type={typeof value === 'number' ? 'number' : 'text'} inputclassname={'disabled'} name={key} value={value} title={key} readOnly={true} changeInputValue={changeValueInput} />
                                    :
                                    <Input type={typeof value === 'number' ? 'number' : 'text'} inputclassname={edit === false ? 'disabled' : ''} name={key} value={value} title={key} readOnly={edit === true ? false : true} changeInputValue={changeValueInput} />

                        }
                    </div>
                ))
                }
            </div>

            {edit === true ?
                <div className="resourceBtn col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1">
                    <ButtonActionBlue title={'Done'} handler={() => sendData(props.requirement.id, props.type, props.requirement)} />
                    <ButtonActionGray title={'Cancel'} handler={() => setEdit(false)} />
                </div>
                :
                <div className="resourceBtn col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1">
                    <ButtonActionBlue title={'Edit'} handler={() => setEdit(true)} />
                    <ButtonActionGray title={'Delete'} handler={() => deleteData(props.requirement.id, props.type)} />
                </div>
            }
        </div>
    );
}

export default ResourceBox;
