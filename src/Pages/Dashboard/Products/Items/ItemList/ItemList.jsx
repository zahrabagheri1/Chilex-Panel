import React, { useEffect, useState } from 'react';
import './ItemList.scss';
import axios from 'axios';
import { HiPlus } from "react-icons/hi2";
import { sortItems } from '../../../../../Data/Sort';
import Table from '../../../../../layout/Table/Table';
import Modal from '../../../../../layout/Modal/Modal';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useNavigate, useParams } from 'react-router-dom';

function ItemList() {

    const [items, setItems] = useState([]);
    const [modal, setModal] = useState(false);
    const [detailItem, setDetailItem] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/admin-stuff/items-all')
            .then((res) => {
                // console.log(res.data.data)
                setItems(res.data.data)
            })
            .catch(err => console.log(err))
    }, [])

    const showDetailItem = (id) => {
        navigate(`${id}`)
    }

    const handelOpenModal = () => {
        setModal(true)
    }

    const handlerCloseModal = () => {
        setModal(false)
    }


    return (
        <div className='item'>
            <div className='top'>
                <div className='filter'>
                </div>

                <div className='addItem' onClick={handelOpenModal}>
                    <HiPlus className='icon' />
                </div>
            </div>

            <ScrollContainer>
                <Table data={items} sort={sortItems} action={true} showDetail={showDetailItem} />
            </ScrollContainer>

            {modal === true ?
                <div className="modalBandel">
                    <Modal
                        modalTitle={'Add New Item'}
                        data={items}
                        path={'items'}
                        handelerSubmit={handelOpenModal}
                        handlerClose={handlerCloseModal}
                    />
                </div>

                : ''
            }
        </div>

    );
}

export default ItemList;
