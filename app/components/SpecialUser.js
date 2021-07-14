import React, { useContext } from 'react';
import { useFirebaseContext } from '../context/firebase-context'

export const SpecialUser = () => {
    const { user, isAdmin, isGuest } = useFirebaseContext()

    return (
        <div className="content-container">
            <div className="page-header">
                {isAdmin && <span>You are logged in as an Admin</span>}
                {isGuest && <span>You are logged in as a guest</span>}
            </div>
        </div>
    )
}

export default SpecialUser;