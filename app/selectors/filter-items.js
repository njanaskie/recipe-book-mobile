export default (recipeCuisines, recipeTypes, customTags) => {
    var cuisinesObj = recipeCuisines.map(cuisine=> ({ item: cuisine, checked: false }))
    var typesObj = recipeTypes.map(type=> ({ item: type, checked: false }))
    var tagsObj = customTags.map(tag=> ({ item: tag, checked: false }))
    
    var filterItems =
        { 
            'recipeCuisines': cuisinesObj,
            'recipeTypes': typesObj,
            'customTags': tagsObj,
        }

    return filterItems

}