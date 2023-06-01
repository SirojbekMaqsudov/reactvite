import {useEffect} from 'react';
import api from "../http/api.js";
import {useIsAuthenticated, useSignOut} from "react-auth-kit";
import {useNavigate} from "react-router-dom";

const Logout = () => {
    const logout = useSignOut()
    const navigate = useNavigate()
    const isAuthenticated = useIsAuthenticated()

    useEffect(() => {
        if(isAuthenticated()){
            api.post('/auth/logout', {refreshToken: `${localStorage.getItem('_auth_refresh')}`}).then(() => {
                logout()
                return navigate('/')
            })
        }
    }, [])

    return (
        <></>
    );
};

export default Logout;