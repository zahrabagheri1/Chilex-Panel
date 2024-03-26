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
import ButtonActionBlue from '../../../../../Components/ButtonActionBlue/ButtonActionBlue';
import ButtonActionGray from '../../../../../Components/ButtonActionGray/ButtonActionGray';
import { HiOutlineFilter } from 'react-icons/hi';

function Index() {
    const [itemList, setItemList] = useState(null);
    const [modal, setModal] = useState(false);
        const [cookies, setCookies, removeCookie] = useCookies(['accessToken'])

    const { loading, setLoading } = useContext(LoadingContext)
    const { goToLoginPage } = useContext(LoginContext);
    const [resetFlag, setResetFlag] = useState(false);
    const [filterBox, setFilterBox] = useState(false);
    const navigate = useNavigate()
    const [filters, setFilters] = useState({
        sku: null,
        itemStatus: null,
        itemGameId: null,
        itemCategories: null,
        characterItemTypes: null,
        gameItemTypes: null,
        priceStatus: null,
         limit: 20,
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
        setFilterBox(false)
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
                err => {
                    if (err.response.data.statusCode === 401 && err.response.data.message === "Unauthorized") {
                      removeCookie('accessToken', {
                        expires: 'Thu, 01 Jan 1970 00:00:00 UTC',
                      })
                      navigate('/')
                    } else {
                      console.log(err)
          
                    }
                  }
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
             limit: 20,
            offset: 1,
            orderBy: 1,
            sortBy: 2,
        })
        setResetFlag(true);
        setFilterBox(false);
    }

    return (
        <div className='itemList'>
            <div className='top'>

                <div className="filterBox">
                    <div className='filterBtn' onClick={() => setFilterBox(!filterBox)}>
                        <HiOutlineFilter className='icon' />
                        <div>Filter</div>
                    </div>

                    <div className={`filter row ${filterBox ? 'activeFilter' : ''}`}>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <Input name={'sku'} type={'text'} title={'sku'} placeholder={'sku'} value={filters.sku} changeInputValue={updateInputData} />
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption readOnly={false} value={filters.itemStatus} name={'itemStatus'} title={'itemStatus'} defaultValue={'itemStatus'} type={'status'} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'Active' },
                                    { id: 1, status: 'Deactive' },
                                ]}
                            />
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption readOnly={false} value={filters.itemGameId} name={'itemGameId'} title={'itemGameId'} defaultValue={'itemGameId'} type={'status'} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'Ludo' },
                                    { id: 1, status: 'Uno' },
                                    { id: 2, status: 'Backgammon ' },
                                    { id: 3, status: 'Soccer' },
                                    { id: 4, status: 'Yadzy' },
                                ]}
                            />
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption readOnly={false} value={filters.characterItemTypes} name={'characterItemTypes'} title={'characterItemTypes'} defaultValue={'characterItemTypes'} type={'status'} changeOptinValue={updateOptionData}
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
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption readOnly={false} value={filters.gameItemTypes} name={'gameItemTypes'} title={"gameItemTypes"} defaultValue={'gameItemTypes'} type={'status'} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'DICE_SKIN' },
                                    { id: 1, status: 'CARD_SKIN ' },
                                    { id: 2, status: 'FLAG_SKIN' },
                                    { id: 3, status: 'FORMATION' }
                                ]}
                            />
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption readOnly={false} value={filters.itemCategories} name={'itemCategories'} title={"itemCategories"} defaultValue={'itemCategories'} type={'status'} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'ELSE' },
                                    { id: 1, status: 'GAME' },
                                    { id: 2, status: 'CHARACTER' },
                                ]}
                            />
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption readOnly={false} value={filters.priceStatus} name={'priceStatus'} title={'priceStatus'} defaultValue={'priceStatus'} type={'status'} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'Active' },
                                    { id: 1, status: 'Deactive' },
                                ]}
                            />
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption readOnly={false} name={'sortBy'} title={'sortBy'} defaultValue={'id'} type={'status'} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'createdAt' },
                                    { id: 1, status: 'updatedAt' },
                                    { id: 2, status: 'id' },
                                    { id: 3, status: 'name' },
                                    { id: 4, status: 'status' }
                                ]}
                            />
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption readOnly={false} name={'orderBy'} defaultValue={'ASC'} title={'orderBy'} type={'status'} changeOptinValue={updateOptionData}
                                data={[
                                    { id: 0, status: 'DESC' },
                                    { id: 1, status: 'ASC' },
                                ]}
                            />
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
                            <SelectOption readOnly={false} value={filters.limit} name={'limit'} title={'limit'} defaultValue={'20'} type={'status'} changeOptinValue={updateOptionDataForLimit}
                                data={[
                                    { id: 15, status: 15 },
                                    { id: 20, status: 20 },
                                    { id: 40, status: 40 },
                                    { id: 60, status: 60 },
                                    { id: 80, status: 80 },
                                    { id: 100, status: 100 },
                                ]}
                            />
                        </div>

                        <div className="filterResetBtn col-xl-12 col-lg-12 col-md-12 col-ms-12 col-xs-12">
                            <ButtonActionBlue title={'Filter'} classnameBtn={'filterBtnBox'} handler={reqFiltersItem} />
                            <ButtonActionGray title={'Reset Filter'} classnameBtn={'filterBtnBox'} handler={resetFillters} />
                        </div>
                    </div>
                </div>

                <div className='addItemBtn' onClick={() => setModal(true)}>
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
