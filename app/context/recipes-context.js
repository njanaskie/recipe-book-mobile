import React, { useContext, useReducer } from 'react';
import recipesReducer from '../reducers/recipes'
import database from '../firebase/firebase'
import uuid from 'uuid'
import { useFirebaseContext } from './firebase-context'


const RecipesContext = React.createContext()

export const useRecipesContext = () => useContext(RecipesContext)

const RecipesProvider = ({ children }) => {
    const { user } = useFirebaseContext() 
    const [recipes, recipeDispatch] = useReducer(recipesReducer, [])
    const customId = uuid()

    const addRecipe = (recipe) => {
        database.collection('users').doc(user.uid).collection('recipes').doc(customId).set(recipe).then(() => {
            recipeDispatch({ type: 'ADD_RECIPE', recipe: {id: customId, ...recipe} })
        })
    }

    const editRecipe = (id, updates) => {
        database.collection('users').doc(user.uid).collection('recipes').doc(id).update(updates).then(() => {
            recipeDispatch({ type: 'EDIT_RECIPE', id, updates })
        })
    }

    const removeRecipe = (id) => {
        database.collection('users').doc(user.uid).collection('recipes').doc(id).delete().then(() => {
            recipeDispatch({ type: 'REMOVE_RECIPE', id })
        })
    }

    return (
        <RecipesContext.Provider value={{ recipes, recipeDispatch, addRecipe, editRecipe, removeRecipe }}>
            {children}
        </RecipesContext.Provider>
    )
}

export { RecipesProvider, RecipesContext as default }