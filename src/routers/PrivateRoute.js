import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import FirebaseContext from '../../context/firebase-context'

export const PrivateRoute = ({
    component: Component,
    ...rest
}) => {
    const { user } = useContext(FirebaseContext)

    return (
        <Route {...rest} component={(props) => (
            !!user ? (
                <div>
                    <Header />
                    <Component {...props}/>
                </div>
            ) : (
                <Redirect to='/' />
            )
        )}/>
    )
    }

export default PrivateRoute;