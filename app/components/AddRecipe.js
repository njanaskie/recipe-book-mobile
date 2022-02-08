import React from 'react'
import { View } from "react-native";
import RecipeForm from './RecipeForm'
import { useRecipesContext } from '../context/recipes-context'
import { addRecipeService, scrapeURLService } from '../services/recipeServices'

const AddRecipe = ({ toggleFormModal }) => {
    const { addRecipe } = useRecipesContext()

    const onSubmit = (recipe) => {
        addRecipe(recipe)
        // const scrapedData = await scrapeURLService(recipe)
        // const fullData = { ...recipe, ...scrapedData}
        // const newRecipe = await addRecipeService(fullData)
        // recipeDispatch({ type: 'ADD_RECIPE', recipe: {id: newRecipe.id, ...fullData} })
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