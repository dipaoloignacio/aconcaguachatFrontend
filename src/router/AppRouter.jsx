import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import ChatPage from "../pages/ChatPage";
import AuthRouter from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

const AppRouter = () => {
  const { auth, verificarToken } = useContext(AuthContext);

  useEffect(() => {
    verificarToken();
  }, [verificarToken]);

  if (auth.checking) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="spinner" />
      </div>
    );
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
