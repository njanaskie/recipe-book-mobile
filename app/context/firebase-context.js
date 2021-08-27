import React, { useEffect, useState, useContext, useReducer } from 'react';
import { firebase } from '../firebase/firebase';
import authReducer from '../reducers/auth'

const FirebaseContext = React.createContext()

export const useFirebaseContext = () => useContext(FirebaseContext)

const FirebaseProvider = ({ children }) => {
    const [auth, authDispatch] = useReducer(authReducer, [])
    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            setUser(user)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    return (
        <FirebaseContext.Provider value={{ user, loading }}>
            {children}
        </FirebaseContext.Provider>
    )
}

export { FirebaseProvider, FirebaseContext as default }