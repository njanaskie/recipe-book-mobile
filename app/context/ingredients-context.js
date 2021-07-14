import React, { useContext, useReducer } from 'react';
import ingredientsReducer from '../reducers/ingredients'
import database from '../firebase/firebase'

const IngredientsContext = React.createContext()

export const useIngredientsContext = () => useContext(IngredientsContext)

const IngredientsProvider = ({ children }) => {
    const [ingredients, dispatch ] = useReducer(ingredientsReducer, [])

    const removeIngredient = ({ id } = {}) => {
        return database.collection('ingredients').doc(id).delete().then(() => {
            dispatch({ type: 'REMOVE_INGREDIENT', id })
        });
    };

    const addIngredient = (ingredient) => {
        database.collection('ingredients').add(ingredient).then((ref) => {
            dispatch(({ type: 'ADD_INGREDIENT', ingredient: {id: ref.key, ...ingredient} }))
        })
    }

    return (
        <IngredientsContext.Provider value={{ ingredients, dispatch, removeIngredient, addIngredient }}>
            {children}
        </IngredientsContext.Provider>
    )
}

export { IngredientsProvider, IngredientsContext as default }