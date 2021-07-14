import React  from 'react'
import { List } from 'semantic-ui-react'
import IngredientListItem from './IngredientListItem'
import { useIngredientsContext } from '../context/ingredients-context'
import selectIngredients from '../selectors/ingredients'

export const IngredientsList = () => {
    const { ingredients } = useIngredientsContext()
    const selectedIngredients = selectIngredients(ingredients)

    if (!selectedIngredients || !selectedIngredients.length) {
        return <div className='content-container'><span className="list-item--message">No ingredients</span></div>
    }

    const tableItems = selectedIngredients.map((ingredient, id) => {
        return (
            <IngredientListItem
                key={id}
                ingredient={ingredient}
            />
        )
    })

    return (
        <div className="content-container">
            <List divided verticalAlign='middle'>
                {tableItems}
            </List>
        </div>
    )
}

export { IngredientsList as default }