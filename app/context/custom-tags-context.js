import React, { useContext, useReducer } from 'react';
import customTagsReducer from '../reducers/custom-tags'

const CustomTagsContext = React.createContext()

export const useCustomTagsContext = () => useContext(CustomTagsContext)

const CustomTagsProvider = ({ children }) => {
    const [customTags, customTagsDispatch ] = useReducer(customTagsReducer, [])

    const addCustomTag = async (customTag) => {
        customTagsDispatch({ type: 'ADD_CUSTOM_TAG', customTag })
    }

    return (
        <CustomTagsContext.Provider value={{ customTags, customTagsDispatch, addCustomTag }}>
            {children}
        </CustomTagsContext.Provider>
    )
}

export { CustomTagsProvider, CustomTagsContext as default }