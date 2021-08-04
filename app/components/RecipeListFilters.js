import React from 'react'
import { Form } from 'semantic-ui-react'
import { useFiltersContext } from '../context/filters-context'
import recipeCuisines from '../fixtures/recipeCuisines'
import recipeTypes from '../fixtures/recipeTypes'
import selectCustomTags from '../selectors/custom-tags'
import { useRecipesContext } from '../context/recipes-context'

export const RecipeListFilters = ({ allIngredients }) => {
    const { filters, setFilterCuisines, setFilterIngredients, setFilterTypes, setFilterCustomTags } = useFiltersContext()
    const { recipes } = useRecipesContext()
    const allCustomTags = selectCustomTags(recipes)
    
    const onIngredientChange = (e, result) => {
        const { value } = result || e.target
        setFilterIngredients(value)
    }

    const onCuisineChange = (e, result) => {
        const { value } = result || e.target
        setFilterCuisines(value)
    }

    const onTypeChange = (e, result) => {
        const { value } = result || e.target
        setFilterTypes(value)
    }

    const onCustomTagChange = (e, result) => {
        const { value } = result || e.target
        setFilterCustomTags(value)
    }

    return (
        <div className="content-container">
            <Form className="form-container">
                <Form.Group widths='equal' inline>
                    <Form.Dropdown
                        placeholder='Select ingredient'
                        name='ingredient'
                        clearable={true}
                        fluid multiple search selection
                        multiple={true}
                        value={filters ? filters.ingredients.sort((a,b) => a.localeCompare(b)) : []}
                        onChange={onIngredientChange}
                        options={allIngredients.map(ingredient => {
                            return {
                                key: ingredient.id,
                                text: ingredient.name,
                                value: ingredient.name
                            }
                        })}
                    />
                    <Form.Dropdown
                        placeholder='Select cuisine'
                        name='cuisine'
                        clearable={true}
                        fluid selection
                        value={filters ? filters.cuisine : ''}
                        onChange={onCuisineChange}
                        options={recipeCuisines.map(recipeCuisine => {
                            return {
                                key: recipeCuisine,
                                text: recipeCuisine,
                                value: recipeCuisine
                            }
                        })}
                    />
                    <Form.Dropdown
                        placeholder='Select type'
                        name='recipeType'
                        clearable={true}
                        fluid selection
                        value={filters ? filters.recipeType : ''}
                        onChange={onTypeChange}
                        options={recipeTypes.map(recipeType => {
                            return {
                                key: recipeType,
                                text: recipeType,
                                value: recipeType
                            }
                        })}
                    />
                    <Form.Dropdown
                        placeholder='Select custom tag'
                        name='customTag'
                        clearable={true}
                        fluid multiple search selection
                        multiple={true}
                        value={filters ? filters.customTags.sort((a,b) => a.localeCompare(b)) : []}
                        onChange={onCustomTagChange}
                        // options={[]}
                        options={allCustomTags.map(tag => {
                            return {
                                key: tag,
                                text: tag,
                                value: tag.toLocaleString()
                            }
                        })}
                    />
                </Form.Group>
            </Form>
        </div>
    )
}

export default RecipeListFilters