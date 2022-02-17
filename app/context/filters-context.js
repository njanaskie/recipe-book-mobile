import React, { useContext, useReducer } from 'react';
import filtersReducer, { filtersReducerDefaultState } from '../reducers/filters'

const FiltersContext = React.createContext()

export const useFiltersContext = () => useContext(FiltersContext)

const FiltersProvider = ({ children }) => {
    const [filters, filtersDispatch] = useReducer(filtersReducer, filtersReducerDefaultState)

    const setFilters = (filters) => {
        filtersDispatch({ type: 'SET_FILTERS', filters })
    }

    const clearFilters = () => {
        filtersDispatch({ type: 'CLEAR_FILTERS' })
    }

    const toggleFiltersActive = (status) => {
        filtersDispatch({ type: 'TOGGLE_FILTERS_ACTIVE', filtersActive: status })
    }

    return (
        <FiltersContext.Provider value={{ filters, filtersDispatch, setFilters, clearFilters, toggleFiltersActive }}>
            {children}
        </FiltersContext.Provider>
    )
}

export { FiltersProvider, FiltersContext as default }