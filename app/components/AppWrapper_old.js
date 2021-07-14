import React from 'react';
import useAllRecipes from '../hooks/useAllRecipes'
import useIngredients from '../hooks/useIngredients'

const AppWrapper = (props) => {
    const recipes = useAllRecipes()
    const ingredients = useIngredients()

    return (
        <div>
            {props.children}
        </div>
    );
}

export default AppWrapper;