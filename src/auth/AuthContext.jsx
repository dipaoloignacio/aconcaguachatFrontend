import { createContext, useCallback, useContext, useState } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { fetchConToken, fetchSinToken } from '../helpers/fetch'
import { types } from "../types/types";

export const AuthContext = createContext();

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null
};

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(initialState);

    const { dispatch } = useContext(ChatContext)

    const login = async (email, password) => {

        const resp = await fetchSinToken('login', { email, password }, 'POST');

        if (resp.ok) {
            localStorage.setItem('token', resp.token);

            setAuth({
                uid: resp.usuario.uid,
                checking: false,
                logged: true,
                name: resp.usuario.nombre,
                email: resp.usuario.email
            })
        }
        return resp.ok;
    }

    const register = async (email, password, nombre) => {

        const resp = await fetchSinToken('login/new', { nombre, email, password }, 'POST');
        console.log(resp)
        return resp
    }

    const verificarToken = useCallback(async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            setAuth({
                checking: false,
            })
            return false;
        }

        const resp = await fetchConToken('login/renew');

        if (resp.ok) {
            localStorage.setItem('token', resp.token);
            const { user } = resp

            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                name: user.nombre,
                email: user.email
            })
            return true;
        } else {
            (setAuth({
                uid: null,
                checking: false,
                logged: false
            }))
            return false;
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');

        dispatch({
            type: types.cerrarSesion
        })
        
        setAuth({
            checking: false,
            logged: false
        })
    }

    return (
        <AuthContext.Provider value={{
            auth,
            login,
            register,
            verificarToken,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}
