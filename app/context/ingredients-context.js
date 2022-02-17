import React, { useContext, useReducer } from 'react';
import ingredientsReducer from '../reducers/ingredients'

const IngredientsContext = React.createContext()

export const useIngredientsContext = () => useContext(IngredientsContext)

const IngredientsProvider = ({ children }) => {
    const [ingredients, dispatch ] = useReducer(ingredientsReducer, [])

    return (
        <IngredientsContext.Provider value={{ ingredients, dispatch }}>
            {children}
        </IngredientsContext.Provider>
    )
}

export { IngredientsProvider, IngredientsContext as default }