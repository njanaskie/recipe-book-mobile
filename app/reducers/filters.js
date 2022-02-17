
// Filters Reducer

export const filtersReducerDefaultState = {
    // text: '',
    selectedIngredients: [],
    selectedCuisines: [],
    selectedTypes: [],
    selectedCustomTags: [],
    checkboxItems: [],
    filtersActive: false
};

const filtersReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_FILTERS':
            return action.filters
        case 'CLEAR_FILTERS':
            return filtersReducerDefaultState
        case 'TOGGLE_FILTERS_ACTIVE':
            return {
                ...state,
                filtersActive: action.filtersActive
            }
        default:
            return state;
        }
    }
    
    export default filtersReducer;