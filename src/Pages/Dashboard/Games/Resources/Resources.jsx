import React, { useContext, useEffect, useState } from 'react';
import './Resources.scss';
import axios from 'axios';
import { HiPlus, HiChevronLeft } from "react-icons/hi2";
import ModalRequirment from '../../../../layout/ModalResource/ModalRequirment/ModalRequirment';
import ModalEntries from '../../../../layout/ModalResource/ModalEntries/ModalEntries';
import ModalPrizes from '../../../../layout/ModalResource/ModalPrizes/ModalPrizes';
import { useNavigate, useParams } from 'react-router-dom';
import ResourceBox from '../../../../layout/ResourceBox/ResourceBox';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../Loading/LoadingContext';
import { LoginContext } from '../../../Login/LoginContext';
import { API_URL } from '../../../../API_URL';

function Resources() {
    const [data, setData] = useState()
    const [cookies] = useCookies(['accessToken']);
    const [openResource, setOpenResource] = useState('')
    const { loading, setLoading } = useContext(LoadingContext)
    const { goToLoginPage } = useContext(LoginContext);
    const { id } = useParams()
    const navigate = useNavigate()
    const getResource = () => {
        setLoading(true)
        axios.get(`${API_URL === undefined ? '' : API_URL}/games/setting/resources/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(
                res => {
                    setData(res.data)
                    setLoading(false)
                }
            )
            .catch(
                err => console.log(err.message)
            )
    }

    useEffect(() => {
        goToLoginPage(cookies.accessToken);
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

 
    
    const deleteRequirement = (id, type) => {
        axios.delete(`${API_URL === undefined ? '' : API_URL}/games/setting/${type}/${id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + cookies.accessToken
            }
        })
        .then(
            res => {
                    // const updatedItems = ;
                    getResource()
                    // setData(data.filter((item) => item.id !== id))
                }
            )
            .catch(
                err => {
                    console.log(err)
                }
            )
    }

    const hundelBack = () => {
        navigate(-1)
    }

    return (
        data === undefined || data === null ? '' :
            <div className="resourcesBox">
                <div className="addBox">
                    <div className='backSetting' onClick={hundelBack}>
                        <HiChevronLeft />
                    </div>
                    <div className="titleSetting">Game Resources</div>
                    <div></div>
                </div>
                <hr className='hrLine' />
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
                                data.requirements.map((item, index) => (
                                    <div key={index}>
                                        <ResourceBox data={item} type={'requirements'} onchange={deleteRequirement} />
                                    </div>
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
                                data.entries.map((item, index) => (
                                    <div key={index}>
                                        <ResourceBox data={item} type={'entries'} onchange={deleteRequirement} />
                                    </div>
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
                                data.prizes.map((item, index) => (
                                    <div key={index}>
                                        <ResourceBox data={item} type={'prizes'} onchange={deleteRequirement} />
                                    </div>
                                ))
                            }

                        </div>
                    }

                    {
                        openResource === 'requirment' ?
                            <ModalRequirment onchange={getResource} canceladd={closeModal} settingId={id} />
                            :
                            openResource === 'entry' ?
                                <ModalEntries onchange={getResource} canceladd={closeModal} settingId={id} />
                                :
                                openResource === 'prize' ?
                                    <ModalPrizes onchange={getResource} canceladd={closeModal} settingId={id} />
                                    :
                                    ''
                    }
                </div>
            </div>
    );
}

export default Resources;
