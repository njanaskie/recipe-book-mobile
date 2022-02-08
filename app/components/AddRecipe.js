import React from 'react'
import { View } from "react-native";
import RecipeForm from './RecipeForm'
import { useRecipesContext } from '../context/recipes-context'

const AddRecipe = ({ toggleFormModal }) => {
    const { addRecipe } = useRecipesContext()

    const onSubmit = (recipe) => {
        addRecipe(recipe)
    }

    return (
        <View>
            <RecipeForm
                onSubmit={onSubmit}
                toggleFormModal={toggleFormModal}
            />
        </View>
    )
}

export default AddRecipe