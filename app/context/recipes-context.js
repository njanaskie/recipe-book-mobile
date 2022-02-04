import React, { useContext, useReducer, useState, useEffect } from 'react';
import recipesReducer from '../reducers/recipes'
import database from '../firebase/firebase'
import uuid from 'uuid'
import { useFirebaseContext } from './firebase-context'
import { getRecipesService } from '../services/recipeServices'
import usePrevious from '../hooks/usePrevious'
import { config } from '../config/config'
import { useFiltersContext } from './filters-context';

const RecipesContext = React.createContext()

export const useRecipesContext = () => useContext(RecipesContext)

const RecipesProvider = ({ children }) => {
    const [recipes, recipeDispatch] = useReducer(recipesReducer, [])
    const { user } = useFirebaseContext() 
    const { filters } = useFiltersContext();
    const customId = uuid()
    const initialFormState = {
        isListEnd: false,
        page: 1,
        loading: true,
        loadingMore: false,
        refreshing: false,
        hasMoreToLoad: true,
        isQueried: false,
        call: false,
        error: null
    }
    const [pageState, setPageState] = useState(initialFormState)
    const [queryItems, setQueryItems] = useState(null)
    const prevPage = usePrevious(pageState.page)
    const itemsPerPage = config.itemsPerPage

    React.useEffect(() => {
        console.log('recipescontext fetchingrecipes', pageState, 'filters', filters, 'queryitems', queryItems)
        fetchRecipes(queryItems && queryItems)
    }, [pageState.page, pageState.call])

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

    const filterRecipes = (query) => {
        console.log('filterRecipes')
        setQueryItems(query)
        setPageState({ ...pageState, page: 1, call: !pageState.call })

    }

    const fetchRecipes = async (query) => {
        if (user) {
            let fetchedRecipes = []
            if (query) {
                // setPageState({ ...pageState, page: 1 })
                fetchedRecipes = await getRecipesService(pageState.page, itemsPerPage, query)
            } else {
                fetchedRecipes = await getRecipesService(pageState.page, itemsPerPage)
            }
            

            if (fetchedRecipes) {
                console.log('fetchRecipes dispatched', 'query', query)
                recipeDispatch({
                    type: 'SET_RECIPES',
                    recipes: pageState.page === 1
                            ? fetchedRecipes
                            : [...recipes, ...fetchedRecipes]
                })
                setPageState((prevState, nextProps) => ({
                    ...pageState,
                    loading: false,
                    loadingMore: false,
                    refreshing: false,
                    isQueried: query ? true : pageState.isQueried,
                    hasMoreToLoad: fetchedRecipes.length < itemsPerPage ? false : true
                }))
            }
        }
    }

    const handleRefresh = () => {
        console.log('handleRefresh')
        setQueryItems(null)
        setPageState({
            ...pageState,
            page: 1,
            refreshing: true,
            isQueried: false,
            call: !pageState.call,
        })
      };

    const handleLoadMore = () => {
        if (pageState.hasMoreToLoad) {
            console.log('handleLoadMore')
            setPageState((prevState) => ({
                ...pageState,
                page: prevPage + 1,
                loadingMore: true,
            })) 

        }
    }

    return (
        <RecipesContext.Provider value={{ recipes, recipeDispatch, fetchRecipes, filterRecipes, handleRefresh, handleLoadMore, pageState }}>
            {children}
        </RecipesContext.Provider>
    )
}

export { RecipesProvider, RecipesContext as default }