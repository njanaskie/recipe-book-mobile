
// Filters Reducer

export const filtersReducerDefaultState = {
    // text: '',
    ingredients: [],
    cuisines: [],
    types: [],
    customTags: []
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        // case 'SET_TEXT_FILTER':
        //     return {
        //         ...state,
        //         text: action.text
        //     }
        case 'SET_INGREDIENT_FILTER':
            return {
                ...state,
                ingredients: action.ingredients
            }
        case 'ADD_CUISINE_FILTER':
            return {
                ...state,
                cuisines: [...state.cuisines, action.cuisine]
            }
        case 'REMOVE_CUISINE_FILTER':
            return {
                ...state,
                cuisines: state.cuisines.filter(cuisine => cuisine !== action.cuisine)
            }
        case 'SET_TYPE_FILTER':
            return {
                ...state,
                type: action.type
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