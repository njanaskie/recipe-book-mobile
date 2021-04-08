import React, { useState } from 'react'
import RecipeListItem from './RecipeListItem'
// import { useFiltersContext } from '../context/filters-context'
import { config } from '../config/config'
// import selectRecipes from '../selectors/recipes'
import { useRecipesContext } from '../context/recipes-context'
import { FlatList, Text, View } from 'react-native'

export const RecipeList = () => {
    const initialFormState = {
        activePage: 1,
    }
    const [pageState, setPageState] = useState(initialFormState)
    // const { filters } = useFiltersContext()
    const { recipes } = useRecipesContext()
    // const startIndex = (pageState.activePage * config.itemsPerPage) - config.itemsPerPage
    // const endIndex = startIndex + config.itemsPerPage
    // const selectedRecipes = selectRecipes(recipes, filters)
    // const paginatedItems = selectedRecipes && selectedRecipes.slice(startIndex, endIndex)

    // const handlePageChange = (e, { activePage }) => setPageState({ activePage })

    if (!recipes || !recipes.length) {
        return <Text className="list-item--message">No recipes</Text>
    }

    const tableItems = recipes.map((recipe) => {
        return (
            <RecipeListItem key={recipe.id} recipe={recipe} />
        )
    })
    
    return (
        // <View>
        //     {tableItems}
        // </View>
        <FlatList 
            data={recipes}
            renderItem={({ item }) => <RecipeListItem recipe={item} />}
            keyExtractor={item => item.id}
            numColumns={2}
        />
    )
}

export default RecipeList