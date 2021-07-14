import React from 'react'
import { Form } from 'semantic-ui-react'
import { useIngredientsContext } from '../context/ingredients-context'
import { addIngredientService } from '../services/ingredientServices'

const AddIngredientForm = (props) => {
    const initialFormState = {
        name: '',
        category: '',
        price: '',
        error: ''
    }
    const [state, setState] = React.useState(initialFormState)
    const { dispatch, addIngredient } = useIngredientsContext()

    const handleAddIngredient = (e) => {
        e.preventDefault()
        const ingredient = {
            name: state.name,
            category: state.category,
            price: state.price
        }

        if (!state.name || !state.category || !state.price) {
            setState({ error: 'Please provide name, category, and price'})
        } else {
            // addIngredient(ingredient)
            addIngredientService(ingredient, dispatch)
            dispatch({ type: 'ADD_INGREDIENT', ingredient })
            setState(initialFormState)
        }
    }

    const onNameChange = (e) => {
        const value = e.target.value
        setState({ ...state, name: value })
    }

    const onCategoryChange = (e, result) => {
        const { value } = result || e.target
        setState({ ...state, category: value })
    }

    const onPriceChange = (e, result) => {
        const { value } = result || e.target
        setState({ ...state, price: value })
    }

    const categoryOptions = [
        {key: 'dairy', text: 'Dairy', value: 'dairy'},
        {key: 'meats', text: 'Meats', value: 'meats'},
        {key: 'seafood', text: 'Seafood', value: 'seafood'},
        {key: 'vegetables', text: 'Vegetables', value: 'vegetables'},
        {key: 'baking and grains', text: 'Baking and Grains', value: 'baking and grains'},
        {key: 'added sweeteners', text: 'Added Sweeteners', value: 'added sweeteners'},
        {key: 'condiments', text: 'Condiments', value: 'condiments'},
        {key: 'spices', text: 'Spices', value: 'spices'},
        {key: 'fish', text: 'Fish', value: 'fish'},
        {key: 'fruits', text: 'Fruits', value: 'fruits'},
        {key: 'oils', text: 'Oils', value: 'oils'},
        {key: 'seasonings', text: 'Seasonings', value: 'seasonings'},
        {key: 'sauces', text: 'Sauces', value: 'sauces'},
        {key: 'legumes', text: 'Legumes', value: 'legumes'},
        {key: 'alcohol', text: 'Alcohol', value: 'alcohol'},
        {key: 'soup', text: 'Soup', value: 'soup'},
        {key: 'nuts', text: 'Nuts', value: 'nuts'},
        {key: 'dairy alternatives', text: 'Dairy Alternatives', value: 'dairy alternatives'},
        {key: 'desserts and snacks', text: 'Desserts and Snacks', value: 'desserts and snacks'},
        {key: 'beverages', text: 'Beverages', value: 'beverages'},
    ]

    const priceOptions = [
        {key: 1, text: 1, value: 1},
        {key: 2, text: 2, value: 2},
        {key: 3, text: 3, value: 3},
    ]

    return (
        <div className='content-container'>
            <div className='form-container form-title'>
                <h4>Add an ingredient to the site</h4>
            </div>
                <Form onSubmit={handleAddIngredient} className='form-container'>
                    {state.error && <p className='form__error'>{state.error}</p>}
                    <Form.Group widths='equal' inline>
                            <Form.Input
                                id='set-name'
                                fluid
                                type='text'
                                placeholder='Name'
                                value={state.name || ''}
                                onChange={onNameChange}
                            />
                            <Form.Dropdown
                                id='set-category'
                                placeholder='Category'
                                fluid selection
                                clearable
                                value={state.category || ''}
                                onChange={onCategoryChange}
                                options={categoryOptions.sort((a,b) => a.key.localeCompare(b.key)).map(category => category)}
                            />
                            <Form.Dropdown
                                id='set-price'
                                placeholder='Price'
                                fluid selection
                                clearable
                                value={state.price || ''}
                                onChange={onPriceChange}
                                options={priceOptions.map(price => price)}
                            />
                            <Form.Button fluid>Add Ingredient</Form.Button>
                        </Form.Group>
                </Form>
        </div>

    )
}

export default AddIngredientForm