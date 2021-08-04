import React, { useContext, useReducer } from 'react';
import filtersReducer, { filtersReducerDefaultState } from '../reducers/filters'

const FiltersContext = React.createContext()

export const useFiltersContext = () => useContext(FiltersContext)

const FiltersProvider = ({ children }) => {
    const [filters, filtersDispatch] = useReducer(filtersReducer, filtersReducerDefaultState)

    const setFilterIngredients = (ingredients) => {
        filtersDispatch({ type: 'SET_INGREDIENT_FILTER', ingredients })
    }

    const addFilterCuisine = (cuisine) => {
        filtersDispatch({ type: 'ADD_CUISINE_FILTER', cuisine })
    }
    
    const removeFilterCuisine = (cuisine) => {
        filtersDispatch({ type: 'REMOVE_CUISINE_FILTER', cuisine })
    }

    const setFilterTypes = (type) => {
        filtersDispatch({ type: 'SET_TYPE_FILTER', type })
    }

    const setFilterCustomTags = (customTags) => {
        filtersDispatch({ type: 'SET_CUSTOM_TAG_FILTER', customTags })
    }

    return (
        <FiltersContext.Provider value={{ filters, filtersDispatch, addFilterCuisine, removeFilterCuisine, setFilterIngredients, setFilterTypes, setFilterCustomTags }}>
            {children}
        </FiltersContext.Provider>
    )
}

export { FiltersProvider, FiltersContext as default }