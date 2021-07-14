import React from 'react';
import { Button, Label, Segment } from 'semantic-ui-react'

export const RecipeListPagination = (props) => {

    return (
        <Button.Group widths='3' basic>
            <Button content='Previous' icon='angle left' labelPosition='left' onClick={props.onPreviousPage} disabled={props.isPreviousButtonDisabled}></Button>
            <Button content={props.activePage} disabled/>
            <Button content='Next' icon='angle right' labelPosition='right' onClick={props.onNextPage} disabled={props.isNextButtonDisabled}></Button>
        </Button.Group>
    )
}

export default RecipeListPagination;