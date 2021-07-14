import React from 'react'
import { View } from "react-native";
import RecipeForm from './RecipeForm'
import { useRecipesContext } from '../context/recipes-context'
import { addRecipeService, scrapeURLService } from '../services/recipeServices'

const AddRecipe = ({ toggleFormModal }) => {
    const { recipes, recipeDispatch } = useRecipesContext()
    // const history = useHistory()

    const onSubmit = async (recipe) => {
        // addRecipe(recipe)
        const scrapedData = await scrapeURLService(recipe)
        console.log('add recipe scrapedData', scrapedData)
        const fullData = { ...recipe, ...scrapedData}
        console.log('fullData', fullData)
        const newRecipe = await addRecipeService(fullData)
        recipeDispatch({ type: 'ADD_RECIPE', recipe: {id: newRecipe.id, ...fullData} })
        // history.push('/')
    }

    return (
        <View>
            <RecipeForm
                onSubmit={onSubmit}
                toggleFormModal={toggleFormModal}
                // results={recipes}
            />
        </View>
    )
}

export default AddRecipe