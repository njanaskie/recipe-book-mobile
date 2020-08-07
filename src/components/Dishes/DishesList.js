import React, { useContext } from 'react'
import DishesContext from '../../../context/dishes-context'
import DishListItem from './DishListItem'
import useDishes from '../../hooks/useDishes'
import usePantryDishes from '../../hooks/usePantryDishes'

export const DishesList = (props) => {
    const dishes = useDishes()
    
    return (
        <div>
            {
                dishes.length === 0 ? (
                    <div>
                        <span>No dishes</span>
                    </div>
                ) : (
                    dishes.map((dish) => 
                        <DishListItem key={dish.id} dish={dish} />
                    )
                )
            }
        </div>
    )
}

export default DishesList