
// customTagsReducer


const customTagsReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_CUSTOM_TAG':
            return [
                ...state,
                action.customTag
            ];
        case 'SET_CUSTOM_TAGS':
            return action.customTags;
        default:
            return state;
    }
}

export default customTagsReducer;