
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
        case 'ADD_CHECKBOX_ITEM':
            switch(action.item.group) {
                case 'cuisine':
                    return {
                        ...state,
                        cuisines: [...state.cuisines, action.item.item]
                    }
                case 'type':
                    return {
                        ...state,
                        types: [...state.types, action.item.item]
                    }
                case 'customTags':
                    return {
                        ...state,
                        customTags: [...state.customTags, action.item.item]
                    }
            }
        case 'REMOVE_CHECKBOX_ITEM':
            switch(action.item.group) {
                case 'cuisine':
                    return {
                        ...state,
                        cuisines: state.cuisines.filter(cuisine => cuisine !== action.item.item)
                    }
                case 'type':
                    return {
                        ...state,
                        types: state.types.filter(type => type !== action.item.item)
                    }
                case 'customTags':
                    return {
                        ...state,
                        customTags: state.customTags.filter(customTag => customTag !== action.item.item)
                    }
            }
        // case 'SET_TYPE_FILTER':
        //     return {
        //         ...state,
        //         type: action.type
        //     }
        // case 'SET_CUSTOM_TAG_FILTER':
        //     return {
        //         ...state,
        //         customTags: action.customTags
        //     }
        default:
            return state;
        }
    }
    
    export default filtersReducer;