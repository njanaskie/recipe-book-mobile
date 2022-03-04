import React, { useRef } from 'react'
import { useIngredientsContext } from '../context/ingredients-context'
import { useFirebaseContext } from '../context/firebase-context'
import { getIngredientsService } from '../services/ingredientServices'

const useIngredients = () => {
    const { ingredients, dispatch } = useIngredientsContext()
    const isCurrent = useRef(true)
    const { user } = useFirebaseContext()

    React.useEffect(() => {
        return () => {
            isCurrent.current = false
        }
    }, [])

    React.useEffect(() => {
        const fetchIngredients = async () => {
            const fetchedIngredients = await getIngredientsService()
            if (isCurrent.current) {
                dispatch({ type: 'SET_INGREDIENTS', ingredients: fetchedIngredients})
            }
        }
        
        if (user) {
            fetchIngredients()
        }
        
    }, [])

    return ingredients
}

export default useIngredients