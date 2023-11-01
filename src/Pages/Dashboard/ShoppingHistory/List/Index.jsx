import React, { useEffect, useState } from 'react';
import { HiPlus } from "react-icons/hi2";
import Table from '../../../../layout/Table/Table';
import { sortHistory } from '../../../../Data/Sort';
import ScrollContainer from 'react-indiana-drag-scroll';
import './List.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Index() {
    const [history, setHistory] = useState(null)
    const navigate = useNavigate();

    const showDetailHistory = (id) => {
        navigate(`${id}`)
    }

    console.log(history)
    useEffect(() => {
        axios.get('/shopping-history/all')
            .then(
                res => {
                    setHistory(res.data.data)
                }
            )
            .catch(
                err => console.log(err)
            )
    }, [])
    return (
        <div className='shoppingHistory'>

            <div className='filter'>
            </div>

            <ScrollContainer>
                <Table data={history} sort={sortHistory} action={true} showDetail={showDetailHistory} />
            </ScrollContainer>

        </div>
    );

}

export default Index;
