import React, { useContext, useReducer } from 'react';
import customTagsReducer from '../reducers/custom-tags'

const CustomTagsContext = React.createContext()

export const useCustomTagsContext = () => useContext(CustomTagsContext)

const CustomTagsProvider = ({ children }) => {
    const [customTags, customTagsDispatch ] = useReducer(customTagsReducer, [])

    return (
        <CustomTagsContext.Provider value={{ customTags, customTagsDispatch }}>
            {children}
        </CustomTagsContext.Provider>
    )
}

export { CustomTagsProvider, CustomTagsContext as default }