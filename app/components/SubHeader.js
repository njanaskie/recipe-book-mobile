import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Menu, Icon } from 'semantic-ui-react'
import { useFirebaseContext } from '../context/firebase-context'
import RecipeInputModal from './RecipeInputModal';
import AddRecipe from './AddRecipe'

export const SubHeader = () => {
    const { isAdmin, logout } = useFirebaseContext()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleModalOpen = () => {
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    const handleLogout = () => {
        logout()
    }

    return (
        <div>
            <Menu secondary stackable>
                {isAdmin && <Menu.Item as={NavLink} to='/ingredients'><Icon name='lemon'/>Manage Ingredients</Menu.Item>}
                <Menu.Item as={Button} onClick={handleModalOpen}><Icon name='plus'/>Add Recipe</Menu.Item>
                <Menu.Item><Button onClick={handleLogout}>Logout</Button></Menu.Item>
            </Menu>
            <RecipeInputModal isModalOpen={isModalOpen} handleModalClose={handleModalClose}>
                <AddRecipe handleModalClose={handleModalClose}/>
            </RecipeInputModal>
        </div>
    )
}

export default SubHeader;