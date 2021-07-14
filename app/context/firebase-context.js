import React, { useEffect, useState, useContext, useReducer } from 'react';
import database, { firebase, googleAuthProvider } from '../firebase/firebase';
// import { history } from '../routers/AppRouter';
import authReducer from '../reducers/auth'
import LoadingScreen from '../components/LoadingScreen'

const FirebaseContext = React.createContext()

export const useFirebaseContext = () => useContext(FirebaseContext)

const FirebaseProvider = ({ children }) => {
    const [auth, authDispatch] = useReducer(authReducer, [])
    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(true)
    // const [isAdmin, setIsAdmin] = useState()
    // const [isGuest, setIsGuest] = useState()
    // const email = process.env.GUEST_EMAIL
    // const password = process.env.GUEST_PASSWORD

    // const login = () => {
    //     firebase.auth().signInWithPopup(googleAuthProvider).then(() => {
    //         authDispatch({ type: 'LOGIN' })
    //     })
    // }

    // const loginAsGuest = () => {
    //     firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
    //         authDispatch({ type: 'LOGIN_AS_GUEST' })
    //     })
    // }

    // const logout = () => {
    //     firebase.auth().signOut().then(() => {
    //         authDispatch({ type: 'LOGOUT' })
    //     });
    // }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            setUser(user)
            setLoading(false)
            // setIsAdmin()
            // setIsGuest()
        })

        return () => unsubscribe()
    }, [])

    // useEffect(() => {
    //     if (user) {
    //         database.collection('users').doc(user.uid).get()
    //         .then((doc) => {
    //             const userData = doc.data()
    //             if (userData) {
    //                 if (userData.isAdmin === true) {
    //                     const isAdmin = userData.isAdmin
    //                     setIsAdmin(isAdmin)
    //                 } else if (userData.isGuest === true) {
    //                     const isGuest = userData.isGuest
    //                     setIsGuest(isGuest)
    //                 }
    //             }
    //         })
    //     }
    // }, [user])

    // if (loading) {
    //     return <LoadingScreen />
    // }
    // if (user) {
    //     if (history.location.pathname === '/') {
    //         history.push('/home')
    //     }
    // } else {
    //     history.push('/');
    // }

    return (
        <FirebaseContext.Provider value={{ user, loading }}>
            {children}
        </FirebaseContext.Provider>
    )
}

export { FirebaseProvider, FirebaseContext as default }