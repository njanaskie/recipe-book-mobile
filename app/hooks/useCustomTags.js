import React, { useRef } from 'react'
import { useFirebaseContext } from '../context/firebase-context'
import { useCustomTagsContext } from '../context/custom-tags-context'
import { getCustomTagsService } from '../services/recipeServices'

const useCustomTags = () => {
    const isCurrent = useRef(true)
    const { user } = useFirebaseContext()
    const { customTags, customTagsDispatch } = useCustomTagsContext()

    React.useEffect(() => {
        return () => {
            isCurrent.current = false
        }
    }, [])

    React.useEffect(() => {
        const fetchCustomTags = async () => {
            const fetchedCustomTags = await getCustomTagsService()
            if (fetchedCustomTags && isCurrent.current) {
                customTagsDispatch({ type: 'SET_CUSTOM_TAGS', customTags: fetchedCustomTags})
            }
        }
        
        if (user) {
            fetchCustomTags()
        }
        
    }, [])

    return customTags
}

export default useCustomTags