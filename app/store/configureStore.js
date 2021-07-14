import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth'
import ingredientsReducer from '../reducers/ingredients'
import filtersReducer from '../reducers/filters'
import recipesReducer from '../reducers/recipes'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            ingredients: ingredientsReducer,
            filters: filtersReducer,
            recipes: recipesReducer,
            auth: authReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store
}


