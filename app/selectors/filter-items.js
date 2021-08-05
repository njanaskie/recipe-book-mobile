export default (recipeCuisines, recipeTypes, customTags) => {
    var cuisinesObj = recipeCuisines.map(cuisine=> ({ group: 'cuisine', item: cuisine, checked: false }))
    var typesObj = recipeTypes.map(type=> ({ group: 'type', item: type, checked: false }))
    var tagsObj = customTags.map(tag=> ({ group: 'customTags', item: tag, checked: false }))
    
    var filterItems = [...cuisinesObj, ...typesObj, ...tagsObj]

    return filterItems

}