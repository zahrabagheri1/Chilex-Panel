import React, { useContext, useState } from 'react'
import { LogingContext } from './LoginContext';
import { useNavigate } from 'react-router-dom';
import { LoadingContext } from '../Loading/LoadingContext';

export const LoginProvider = ({ children }) => {
    const navigate = useNavigate();

    const goToLoginPage = (cookie)=>{
        if(cookie === undefined || cookie === null){
            navigate('login')
        }
    }

    return (
        <LogingContext.Provider value={{ goToLoginPage }}>
            {children}
        </LogingContext.Provider>
    )
}

export default LoginProvider