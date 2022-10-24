import { types } from "../../types/types";


export const chatReducer = (state, action) => {

    switch (action.type) {
        case (types.usersCargados):
            return {
                ...state,
                users: [...action.payload]
            }

        case (types.activarChat):
            if (state.chatActive === action.payload) return state;
            return {
                ...state,
                chatActive: action.payload,
                msg: []
            }
        case (types.nuevoMensaje):
            if (state.chatActive === action.payload.from || state.chatActive === action.payload.to) {
                return {
                    ...state,
                    msg: [...state.msg, action.payload]
                }
            } else {
                return state
            }
        case (types.cerrarSesion):
            return {
                uid: '',
                chatActive: null,
                users: [],
                msg: []
            }

        case (types.cargarMsg):
            return {
                ...state,
                msg: [...action.payload]
            }
        default:
            return state;
    }
}