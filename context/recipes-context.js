import React, { useContext, useReducer } from 'react';
import recipesReducer from '../src/reducers/recipes'
import useAllRecipes from '../src/hooks/useAllRecipes'
import database from '../src/firebase/firebase'
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

    // React.useEffect(() => {
    //     const fetchData =
    //         database.collection('users').doc(user.uid).collection('recipes')
    //         .orderBy('createdAt', 'desc')
    //         .get()
    //         .then((snapshot) => {
    //             // if (isCurrent.current) {
    //                 var docCount = snapshot.docs.length

    //                 const recipes = snapshot.docs.map((doc) => ({
    //                     id: doc.id,
    //                     ...doc.data()
    //                     }))

    //                 localStorage.setItem('recipes', JSON.stringify(recipes));
    //                 recipeDispatch({ type: 'SET_RECIPES', recipes})
    //                 setCount(docCount)
    //                 console.log('recipes snap context')

    //             // }
    //         }, (e) => {
    //             console.log('Error with array. ', e)
    //         });
        
    //     return () => fetchData()
    // }, [])

    // React.useEffect(() => {
    //     console.log('set recipes context')
    //     recipeDispatch({ type: 'SET_RECIPES', recipes})
    // }, [recipes])


    return (
        <RecipesContext.Provider value={{ recipes, recipeDispatch, addRecipe, editRecipe, removeRecipe }}>
            {children}
        </RecipesContext.Provider>
    )
}

export { RecipesProvider, RecipesContext as default }