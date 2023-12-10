import React from 'react';
import './Notfound.scss';
import { useNavigate } from 'react-router-dom';

function Notfound() {
    const navigate = useNavigate()
    const backBtn = () => {
        navigate('dashboard')
    }
    return (
        <div className='notFound'>
                <div className='notFound-title'>404</div>
                <div className='notFound-subtitle' onClick={backBtn}>This page is not found</div>
        </div>
    );
}

export default Notfound;
