import React from 'react'
import { View } from "react-native";
import RecipeForm from './RecipeForm'
import { useRecipesContext } from '../context/recipes-context'
import { addRecipeService, scrapeURLService } from '../services/recipeServices'
import { getPreviewData } from '@flyerhq/react-native-link-preview'

const AddRecipe = ({ toggleFormModal }) => {
    const { addRecipe } = useRecipesContext()

    const getUrlData = async (recipe) => {
        if (recipe.url) {
            try {
                const res = await getPreviewData(recipe.url)
                console.log('res', res)
                const urlData = { urlTitle: res.title ? res.title : '', urlImage: res.image && res.image.url ? res.image.url : ''}
                return urlData
            } catch(e) {
                alert(e)
            }
        }
    }

    const onSubmit = (recipe) => {
        // const scrapedDate = await getUrlData(recipe)
        // const fullData = { ...recipe, ...scrapedDate}
        // const newRecipe = await addRecipeService(fullData)
        // recipeDispatch({ type: 'ADD_RECIPE', recipe: {id: newRecipe.id, ...fullData} })
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