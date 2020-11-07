export default (recipes) => {
    // const customTags = recipes.recipes.map(recipe => recipe.type)
    // return customTags
    const customTags = []
    
    recipes.map(recipe => {
        if (recipe.customTags.length > 0) {
            customTags.push(recipe.customTags)
        }
    })

    return customTags

}