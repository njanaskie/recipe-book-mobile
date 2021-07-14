
// Filters Reducer

export const filtersReducerDefaultState = {
    text: '',
    ingredients: [],
    cuisine: '',
    recipeType: '',
    customTags: []
};

const filtersReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SET_INGREDIENT_FILTER':
            return {
                ...state,
                ingredients: action.ingredients
            }
        case 'SET_CUISINE_FILTER':
            return {
                ...state,
                cuisine: action.cuisine
            }
        case 'SET_RECIPE_TYPE_FILTER':
            return {
                ...state,
                recipeType: action.recipeType
            }
        case 'SET_CUSTOM_TAG_FILTER':
            return {
                ...state,
                customTags: action.customTags
            }
        default:
            return state;
        }
    }
    
    export default filtersReducer;