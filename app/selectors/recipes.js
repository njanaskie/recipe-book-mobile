export default (recipes, filters) => {
    return filters ? recipes.filter((recipe) => {
        const ingredientMatch = filters.ingredients.length > 0 ? !recipe.ingredients.every(ingredient => !filters.ingredients.includes(ingredient)) : true
        const cuisineMatch = recipe.cuisine.toLowerCase().includes(filters.cuisine.toLowerCase())
        const typeMatch = recipe.type.toLowerCase().includes(filters.recipeType.toLowerCase())
        const customTagMatch = filters.customTags.length > 0 ? recipe.customTags.some(tag => tag.includes(filters.customTags)) : true
        return ingredientMatch && cuisineMatch && typeMatch && customTagMatch
    }).sort((a, b) =>  a.createdAt < b.createdAt ? 1 : -1)
    :
    recipes
}