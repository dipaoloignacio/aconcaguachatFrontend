import React, { useContext, useEffect } from 'react'
import { Navigate, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import '../css/login-register.css';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

function AuthRouter() {

    const { auth } = useContext(AuthContext)

    if (auth.checking) {
        return <h1>Espere porfavor</h1>
    }

    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-t-50 p-b-90">
                    <Routes>
                        <Route excat path="login" element={<LoginPage />} />
                        <Route excat path="register" element={<RegisterPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default AuthRouter