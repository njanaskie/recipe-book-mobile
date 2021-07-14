// import React, { useContext } from 'react'
// import { Route, Redirect } from 'react-router-dom';
// import Header from '../components/Header';
// import SpecialUser from '../components/SpecialUser'
// import FirebaseContext from '../context/firebase-context'

// export const AdminRoute = ({
//     component: Component,
//     ...rest
// }) => {
//     const { user, isAdmin, isGuest } = useContext(FirebaseContext)

//     return (
//         <Route {...rest} component={(props) => (
//             ((!!isAdmin || !!isGuest) && !!user) ? (
//                 <div>
//                     <Header />
//                     <SpecialUser />
//                     <Component {...props}/>
//                 </div>
//             ) : (
//                 <Redirect to='/' />
//             )
//         )}/>
//     )
//     }

// export default AdminRoute;