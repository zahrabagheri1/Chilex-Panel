import React, { useEffect, useState } from 'react';
import { HiPlus } from "react-icons/hi2";
import Table from '../../../../layout/Table/Table';
import { sortHistory } from '../../../../Data/Sort';
import ScrollContainer from 'react-indiana-drag-scroll';
import './List.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Index() {


    // const [history, setHistory] = useState(null)
    const navigate = useNavigate();

    const history = [
        {
            "id": 3,
            "type": 1,
            "amount": 400,
            "referenceType": 0,
            "referenceId": 7,
            "userId": 201,
            "createdAt": "2023-10-30T08:27:32.567Z",
            "username": "688961_dixo",
            "transactionAmount": null,
            "gatewayType": 2
        },
        {
            "id": 2,
            "type": 0,
            "amount": -50,
            "referenceType": 0,
            "referenceId": 7,
            "userId": 201,
            "createdAt": "2023-10-30T08:27:32.527Z",
            "username": "688961_dixo",
            "transactionAmount": null,
            "gatewayType": 2
        },
        {
            "id": 1,
            "type": 1,
            "amount": 25,
            "referenceType": 0,
            "referenceId": 10,
            "userId": 2,
            "createdAt": "2023-10-30T07:53:37.000Z",
            "username": "bot1_L1",
            "transactionAmount": null,
            "gatewayType": 2
        }
    ]

    const showDetailHistory = (id) => {
        navigate(`${id}`)
    }

    console.log(history)
    useEffect(() => {
        axios.get('/shopping-history/all')
            .then(
                res => {
                    // setHistory(res.data.data)
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
