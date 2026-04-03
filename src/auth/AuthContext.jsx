import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

import imgProfile1 from "../img/users-profile/profile1.png";
import imgProfile2 from "../img/users-profile/profile2.png";
import imgProfile3 from "../img/users-profile/profile3.png";
import imgProfile4 from "../img/users-profile/profile4.png";

const imgProfile = [
  { src: imgProfile1 },
  { src: imgProfile2 },
  { src: imgProfile3 },
  { src: imgProfile4 },
];

export const AuthContext = createContext();

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);

  const { dispatch } = useContext(ChatContext);

  const login = async (email, password) => {
    const resp = await fetchSinToken("login", { email, password }, "POST");

    if (resp.ok) {
      localStorage.setItem("token", resp.token);

      setAuth({
        uid: resp.usuario.uid,
        checking: false,
        logged: true,
        name: resp.usuario.nombre,
        email: resp.usuario.email,
      });
    }
    return resp.ok;
  };

  const register = async (email, password, nombre) => {
    const resp = await fetchSinToken(
      "login/new",
      { nombre, email, password },
      "POST",
    );
    console.log(resp);
    return resp;
  };

  const verificarToken = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuth({
        checking: false,
      });
      return false;
    }

    const resp = await fetchConToken("login/renew");

    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      const { user } = resp;

      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.nombre,
        email: user.email,
      });
      return true;
    } else {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
      });
      return false;
    }
  }, []);

  const avatarMap = useRef(new Map())

  const getAvatar = (uid) => {
    if (!uid) return imgProfile[0].src  // fallback si uid es undefined
    if (!avatarMap.current.has(uid)) {
      const randomSrc = imgProfile[Math.floor(Math.random() * imgProfile.length)].src
      avatarMap.current.set(uid, randomSrc)
    }
    return avatarMap.current.get(uid)
  }

  const logout = () => {
    localStorage.removeItem("token");

    dispatch({
      type: types.cerrarSesion,
    });

    setAuth({
      checking: false,
      logged: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        register,
        verificarToken,
        logout,
        getAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
