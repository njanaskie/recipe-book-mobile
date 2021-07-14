import React, { useContext, useReducer } from 'react';
import filtersReducer, { filtersReducerDefaultState } from '../reducers/filters'

const FiltersContext = React.createContext()

export const useFiltersContext = () => useContext(FiltersContext)

const FiltersProvider = ({ children }) => {
    const [filters, filtersDispatch] = useReducer(filtersReducer, filtersReducerDefaultState)

    const filterIngredients = (ingredients) => {
        filtersDispatch({ type: 'SET_INGREDIENT_FILTER', ingredients })
    }

    const filterCuisine = (cuisine) => {
        filtersDispatch({ type: 'SET_CUISINE_FILTER', cuisine })
    }

    const filterType = (recipeType) => {
        filtersDispatch({ type: 'SET_RECIPE_TYPE_FILTER', recipeType })
    }

    const filterCustomTags = (customTags) => {
        filtersDispatch({ type: 'SET_CUSTOM_TAG_FILTER', customTags })
    }

    return (
        <FiltersContext.Provider value={{ filters, filtersDispatch, filterCuisine, filterIngredients, filterType, filterCustomTags }}>
            {children}
        </FiltersContext.Provider>
    )
}

export { FiltersProvider, FiltersContext as default }