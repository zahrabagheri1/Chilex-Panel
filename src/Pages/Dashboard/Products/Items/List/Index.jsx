import React, { useContext, useEffect, useState } from 'react';
import './List.scss';
import axios from 'axios';
import { HiOutlineTrash, HiPlus } from "react-icons/hi2";
import { sortItems } from '../../../../../Data/Sort';
import Table from '../../../../../layout/Table/Table';
import ModalAddProducts from '../../../../../layout/ModalAddProducts/ModalAddProducts';
import { useNavigate } from 'react-router-dom';
import Input from '../../../../../Components/Input/Input';
import SelectOption from '../../../../../Components/SelectOption/SelectOption';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../../Loading/LoadingContext';
import { LoginContext } from '../../../../Login/LoginContext';
import { API_URL } from '../../../../../API_URL';
import Button from '../../../../../Components/Button/Button';

function Index() {
    const [itemList, setItemList] = useState(null);
    const [modal, setModal] = useState(false);
    const [cookies] = useCookies(['accessToken']);
    const { loading, setLoading } = useContext(LoadingContext)
    const { goToLoginPage } = useContext(LoginContext);
    const [resetFlag, setResetFlag] = useState(false);
    const navigate = useNavigate()
    const [filters, setFilters] = useState({
        sku: null,
        itemStatus: null,
        itemGameId: null,
        itemCategories: null,
        characterItemTypes: null,
        gameItemTypes: null,
        priceStatus: null,
        limit: 15,
        offset: 1,
        sortBy: 2,
        orderBy: 1,
    })

    useEffect(() => {
        goToLoginPage(cookies.accessToken);
        if (resetFlag) {
            reqFiltersItem();
            setResetFlag(false);
        } else {
            reqFiltersItem()
        }
    }, [resetFlag])


    const reqFiltersItem = () => {
        setLoading(true)
        axios.get(`${API_URL === undefined ? '' : API_URL}/admin-stuff/items-all?${filters.sku === null || filters.sku === undefined ? '' : "sku=" + filters.sku + '&'}${filters.itemStatus === null || filters.itemStatus === undefined ? '' : "itemStatus=" + filters.itemStatus + '&'}${filters.itemGameId === null || filters.itemGameId === undefined ? '' : "itemGameId=" + filters.itemGameId + '&'}${filters.priceStatus === null || filters.priceStatus === undefined ? '' : "priceStatus=" + filters.priceStatus + '&'}${filters.limit === null || filters.limit === undefined ? '' : "limit=" + filters.limit + '&'}${filters.offset === null || filters.offset === undefined ? '' : "offset=" + filters.offset + '&'}${filters.sortBy === null || filters.sortBy === undefined ? '' : "sortBy=" + filters.sortBy + '&'}${filters.orderBy === null || filters.orderBy === undefined ? '' : "orderBy=" + filters.orderBy}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(
                res => {
                    setItemList(res.data)
                    setLoading(false)
                }
            ).catch(
                err => console.log(err)
            )
    }

    const showDetailItem = (id) => {
        navigate(`${id}`)
    }

    const updateOptionData = (name, id) => {
        setFilters((prev) => ({ ...prev, [name]: id }))
    }

    const updateOptionDataForLimit = (name, id) => {
        setFilters((prev) => ({ ...prev, [name]: id, 'offset': 1 }))
        setResetFlag(true)
    }

    const updateInputData = (e) => {
        setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const offsetTableHandler = (page) => {
        setFilters((prev) => ({ ...prev, 'offset': page }))
        setResetFlag(true)
    }

    const resetFillters = () => {
        setFilters({
            sku: null,
            itemStatus: null,
            priceStatus: null,
            limit: 15,
            offset: 1,
            orderBy: 1,
            sortBy: 2,
        })
        setResetFlag(true);
    }

    return (
        <div className='itemList'>
            <div className='top'>
                <div className='filters'>
                    <Input  
 value={filters.sku} type={'text'} placeholder={'sku'} name={'sku'} changeInputValue={updateInputData} />

                    <SelectOption classnameBox={'filerinput'} readOnly={false} value={filters.itemStatus} name={'itemStatus'} defaultValue={'itemStatus'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'Active' },
                            { id: 1, status: 'Deactive' },
                        ]}
                    />

                    <SelectOption classnameBox={'filerinput'} readOnly={false} value={filters.itemGameId} name={'itemGameId'} defaultValue={'itemGameId'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'Ludo' },
                            { id: 1, status: 'Uno' },
                            { id: 2, status: 'Backgammon ' },
                            { id: 3, status: 'Soccer' },
                            { id: 4, status: 'Yadzy' },
                        ]}
                    />

                    <SelectOption classnameBox={'filerinput'} readOnly={false} value={filters.characterItemTypes} name={'characterItemTypes'} defaultValue={'characterItemTypes'} type={'status'} changeOptinValue={updateOptionData}
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

                    <SelectOption classnameBox={'filerinput'} readOnly={false} value={filters.gameItemTypes} name={'gameItemTypes'} defaultValue={'gameItemTypes'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'DICE_SKIN' },
                            { id: 1, status: 'CARD_SKIN ' },
                            { id: 2, status: 'FLAG_SKIN' },
                            { id: 3, status: 'FORMATION' }
                        ]}
                    />

                    <SelectOption classnameBox={'filerinput'} readOnly={false} value={filters.itemCategories} name={'itemCategories'} defaultValue={'itemCategories'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'ELSE' },
                            { id: 1, status: 'GAME' },
                            { id: 2, status: 'CHARACTER' },
                        ]}
                    />

                    <SelectOption classnameBox={'filerinput'} readOnly={false} value={filters.priceStatus} name={'priceStatus'} defaultValue={'priceStatus'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'Active' },
                            { id: 1, status: 'Deactive' },
                        ]}
                    />

                    <SelectOption classnameBox={'filerinput'} readOnly={false} value={filters.sortBy} name={'sortBy'} defaultValue={'id'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'createdAt' },
                            { id: 1, status: 'updatedAt' },
                            { id: 2, status: 'id' },
                            { id: 3, status: 'name' },
                            { id: 4, status: 'status' }
                        ]}
                    />

                    <SelectOption classnameBox={'filerinput'} readOnly={false} value={filters.orderBy} name={'orderBy'} defaultValue={'ASC'} type={'status'} changeOptinValue={updateOptionData}
                        data={[
                            { id: 0, status: 'DESC' },
                            { id: 1, status: 'ASC' },
                        ]}
                    />

                    <SelectOption classnameBox={'filerinput'} readOnly={false} value={filters.limit} name={'limit'} defaultValue={'15'} type={'status'} changeOptinValue={updateOptionDataForLimit}
                        data={[
                            { id: 15, status: 15 },
                            { id: 20, status: 20 },
                            { id: 30, status: 30 },
                            { id: 40, status: 40 },
                            { id: 50, status: 50 },
                            { id: 60, status: 60 },
                        ]}
                    />
                    <Button title={'Filters'} className={'filterBtn'} classnameBtn={'filterBtnBox'} btnhandler={() => reqFiltersItem()} />

                    <div className="resetFillters" onClick={resetFillters}>
                        <HiOutlineTrash />
                    </div>
                </div>

                <div className='addItem' onClick={() => setModal(true)}>
                    <HiPlus className='icon' />
                    <div>Add Items</div>
                </div>
            </div>

            <Table data={itemList?.data} sort={sortItems} action={true} list={itemList} offsetTable={offsetTableHandler} showDetail={showDetailItem} />

            {modal === true ?
                <ModalAddProducts
                    modalTitle={'Add New Item'}
                    data={itemList?.data}
                    type={'item'}
                    path={'items'}
                    handelerSubmit={() => setModal(true)}
                    handlerClose={() => setModal(false)}
                />
                : ''
            }
        </div>

    );
}

export default Index;
