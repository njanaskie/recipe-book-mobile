import React, { useContext, useEffect } from 'react'
import _ from 'lodash'
import IngredientListItem from './IngredientListItem'
import IngredientListHeader from './IngredientListHeader'
import IngredientsContext from '../../../context/ingredients-context'
import PantryContext from '../../../context/pantry-context'
import FirebaseContext from '../../../context/firebase-context'
import database from '../../firebase/firebase'

const useIngredients = () => {
    const { ingredients, dispatch } = useContext(IngredientsContext)

    useEffect(() => {
        database.collection('ingredients')
        .get()
        .then((snapshot) => {
            const ingredients = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
                }))

            dispatch({ type: 'SET_INGREDIENTS', ingredients})
            });
        
        }, [])

    return ingredients
}

const usePantryIngredients = () => {
    const { user } = useContext(FirebaseContext)
    const { pantryIngredients, pantryDispatch } = useContext(PantryContext)

    const uid = user.uid

    useEffect(() => {
        database.collection('users').doc(uid).collection('pantry').get()
        .then((snapshot) => {
            const pantryIngredients = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
                }))
        
            pantryDispatch({ type: 'SET_PANTRY_INGREDIENTS', pantryIngredients})
        })

    }, [])

    return pantryIngredients
}

const syncIngredientsWithPantry = (ings, pIngs) => {
    // const merged = [...ings, ...pIngs]
    const isPantryIngredients = []
    ings.forEach((ing) => {
        let isPantry = false
        
        pIngs.forEach((pIng) => {
            if (ing.id === pIng.id) {
                isPantry = true
            } else {
                isPantry
            }
        })

        return isPantryIngredients.push({ ...ing, isPantry })
    })

    return isPantryIngredients
}

export const IngredientsList = () => {
    const ingredients = useIngredients()
    const pantryIngredients = usePantryIngredients()
    const isPantryIngredients = syncIngredientsWithPantry(ingredients, pantryIngredients)

    console.log(ingredients)
    console.log(pantryIngredients)
    console.log(isPantryIngredients)
    
    const groupedIngredients = _.groupBy(isPantryIngredients, 'category')

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