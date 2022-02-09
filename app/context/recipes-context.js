import React, { useContext, useReducer, useState, useEffect } from 'react';
import recipesReducer from '../reducers/recipes'
import database from '../firebase/firebase'
import uuid from 'uuid'
import { useFirebaseContext } from './firebase-context'
import { getRecipesService, editRecipeService, removeRecipeService, addRecipeService } from '../services/recipeServices'
import usePrevious from '../hooks/usePrevious'
import { config } from '../config/config'
import { useFiltersContext } from './filters-context';
import { getPreviewData } from '@flyerhq/react-native-link-preview'

const RecipesContext = React.createContext()

export const useRecipesContext = () => useContext(RecipesContext)

const RecipesProvider = ({ children }) => {
    const [recipes, recipeDispatch] = useReducer(recipesReducer, [])
    const { user } = useFirebaseContext() 
    const initialFormState = {
        isListEnd: false,
        page: 1,
        loading: true,
        loadingMore: false,
        refreshing: false,
        hasMoreToLoad: true,
        call: false,
        error: null
    }
    const [pageState, setPageState] = useState(initialFormState)
    const [queryItems, setQueryItems] = useState(null)
    const prevPage = usePrevious(pageState.page)
    const itemsPerPage = config.itemsPerPage

    React.useEffect(() => {
        fetchRecipes(queryItems && queryItems)
    }, [pageState.page, pageState.call])

    const getUrlData = async (recipe) => {
        if (recipe.url) {
            try {
                const res = await getPreviewData(recipe.url)
                const urlData = { urlTitle: res.title ? res.title : '', urlImage: res.image && res.image.url ? res.image.url : ''}
                return urlData
            } catch(e) {
                alert(e)
            }
        }
    }
    
    const addRecipe = async (recipe) => {
        const scrapedData = await getUrlData(recipe)
        const fullData = { ...recipe, ...scrapedData}
        const newRecipe = await addRecipeService(fullData)
        recipeDispatch({ type: 'ADD_RECIPE', recipe: {id: newRecipe.id, ...fullData} })
    }

    const editRecipe = (id, updates) => {
        editRecipeService(id, updates)
        recipeDispatch({ type: 'EDIT_RECIPE', id, updates })
    }

    const removeRecipe = (id) => {
        removeRecipeService({ id })
        recipeDispatch({ type: 'REMOVE_RECIPE', id })
    }

    const filterRecipes = (query) => {
        setQueryItems(query)
        setPageState({ ...pageState, page: 1, call: !pageState.call })
    }

    const fetchRecipes = async (query) => {
        if (user) {
            let fetchedRecipes = []
            if (query) {
                fetchedRecipes = await getRecipesService(pageState.page, itemsPerPage, query)
            } else {
                fetchedRecipes = await getRecipesService(pageState.page, itemsPerPage)
            }
            
            if (fetchedRecipes) {
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
                    hasMoreToLoad: fetchedRecipes.length < itemsPerPage ? false : true
                }))
            }
        }
    }

    const handleRefresh = () => {
        setQueryItems(null)
        setPageState({
            ...pageState,
            page: 1,
            refreshing: true,
            call: !pageState.call,
        })
      };

    const handleLoadMore = () => {
        if (pageState.hasMoreToLoad) {
            setPageState((prevState) => ({
                ...pageState,
                page: prevPage + 1,
                loadingMore: true,
            })) 

        }
    }

    return (
        <RecipesContext.Provider value={{ 
            recipes, 
            pageState, 
            recipeDispatch, 
            fetchRecipes, 
            filterRecipes, 
            handleRefresh, 
            handleLoadMore, 
            editRecipe, 
            removeRecipe, 
            addRecipe 
        }}>
                {children}
        </RecipesContext.Provider>
    )
}

export { RecipesProvider, RecipesContext as default }