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
            <div className='notFound-subtitle'> Not Found</div>
            <div className='notFound-message'>Sorry, the page you are looking for does not exist.</div>
            <button onClick={backBtn} className='notFound-button'>Back</button>
        </div>
    );
}

export default Notfound;
