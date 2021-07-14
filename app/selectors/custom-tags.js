export default (recipes) => {
    const customTags = []
    
    recipes.map(recipe => {
        if (recipe.customTags.length > 0) {
            recipe.customTags.map(tag => {
                customTags.push(tag)
            })
        }
    })

    return customTags.filter((value, index) => customTags.indexOf(value) == index)

}