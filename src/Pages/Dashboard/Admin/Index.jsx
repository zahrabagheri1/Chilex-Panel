import React, { useContext, useEffect, useState } from 'react';
import './Admin.scss';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../Loading/LoadingContext';

function Index() {
    const [cookies] = useCookies(['accessToken']);
    const { loading, setLoading } = useContext(LoadingContext)
    const [data, setData] = useState(null);
    // console.log(data[0])
    useEffect(() => {
        setLoading(!loading)
        axios.get('https://retoolapi.dev/DQqY1W/data',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + cookies.accessToken
                }
            })
            .then(
                res => {
                    setData(res.data)
                    setLoading(loading)
                }
            )
            .catch(
                err => {
                    console.log(err)
                }
            )
    }, [])

    return (
        <div className='userPlatform'>
            {data === null ? '' : Object.entries(data[0]).map(([key, value, i]) => (
                <div className='iteme' key={i}>
                    <div className='key'>{`${key}:`}</div>
                    <div className='value'>{value}</div>
                </div>
            ))}
        </div>
    );
}

export default Index;
