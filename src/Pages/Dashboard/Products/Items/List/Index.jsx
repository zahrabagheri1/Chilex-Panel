import React, { useContext, useEffect, useState } from 'react';
import './List.scss';
import axios from 'axios';
import { HiPlus } from "react-icons/hi2";
import { sortItems } from '../../../../../Data/Sort';
import Table from '../../../../../layout/Table/Table';
import ModalAddProducts from '../../../../../layout/ModalAddProducts/ModalAddProducts';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../../../Components/Input/Input';
import SelectOption from '../../../../../Components/SelectOption/SelectOption';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../../Loading/LoadingContext';
import { LoginContext } from '../../../../Login/LoginContext';

function Index() {
    const [items, setItems] = useState(null);
    const [modal, setModal] = useState(false);
    const [value, setValue] = useState();
    const [cookies] = useCookies(['accessToken']);
    const { loading, setLoading } = useContext(LoadingContext)
    const { goToLoginPage } = useContext(LoginContext);
    const navigate = useNavigate()
    const [filter, setFilter] = useState({
        sku: null,
        itemStatus: null,
        priceStatus: null,
        limit: null,
        offset: null,
        orderBy: null,
    })

    // ${parameters.from === null ||  parameters.from === undefined? "" : "&RegisterDate.min=" + parameters.from}
    //admin-stuff/items-all?sku=rgdrf&itemStatus=2&itemGameId=2&priceStatus=2&limit=2&offset=2&sortBy=2&orderBy=2

    useEffect(() => {
        goToLoginPage(cookies.accessToken);
        reqFilterItem()
    }, [filter])

    const reqFilterItem = () => {
        setLoading(!loading)
        axios.get(`/admin-stuff/items-all?${filter.sku === null || filter.sku === undefined ? '' : "sku=" + filter.sku + '&'}${filter.itemStatus === null || filter.itemStatus === undefined ? '' : "itemStatus=" + filter.itemStatus + '&'}${filter.itemGameId === null || filter.itemGameId === undefined ? '' : "itemGameId=" + filter.itemGameId + '&'}${filter.priceStatus === null || filter.priceStatus === undefined ? '' : "priceStatus=" + filter.priceStatus + '&'}${filter.limit === null || filter.limit === undefined ? '' : "limit=" + filter.limit + '&'}${filter.offset === null || filter.offset === undefined ? '' : "offset=" + filter.offset + '&'}${filter.sortBy === null || filter.sortBy === undefined ? '' : "sortBy=" + filter.sortBy + '&'}${filter.orderBy === null || filter.orderBy === undefined ? '' : "orderBy=" + filter.orderBy}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(
                res => {
                    setItems(res.data.data)
                    setLoading(loading)
                }
            ).catch(
                err => console.log(err)
            )
    }

    const showDetailItem = (id) => {
        navigate(`${id}`)
    }

    const handelOpenModal = () => {
        setModal(true)
    }

    const handlerCloseModal = () => {
        setModal(false)
    }

    const updateOptionData = (name, id) => {
        setFilter((prev) => ({ ...prev, [name]: id }))
    }

    const updateInputData = (e) => {
        setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className='itemList'>
            <div className='top'>
                <div className='filter row'>
                    <div className="col-xl-1 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                        <Input value={value} type={'text'} title={"sku"} placeholder={'sku'} changeInputValue={updateInputData} />
                    </div>

                    <div className="col-xl-1 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                        <SelectOption readOnly={false} value={value} name={'itemStatus'} defaultValue={'itemStatus'} type={'status'} changeOptinValue={updateOptionData}
                            data={[
                                { id: 0, status: 'Active' },
                                { id: 1, status: 'Deactive' },
                            ]}
                        />

                    </div>

                    <div className="col-xl-1 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                        <SelectOption readOnly={false} value={value} name={'itemGameId'} defaultValue={'itemGameId'} type={'status'} changeOptinValue={updateOptionData}
                            data={[
                                { id: 0, status: 'Ludo' },
                                { id: 1, status: 'Uno' },
                                { id: 2, status: 'Backgammon ' },
                                { id: 3, status: 'Soccer' },
                                { id: 4, status: 'Yadzy' },
                            ]}
                        />
                    </div>

                    <div className="col-xl-1 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                        <SelectOption readOnly={false} value={value} name={'itemTypes'} defaultValue={'itemTypes'} type={'status'} changeOptinValue={updateOptionData}
                            data={[
                                { id: 0, status: 'CLOTHES' },
                                { id: 1, status: 'FACE' },
                                { id: 2, status: 'HAIR' },
                                { id: 3, status: 'BEARD' },
                                { id: 4, status: 'EYE' },
                                { id: 5, status: 'EYEBROWS' },
                                { id: 6, status: 'GLASESS' },
                                { id: 7, status: 'MASK' },
                                { id: 8, status: 'HAT' },
                                { id: 9, status: 'DICE_SKIN' },
                                { id: 10, status: 'CARD_SKIN ' },
                                { id: 11, status: 'FLAG_SKIN' },
                                { id: 12, status: 'FORMATION' }
                            ]}
                        />

                    </div>

                    <div className="col-xl-1 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                        <SelectOption readOnly={false} value={value} name={'itemCategories'} defaultValue={'itemCategories'} type={'status'} changeOptinValue={updateOptionData}
                            data={[
                                { id: 0, status: 'ELSE' },
                                { id: 1, status: 'GAME' },
                                { id: 2, status: 'CHARACTER' },
                            ]}
                        />

                    </div>

                    <div className="col-xl-1 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                        <SelectOption readOnly={false} value={value} name={'priceStatus'} defaultValue={'priceStatus'} type={'status'} changeOptinValue={updateOptionData}
                            data={[
                                { id: 0, status: 'Active' },
                                { id: 1, status: 'Deactive' },
                            ]}
                        />
                    </div>

                    {/* <div className="col-xl-1 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                        <Input value={value} type={'text'} title={"limit"} placeholder={'limit'} changeInputValue={updateInputData} />
                    </div>

                    <div className="col-xl-1 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                        <Input value={value} type={'text'} title={"offset"} placeholder={'offset'} changeInputValue={updateInputData} />
                    </div> */}

                    <div className="col-xl-1 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                        <SelectOption readOnly={false} value={value} name={'sortBy'} defaultValue={'createdAt'} type={'status'} changeOptinValue={updateOptionData}
                            data={[
                                { id: 0, status: 'createdAt' },
                                { id: 1, status: 'updatedAt' },
                                { id: 2, status: 'amount' },
                                { id: 3, status: 'id' },
                                { id: 4, status: 'name' },
                                { id: 5, status: 'status' },
                            ]}
                        />
                    </div>

                    <div className="col-xl-1 col-lg-2 col-md-3 col-sm-6 col-xs-12">
                        <SelectOption readOnly={false} value={value} name={'orderBy'} defaultValue={'orderBy'} type={'status'} changeOptinValue={updateOptionData}
                            data={[
                                { id: 0, status: 'DESC' },
                                { id: 1, status: 'ASC' },
                            ]}
                        />
                    </div>

                </div>

                <div className='addItem' onClick={handelOpenModal}>
                    <HiPlus />
                </div>
            </div>

            <ScrollContainer>
                <Table data={items} sort={sortItems} action={true} showDetail={showDetailItem} />
            </ScrollContainer>

            {modal === true ?
                <ModalAddProducts
                    modalTitle={'Add New Item'}
                    data={items}
                    type={'item'}
                    path={'items'}
                    handelerSubmit={handelOpenModal}
                    handlerClose={handlerCloseModal}
                />
                : ''
            }
        </div>

    );
}

export default Index;
