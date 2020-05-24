import React, { useContext, useEffect } from 'react'
import _ from 'lodash'
import IngredientListItem from './IngredientListItem'
import IngredientListHeader from './IngredientListHeader'
import IngredientsContext from '../../../context/ingredients-context'
import PantryContext from '../../../context/pantry-context'
import FirebaseContext from '../../../context/firebase-context'
import database from '../../firebase/firebase'
import useIngredients from '../../hooks/useIngredients'

const usePantryIngredients = () => {
    const { user } = useContext(FirebaseContext)
    const { pantryIngredients, pantryDispatch } = useContext(PantryContext)

    const uid = user.uid

    useEffect(() => {
        const unsubscribe = database.collection('users').doc(uid).collection('pantry')
        .onSnapshot((snapshot) => {
            const pantryIngredients = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
                }))
        
            pantryDispatch({ type: 'SET_PANTRY_INGREDIENTS', pantryIngredients})
        })

        return () => unsubscribe()

    }, [])

    return pantryIngredients
}

const syncIngredientsWithPantry = (ings, pIngs) => {
    // const merged = [...ings, ...pIngs]
    const syncedIngredients = []
    ings.forEach((ing) => {
        let isPantry = false
        
        pIngs.forEach((pIng) => {
            if (ing.name === pIng.name) {
                isPantry = true
            } else {
                isPantry
            }
        })

        return syncedIngredients.push({ ...ing, isPantry })
    })

    return syncedIngredients
}

export const IngredientsList = () => {
    const ingredients = useIngredients()
    const pantryIngredients = usePantryIngredients()
    const syncedIngredients = syncIngredientsWithPantry(ingredients, pantryIngredients)
    
    const groupedIngredients = _.groupBy(syncedIngredients, 'category')

    return (
        <div>
            {
                ingredients.length === 0 ? (
                    <div>
                        <span>No ingredients</span>
                    </div>
                ) : (
                    Object.keys(groupedIngredients).map(category => {
                        return (
                            <div key={category} >
                                <IngredientListHeader category={category} />
                                {groupedIngredients[category].map((ingredient, id) => {
                                    return (
                                        <IngredientListItem key={id} ingredient={ingredient} />
                                    )
                                })}
                            </div>
  
                        )
                    })
                )
            }
        </div>
    )
}

export { IngredientsList as default }