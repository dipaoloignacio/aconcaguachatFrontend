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
