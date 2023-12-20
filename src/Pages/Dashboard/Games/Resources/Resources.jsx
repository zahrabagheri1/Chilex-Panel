import React, { useEffect, useState } from 'react';
import './Resources.scss';
import axios from 'axios';
import { HiPlus } from "react-icons/hi2";
import Resource from '../../../../layout/Resource/Resource';
import ModalRequirment from '../../../../layout/ModalResource/ModalRequirment/ModalRequirment';
import ModalEntries from '../../../../layout/ModalResource/ModalEntries/ModalEntries';
import ModalPrizes from '../../../../layout/ModalResource/ModalPrizes/ModalPrizes';
    
const settingId = 2

function Resources() {
    const [data, setData] = useState()
    const [openResource, setOpenResource] = useState('')

    const getResource = () => {
        axios.get(`/games/setting/resources/${settingId}`)
            .then(
                res => {
                    setData(res.data)
                }
            )
            .catch(
                err => console.log(err.message)
            )
    }

    useEffect(() => {
        getResource()
    }, [])

    const addResource = (type => {
        if (type === 'requirment') {
            return setOpenResource(type)
        } else if (type === 'entry') {
            return setOpenResource(type)
        } else {
            return setOpenResource(type)
        }
    })

    const closeModal = () => {
        setOpenResource(false)
        getResource()
    }


    return (
        data === undefined || data === null ? '' :

            <div className='resources'>
                {data.requirements === null || data.requirements === undefined ? '' :
                    <div className="resource">
                        <div className="resourceAddBox">
                            <div className="resourceTitle">Requirments:</div>
                            <div className='resourceAdd' onClick={() => addResource('requirment')}>
                                <HiPlus />
                            </div>
                        </div>
                        <Resource data={data.requirements} type={'requirements'} onchange={getResource}/>
                    </div>
                }

                <hr className='hrLine' />

                {data.entries === null || data.entries === undefined ? '' :
                    <div className="resource">
                        <div className="resourceAddBox">
                            <div className="resourceTitle">Entries:</div>
                            <div className='resourceAdd' onClick={() => addResource('entry')}>
                                <HiPlus />
                            </div>
                        </div>
                        <Resource data={data.entries} type={'entries'} onchange={getResource}/>
                    </div>
                }

                <hr className='hrLine' />

                {data.prizes === null || data.prizes === undefined ? '' :
                    <div className="resource">
                        <div className="resourceAddBox">
                            <div className="resourceTitle">Prizes:</div>
                            <div className='resourceAdd' onClick={() => addResource('prize')}>
                                <HiPlus />
                            </div>
                        </div>
                        <Resource data={data.prizes} type={'prizes'} onchange={getResource}/>
                    </div>
                }

                {
                    openResource === 'requirment' ?
                        <ModalRequirment onchange={getResource} canceladd={closeModal}/>
                        :
                        openResource === 'entry' ?
                            <ModalEntries onchange={getResource} canceladd={closeModal}/>
                            :
                            openResource === 'prize' ?
                                <ModalPrizes onchange={getResource} canceladd={closeModal}/>
                                :
                                ''
                }
            </div>
    );
}

export default Resources;
