import React, { useEffect, useState } from 'react';
import Table from '../../../../layout/Table/Table';
import { adminTransaction } from '../../../../Data/Sort';
import { ScrollContainer } from 'react-indiana-drag-scroll';
import 'react-indiana-drag-scroll/dist/style.css';
import './TransactionList.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function TransactionList() {

    const [transaction, setTransaction] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/admin-transaction/all',
            {
                limit: parseInt(10),
                offset: parseInt(1)
            }).then((res) => {
                setTransaction(res.data.data)
                //   console.log(res.data.data)

            }).catch(err => {
                console.log(err)
            })
    }, [])

    const showDetailTransaction = (id) => {
        navigate(`${id}`)
    }

    return (
        <div className='transaction'>
            <div className='filter'>

            </div>

            <ScrollContainer>
                <Table data={transaction} sort={adminTransaction} action={true} showDetail={showDetailTransaction} />
            </ScrollContainer>
        </div>
    );
}

export default TransactionList;
