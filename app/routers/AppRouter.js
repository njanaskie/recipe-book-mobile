// import React from 'react';
// import { Router, Route, Switch } from 'react-router-dom';
// import createHistory from 'history/createBrowserHistory';
// import NotFoundPage from '../components/NotFoundPage';
// import LoginPage from '../components/LoginPage';
// import PrivateRoute from './PrivateRoute';
// import PublicRoute from './PublicRoute';
// import SpecialUserRoute from './SpecialUserRoute'
// import IngredientsPage from '../components/IngredientsPage';
// import HomePage from '../components/HomePage';

// export const history = createHistory();

// const AppRouter = () => (
//     <Router history={history}>
//         <div>
//             <Switch>
//                 <PublicRoute path='/' component={LoginPage} exact={true}/>
//                 <PrivateRoute path='/home' component={HomePage} />
//                 <SpecialUserRoute path='/ingredients' component={IngredientsPage} />
//                 <Route component={NotFoundPage}/>
//             </Switch>
//         </div>
//     </Router>
// )

// export default AppRouter;