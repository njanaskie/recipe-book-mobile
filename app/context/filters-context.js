import React, { useContext, useReducer } from 'react';
import filtersReducer, { filtersReducerDefaultState } from '../reducers/filters'

const FiltersContext = React.createContext()

export const useFiltersContext = () => useContext(FiltersContext)

const FiltersProvider = ({ children }) => {
    const [filters, filtersDispatch] = useReducer(filtersReducer, filtersReducerDefaultState)

    const setFilterIngredients = (ingredients) => {
        filtersDispatch({ type: 'SET_INGREDIENT_FILTER', ingredients })
    }

    const addFilterCheckboxItem = (item) => {
        filtersDispatch({ type: 'ADD_CHECKBOX_ITEM', item })
    }
    
    const removeFilterCheckboxItem = (item) => {
        filtersDispatch({ type: 'REMOVE_CHECKBOX_ITEM', item })
    }

    // const setFilterTypes = (type) => {
    //     filtersDispatch({ type: 'SET_TYPE_FILTER', type })
    // }

    // const setFilterCustomTags = (customTags) => {
    //     filtersDispatch({ type: 'SET_CUSTOM_TAG_FILTER', customTags })
    // }

    const setFilters = (filters) => {
        filtersDispatch({ type: 'SET_FILTERS', filters })
    }
    return (
        <FiltersContext.Provider value={{ filters, filtersDispatch, setFilters, addFilterCheckboxItem, removeFilterCheckboxItem, setFilterIngredients }}>
            {children}
        </FiltersContext.Provider>
    )
}

export { FiltersProvider, FiltersContext as default }