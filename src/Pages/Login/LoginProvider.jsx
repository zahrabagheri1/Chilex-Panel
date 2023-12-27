import React from 'react'
import { LoginContext } from './LoginContext';
import { useNavigate } from 'react-router-dom';

export const LoginProvider = ({ children }) => {
    const navigate = useNavigate();

    const goToLoginPage = (cookie) => {
        if (cookie === undefined || cookie === null) {
            navigate('login')
        }
    }

    return (
        <LoginContext.Provider value={{ goToLoginPage }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginProvider