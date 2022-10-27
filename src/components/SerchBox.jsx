import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'

export const SerchBox = () => {
    const { auth, logout } = useContext(AuthContext)

    return (
        <div className="headind_srch">
            <div className="recent_heading mt-2">
                <h4 className='ps-3'>{auth.name}</h4>
            </div>
            <div className="srch_bar">
                <div className="stylish-input-group">
                    <button
                        className="btn text-danger"
                        onClick={logout}
                    >
                        Salir
                    </button>
                </div>
            </div>
        </div>
    )
}
