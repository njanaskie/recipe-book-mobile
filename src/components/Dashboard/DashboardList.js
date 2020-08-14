import React, { useCallback, useState, useEffect, useMemo, useContext, useRef } from 'react'
import DishesContext from '../../../context/dishes-context'
import DishListItem from '../Dishes/DishListItem'
import useDishes from '../../hooks/useDishes'
import usePantryDishes from '../../hooks/usePantryDishes'
import { Input } from 'semantic-ui-react'
import DashboardListFilters from './DashboardListFilters'
import { useFiltersContext } from '../../../context/filters-context'

export const DashboardList = () => {
    const { filters } = useFiltersContext()
    const pantryDishes = usePantryDishes()
    
    return (
        <div className='content-container'>
            <DashboardListFilters filters={filters}/>
            <div className='dish-table'>
                {
                    pantryDishes.length === 0 ? (
                        <div>
                            <span>No dishes</span>
                        </div>
                    ) : (
                        pantryDishes.map((dish) => 
                            <DishListItem key={dish.id} dish={dish} />
                        )
                    )
                }
            </div>
        </div>
    )
}

export default DashboardList