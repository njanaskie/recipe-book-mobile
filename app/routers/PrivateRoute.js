// import React, { useContext } from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import Header from '../components/Header';
// import FirebaseContext from '../context/firebase-context'
// import SpecialUserRoute from '../components/SpecialUser'

// export const PrivateRoute = ({
//     component: Component,
//     ...rest
// }) => {
//     const { user } = useContext(FirebaseContext)


//     return (
//         <Route {...rest} component={(props) => (
//             !!user ? (
//                 <div>
//                     <Header />
//                     <SpecialUserRoute />
//                     <Component {...props}/>
//                 </div>
//             ) : (
//                 <Redirect to='/' />
//             )
//         )}/>
//     )
//     }

// export default PrivateRoute;