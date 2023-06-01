import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import Registration from "./pages/registration.jsx";
import {RequireAuth} from "react-auth-kit";
import Dashboard from "./pages/dashboard.jsx";
import Logout from "./pages/logout.jsx";

const App = () => {

    return (
        <>
            <Routes>
                <Route exact path={'/'} element={<Home/>}/>
                <Route path={'/auth/login'} element={<Login/>}/>
                <Route path={'/auth/registration'} element={<Registration/>}/>
                <Route path={'/logout'} element={<Logout />} />

                <Route path={'/profile'} element={
                    <RequireAuth loginPath={'/auth/login'}>
                        <Dashboard />
                    </RequireAuth>
                }/>
            </Routes>
        </>
    );
};

export default App;