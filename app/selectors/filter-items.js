export default (recipeCuisines, recipeTypes, customTags) => {
    var cuisinesObj = recipeCuisines.map(cuisine=> ({ group: 'cuisine', item: cuisine }))
    var typesObj = recipeTypes.map(type=> ({ group: 'type', item: type }))
    var tagsObj = customTags.map(tag=> ({ group: 'customTags', item: tag }))
    
    var filterItems = [...cuisinesObj, ...typesObj, ...tagsObj]

    return filterItems

}