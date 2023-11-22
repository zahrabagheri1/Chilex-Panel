import React, { useEffect, useState } from 'react';
import './Resources.scss';
import axios from 'axios';
import { HiPlus } from "react-icons/hi2";
import Resource from '../../../../Components/Resource/Resource';
import ModalRequirment from '../../../../layout/ModalResource/ModalRequirment/ModalRequirment';
import ModalEntries from '../../../../layout/ModalResource/ModalEntries/ModalEntries';
import ModalPrizes from '../../../../layout/ModalResource/ModalPrizes/ModalPrizes';

function Resources() {
    const [data, setData] = useState()
    const [openResource, setOpenResource] = useState('')


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

    const addResource = (type => {
        if (type === 'requirment') {
            return setOpenResource(type)
        } else if (type === 'entry') {
            return setOpenResource(type)
        } else {
            return setOpenResource(type)
        }
    })

    const mouseOut = () => {
        // setOpenResource(null)
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
                        <Resource data={data.requirements} />
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
                        <Resource data={data.entries} />
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
                        <Resource data={data.prizes} />
                    </div>
                }

                {
                    openResource === 'requirment' ?
                        <ModalRequirment mousedown={mouseOut} />
                        :
                        openResource === 'entry' ?
                            <ModalEntries mousedown={mouseOut} />
                            :
                            openResource === 'prize' ?
                                <ModalPrizes mousedown={mouseOut} />
                                :
                                ''
                }
            </div>
    );
}

export default Resources;
