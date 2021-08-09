export default (recipes, filters) => {
    const checkedItems = filters.checkboxItems.length > 0 && filters.checkboxItems.filter(item => item.checked === true)
    return checkedItems || filters.selectedIngredients.length > 0 ? 
        recipes.filter((recipe) => {
            console.log('filtering')
            const ingredientMatch = filters.selectedIngredients.length > 0 ? 
                !recipe.ingredients.every(ingredient => !filters.selectedIngredients.includes(ingredient)) 
                : 
                true

            const cuisines = []
            const types = []
            const customTags = []
            checkedItems.map(item => {
                if (item.group === 'cuisine'){
                    cuisines.push(item.item)
                }
                else if (item.group === 'type'){
                    types.push(item.item)
                }
                else if (item.group === 'customTags'){
                    customTags.push(item.item.toLowerCase())
                }
            })

            const cuisineMatch = cuisines.every(cuisine => cuisine === recipe.cuisine)
            const typeMatch = types.every(type => type === recipe.type)
            const customTagMatch = customTags ? 
                recipe.customTags.some(tag => tag.toLowerCase().includes(customTags)) 
                : 
                true
            return ingredientMatch && cuisineMatch && typeMatch && customTagMatch
        })
    :
    recipes
}