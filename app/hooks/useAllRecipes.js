import React, { useState, useRef } from 'react'
import database from '../firebase/firebase'
import { useFirebaseContext } from '../context/firebase-context'
import { useRecipesContext } from '../context/recipes-context'
import { getRecipesService } from '../services/recipeServices'

const useAllRecipes = (pageState) => {
    // const initialState = {
    //     itemsPerPage: 2,
    //     page: 1,
    //     loading: true,
    //     error: null
    // };
    const [state, setState] = useState(pageState)
    const { recipes, recipeDispatch } = useRecipesContext()
    const isCurrent = useRef(true)
    const { user } = useFirebaseContext()

    console.log('useallrecipes', state)

    React.useEffect(() => {
        return () => {
            isCurrent.current = false
        }
    }, []) 

    React.useEffect(() => {
        const fetchRecipes = async () => {
            if (isCurrent.current) {
                const fetchedRecipes = await getRecipesService(state.page, state.itemsPerPage)
                console.log(fetchedRecipes.length)
                recipeDispatch({
                    type: 'SET_RECIPES',
                    recipes: state.page === 1
                        ? fetchedRecipes
                        : [...recipes, ...fetchedRecipes]
                })
                setState((prevState, nextProps) => ({
                    ...state,
                    loading: false,
                }))
            }
        }
        
        if (user) {
            fetchRecipes()
        }

    }, [user])

    return { recipes: recipes || [] }
}

export default useAllRecipes