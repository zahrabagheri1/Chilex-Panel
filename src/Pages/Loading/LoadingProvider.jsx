import React, { useContext, useState } from 'react'
import './LoadingProvider.scss';
import { LoadingContext } from './LoadingContext';

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
            <div className={`loadingBox ${loading ? 'active' : ''}`} >

                <div className="waviy">
                    <span style={{"--i":1}}>D</span>
                    <span style={{"--i":2}}>I</span>
                    <span style={{"--i":3}}>A</span>
                    <span style={{"--i":4}}>C</span>
                    <span style={{"--i":5}}>O</span>
                    <span style={{"--i":6}}>-</span>
                    <span style={{"--i":7}}>C</span>
                    <span style={{"--i":8}}>H</span>
                    <span style={{"--i":9}}>I</span>
                    <span style={{"--i":10}}>L</span>
                    <span style={{"--i":11}}>E</span>
                    <span style={{"--i":12}}>X</span>
                </div>
            </div>

            {/* <div className={`loadingBox ${loading ? 'active' : ''}}`}>
                <div className="loader">
                    <div className="circles">
                        <span className="one"></span>
                        <span className="two"></span>
                        <span className="three"></span>
                    </div>
                    <div className="pacman">
                        <span className="top"></span>
                        <span className="bottom"></span>
                        <span className="left"></span>
                        <div className="eye"></div>
                    </div>
                </div>

            </div> */}
        </LoadingContext.Provider >
    )
}

export default LoadingProvider