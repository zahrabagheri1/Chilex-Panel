import React, { useContext, useState } from 'react'
import './LoadingProvider.scss';
import { LoadingContext } from './LoadingContext';

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
            <div className={`loadingBox ${loading ? 'active' : ''}`}>
                <div className='loading'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </LoadingContext.Provider>
    )
}

export default LoadingProvider