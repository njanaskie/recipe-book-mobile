import React from 'react'
import RecipeForm from './RecipeForm'
import { useRecipesContext } from '../context/recipes-context'
import { editRecipeService } from '../services/recipeServices'
import { View } from 'react-native'

const EditRecipe = ({ recipe, toggleFormModal }) => {
    const { recipes, editRecipe } = useRecipesContext()

    const onSubmit = (recipeEdits) => {
        editRecipe(recipe.id, recipeEdits)
    }

    return (
        <View>
            <RecipeForm
                {...recipe}
                onSubmit={onSubmit}
                results={recipes}
                toggleFormModal={toggleFormModal}
            />
        </View>
    )
}

export default EditRecipe