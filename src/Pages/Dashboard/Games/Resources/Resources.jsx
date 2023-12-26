import React, { useEffect, useState } from 'react';
import './Resources.scss';
import axios from 'axios';
import { HiPlus } from "react-icons/hi2";
import ModalRequirment from '../../../../layout/ModalResource/ModalRequirment/ModalRequirment';
import ModalEntries from '../../../../layout/ModalResource/ModalEntries/ModalEntries';
import ModalPrizes from '../../../../layout/ModalResource/ModalPrizes/ModalPrizes';
import { useParams } from 'react-router-dom';
import ResourceBox from '../../../../layout/ResourceBox/ResourceBox';
import { useCookies } from 'react-cookie';


const settingId = 2

function Resources() {
    const [data, setData] = useState()
    const [cookies] = useCookies(['accessToken']);
    const [openResource, setOpenResource] = useState('')
    const { id } = useParams()

    const getResource = () => {
        axios.get(`/games/setting/resources/${id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + cookies.accessToken
            }
        })
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
    const deleteRequirement = (id,type) =>{
        console.log(id,type)
        axios.delete(`/games/setting/${type}/${id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + cookies.accessToken
            }
        })
        .then(
            res => {
                getResource()
            }
        )
        .catch(
            err => console.log(err)
        )
    }

    console.log(data)
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
                        {
                            data.requirements.map((item) => (
                                // console.log('itemmmm : ', item, deleteRequirement(29,'requirement'))
                                <ResourceBox data={item} type={'requirements'} onchange={deleteRequirement} />
                            ))
                        }
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

                        {
                            data.entries.map((item) => (
                                <ResourceBox data={item} type={'entries'} onchange={deleteRequirement} />
                            ))
                        }

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
                        {
                            data.prizes.map((item) => (
                                <ResourceBox data={item} type={'prizes'} onchange={getResource} />
                            ))
                        }

                    </div>
                }

                {
                    openResource === 'requirment' ?
                        <ModalRequirment onchange={getResource} canceladd={closeModal} />
                        :
                        openResource === 'entry' ?
                            <ModalEntries onchange={getResource} canceladd={closeModal} />
                            :
                            openResource === 'prize' ?
                                <ModalPrizes onchange={getResource} canceladd={closeModal} />
                                :
                                ''
                }
            </div>
    );
}

export default Resources;
