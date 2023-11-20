import React, { useEffect, useState } from 'react';
import Input from '../../../../Components/Input/Input';
import './Resources.scss';
import axios from 'axios';
import { HiPlus } from "react-icons/hi2";
import ButtonActionGreen from '../../../../Components/ButtonActionGreen/ButtonActionGreen';
import ButtonActionRed from '../../../../Components/ButtonActionRed/ButtonActionRed';
import Resource from '../../../../Components/Resource/Resource';

function Resources() {
    const [requirements, setRequirements] = useState()
    const [entries, setEntries] = useState()
    const [prizes, setPrizes] = useState()
    const [data, setData] = useState()
    const [edit, setEdit] = useState(false)

    const settingId = '2'

    useEffect(() => {
        axios.get(`/games/setting/resources/${settingId}`)
            .then(
                res => {
                    setData(res.data)
                    console.log(res.data)
                }
            )
            .catch(
                err => console.log(err)
            )
    }, [])

    const sendAndEditData = () => {
        // setEdit(!edit)
    }

    const deleteData = () => {

    }

    const changeValueInput = (e) => {
        console.log(e);
    }

    const hundelOpenModal = () => {

    }

    return (
        data === undefined || data === null ? '' :

            <div className='resources'>
                {data.requirements === null || data.requirements === undefined ? '' :
                    <div className="resource">
                        <div className="resourceAddBox">
                            <div className="resourceTitle">Requirments:</div>
                            <div className='resourceAdd' onClick={hundelOpenModal}>
                                <HiPlus />
                            </div>
                        </div>
                        <Resource data={data.requirements} />
                        {/* {data.requirements.map((requirement, index) => (
                            <div key={index} className="resourceBox row">
                                <div className="row col-xl-11 col-lg-11 col-md-11 col-sm-11 col-xs-11">
                                    {Object.entries(requirement).map(([key, value], index) => (
                                        <div key={index} className="resourceItem col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                            <Input type={typeof value === 'number' ? 'number' : 'text'} inputclassname={edit === false ? 'disabled' : ''} name={key} value={value} title={key} readOnly={edit === true ? false : true} changeInputValue={changeValueInput} />
                                        </div>
                                    ))
                                    }
                                </div>
                                <div className="resourceBtn col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                    <ButtonActionGreen title={'Edit'} handler={sendAndEditData} />
                                    <ButtonActionRed title={'Delete'} handler={deleteData} />
                                </div>
                            </div>
                        ))
                        } */}

                    </div>
                }
                <hr className='hrLine' />
                {data.entries === null || data.entries === undefined ? '' :
                    <div className="resource">
                        <div className="resourceAddBox">
                            <div className="resourceTitle">Entries:</div>
                            <div className='resourceAdd' onClick={hundelOpenModal}>
                                <HiPlus />
                            </div>
                        </div>
                        <Resource data={data.entries} />
                        {/* {data.entries.map((entrie, index) => (
                            <div key={index} className="resourceBox row">
                                <div className="row col-xl-11 col-lg-11 col-md-11 col-sm-11 col-xs-11">

                                    {Object.entries(entrie).map(([key, value], index) => (
                                        <div key={index} className="resourceItem col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                            <Input type={typeof value === 'number' ? 'number' : 'text'} inputclassname={edit === false ? 'disabled' : ''} name={key} value={value} title={key} readOnly={edit === true ? false : true} changeInputValue={changeValueInput} />
                                        </div>
                                    ))
                                    }
                                </div>
                                <div className="resourceBtn col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                    <ButtonActionGreen title={'Edit'} handler={sendAndEditData} />
                                    <ButtonActionRed title={'Delete'} handler={deleteData} />
                                </div>
                            </div>
                        ))
                        } */}

                    </div>
                }
                <hr className='hrLine' />
                {data.prizes === null || data.prizes === undefined ? '' :
                    <div className="resource">
                        <div className="resourceAddBox">
                            <div className="resourceTitle">Prizes:</div>
                            <div className='resourceAdd' onClick={hundelOpenModal}>
                                <HiPlus />
                            </div>
                        </div>
                        <Resource data={data.prizes} />
                        {/* 
                        {data.prizes.map((prize, index) => (
                            <div key={index} className="resourceBox row">
                                <div className="row col-xl-11 col-lg-11 col-md-11 col-sm-11 col-xs-11">
                                    {Object.entries(prize).map(([key, value], index) => (
                                        <div key={index} className="resourceItem col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                            <Input type={typeof value === 'number' ? 'number' : 'text'} inputclassname={edit === false ? 'disabled' : ''} name={key} value={value} title={key} readOnly={edit === true ? false : true} changeInputValue={changeValueInput} />
                                        </div>
                                    ))
                                    }
                                </div>
                                <div className="resourceBtn col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                    <ButtonActionGreen title={'Edit'} handler={sendAndEditData} />
                                    <ButtonActionRed title={'Delete'} handler={deleteData} />
                                </div>
                            </div>
                        ))
                        } */}

                    </div>
                }
            </div>
    );
}

export default Resources;
