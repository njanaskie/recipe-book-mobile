import React from 'react'
import RecipeForm from './RecipeForm'
import { useRecipesContext } from '../context/recipes-context'
import { editRecipeService } from '../services/recipeServices'
import { View } from 'react-native'

const EditRecipe = ({ recipe, toggleEditModal }) => {
    const { recipes, editRecipe, recipeDispatch } = useRecipesContext()

    const onSubmit = (recipeEdits) => {
        editRecipeService(recipe.id, recipeEdits)
        recipeDispatch({ type: 'EDIT_RECIPE', id: recipe.id, updates: recipeEdits })
        toggleEditModal()
    }

    return (
        <View>
            <RecipeForm
                {...recipe}
                onSubmit={onSubmit}
                results={recipes}
                toggleFormModal={toggleEditModal}
            />
        </View>
    )
}

export default EditRecipe