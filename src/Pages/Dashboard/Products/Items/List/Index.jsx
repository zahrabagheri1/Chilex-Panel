import React, { useContext, useEffect, useState } from 'react';
import './List.scss';
import axios from 'axios';
import { HiOutlineTrash, HiPlus } from "react-icons/hi2";
import { sortItems } from '../../../../../Data/Sort';
import Table from '../../../../../layout/Table/Table';
import ModalAddProducts from '../../../../../layout/ModalAddProducts/ModalAddProducts';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../../../Components/Input/Input';
import SelectOption from '../../../../../Components/SelectOption/SelectOption';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../../Loading/LoadingContext';
import { LoginContext } from '../../../../Login/LoginContext';
import { API_URL } from '../../../../../API_URL';
import Button from '../../../../../Components/Button/Button';

function Index() {
    const [items, setItems] = useState(null);
    const [modal, setModal] = useState(false);
    const [value, setValue] = useState();
    const [cookies] = useCookies(['accessToken']);
    const { loading, setLoading } = useContext(LoadingContext)
    const { goToLoginPage } = useContext(LoginContext);
    const [resetFlag, setResetFlag] = useState(false);
    const navigate = useNavigate()
    const [filter, setFilter] = useState({
        sku: null,
        itemStatus: null,
        itemGameId: null,
        itemCategories: null,
        characterItemTypes: null,
        gameItemTypes: null,
        priceStatus: null,
        limit: null,
        offset: null,
        sortBy: 2,
        orderBy: 1,
    })

    useEffect(() => {
        goToLoginPage(cookies.accessToken);
        if (resetFlag) {
            reqFilterItem();
            setResetFlag(false);
        } else {
            reqFilterItem()
        }
    }, [resetFlag])


    const reqFilterItem = () => {
        setLoading(true)
        axios.get(`${API_URL === undefined ? '' : API_URL}/admin-stuff/items-all?${filter.sku === null || filter.sku === undefined ? '' : "sku=" + filter.sku + '&'}${filter.itemStatus === null || filter.itemStatus === undefined ? '' : "itemStatus=" + filter.itemStatus + '&'}${filter.itemGameId === null || filter.itemGameId === undefined ? '' : "itemGameId=" + filter.itemGameId + '&'}${filter.priceStatus === null || filter.priceStatus === undefined ? '' : "priceStatus=" + filter.priceStatus + '&'}${filter.limit === null || filter.limit === undefined ? '' : "limit=" + filter.limit + '&'}${filter.offset === null || filter.offset === undefined ? '' : "offset=" + filter.offset + '&'}${filter.sortBy === null || filter.sortBy === undefined ? '' : "sortBy=" + filter.sortBy + '&'}${filter.orderBy === null || filter.orderBy === undefined ? '' : "orderBy=" + filter.orderBy}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(
                res => {
                    setItems(res.data.data)
                    setLoading(false)
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

    const resetFillters = () => {
        setFilter({
            sku: null,
            itemStatus: null,
            priceStatus: null,
            limit: null,
            offset: null,
            orderBy: null,
        })
        setResetFlag(true);
    }

    const filterhandler = () => {
        reqFilterItem()
    }

    return (
        <div className='itemList'>
            <div className='top'>
                <div className='filter'>
                    <Input  classname={'filerinput'} value={filter.sku} type={'text'} placeholder={'sku'} name={'sku'} changeInputValue={updateInputData} />

                    <SelectOption  classnameBox={'filerinput'} readOnly={false} value={filter.itemStatus} name={'itemStatus'} defaultValue={'itemStatus'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'Active' },
                            { id: 1, status: 'Deactive' },
                        ]}
                    />

                    <SelectOption  classnameBox={'filerinput'} readOnly={false} value={filter.itemGameId} name={'itemGameId'} defaultValue={'itemGameId'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'Ludo' },
                            { id: 1, status: 'Uno' },
                            { id: 2, status: 'Backgammon ' },
                            { id: 3, status: 'Soccer' },
                            { id: 4, status: 'Yadzy' },
                        ]}
                    />

                    <SelectOption  classnameBox={'filerinput'} readOnly={false} value={filter.characterItemTypes} name={'characterItemTypes'} defaultValue={'characterItemTypes'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'CLOTHES' },
                            { id: 1, status: 'FACE' },
                            { id: 2, status: 'HAIR' },
                            { id: 3, status: 'BEARD' },
                            { id: 4, status: 'EYE' },
                            { id: 5, status: 'EYEBROWS' },
                            { id: 6, status: 'GLASESS' },
                            { id: 7, status: 'MASK' },
                            { id: 8, status: 'HAT' }
                        ]}
                    />

                    <SelectOption  classnameBox={'filerinput'} readOnly={false} value={filter.gameItemTypes} name={'gameItemTypes'} defaultValue={'gameItemTypes'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'DICE_SKIN' },
                            { id: 1, status: 'CARD_SKIN ' },
                            { id: 2, status: 'FLAG_SKIN' },
                            { id: 3, status: 'FORMATION' }
                        ]}
                    />

                    <SelectOption  classnameBox={'filerinput'} readOnly={false} value={filter.itemCategories} name={'itemCategories'} defaultValue={'itemCategories'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'ELSE' },
                            { id: 1, status: 'GAME' },
                            { id: 2, status: 'CHARACTER' },
                        ]}
                    />

                    <SelectOption  classnameBox={'filerinput'} readOnly={false} value={filter.priceStatus} name={'priceStatus'} defaultValue={'priceStatus'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'Active' },
                            { id: 1, status: 'Deactive' },
                        ]}
                    />

                    <SelectOption  classnameBox={'filerinput'} readOnly={false} value={filter.sortBy} name={'sortBy'} defaultValue={'id'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'createdAt' },
                            { id: 1, status: 'updatedAt' },
                            { id: 2, status: 'id' },
                            { id: 3, status: 'name' },
                            { id: 4, status: 'status' }
                        ]}
                    />

                    <SelectOption  classnameBox={'filerinput'} readOnly={false} value={filter.orderBy} name={'orderBy'} defaultValue={'ASC'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'DESC' },
                            { id: 1, status: 'ASC' },
                        ]}
                    />
                    <SelectOption classnameBox={'filerinput'} readOnly={false} value={filter.limit} name={'limit'} defaultValue={'15'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 15, status: 15 },
                            { id: 20, status: 20 },
                            { id: 25, status: 25 },
                            { id: 30, status: 30 },
                        ]}
                    />

                    <Button title={'Filter'} className={'filterBtn'} classnameBtn={'filterBtnBox'} btnhandler={filterhandler} />

                    <div className="resetFillters" onClick={resetFillters}>
                        <HiOutlineTrash />
                    </div>
                </div>

                <div className='addItem' onClick={handelOpenModal}>
                <HiPlus className='icon' />
                    <div>Add Items</div>
                </div>
            </div>

            <Table data={items} sort={sortItems} action={true} showDetail={showDetailItem} />

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
