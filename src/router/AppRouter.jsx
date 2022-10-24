// import React from 'react'
// import {
//     BrowserRouter,
//     Routes,
//     Route,
//     Link
// } from "react-router-dom";
// import ChatPage from '../pages/ChatPage';
// import LoginPage from '../pages/LoginPage';
// import RegisterPage from '../pages/RegisterPage';
// import AuthRouter from './AuthRouter';
// import '../css/login-register.css';
// function AppRouter() {
//     return (
//         <Routes>
//             <Route exact path='/' element={<ChatPage />} />
//             <Route exact path='/auth/login' element={<LoginPage />} />
//             <Route exact path='/auth/register' element={<RegisterPage />} />
//             {/* <Route exact path='/auth/login' element={<AuthRouter id='login'/>} />
//             <Route exact path='/auth/register' element={<AuthRouter id='register'/>} /> */}
//             <Route path='*' element={<div>OPS</div>} />
//         </Routes>
//     )
// }

// export default AppRouter
import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import ChatPage from "../pages/ChatPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AuthRouter from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

const AppRouter = () => {
    const { auth, verificarToken } = useContext(AuthContext);

    useEffect(() => {
        verificarToken();
    }, [verificarToken]);

    if (auth.checking) {
        return <h1>Espere por favor</h1>;
    }

    return (
        <>
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route
                            path="/auth/*"
                            element={
                                <PublicRoute>
                                    <AuthRouter />
                                </PublicRoute>
                            }
                        />

                        <Route
                            path="/*"
                            element={
                                <PrivateRoute>
                                    <ChatPage />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
};

export default AppRouter;
