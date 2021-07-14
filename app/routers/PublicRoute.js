// import React, { useContext } from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import FirebaseContext from '../context/firebase-context'

// export const PublicRoute = ({
//     component: Component,
//     ...rest
// }) => {
//     const { user } = useContext(FirebaseContext)

//     return (
//         <Route {...rest} component={(props) => (
//             !!user ? (
//                 <Redirect to='/home' />
//             ) : (
//                 <Component {...props}/>
//             )
//         )}/>
//     )
// }

// export default PublicRoute;