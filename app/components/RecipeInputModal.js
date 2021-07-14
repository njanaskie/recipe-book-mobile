import React from 'react'
import { Modal } from 'semantic-ui-react'

const RecipeInputModal = ({ children, isModalOpen, handleModalClose, isEdit }) => {

    return (
        <Modal dimmer='inverted' open={isModalOpen} onClose={handleModalClose}>
            {isEdit ? <Modal.Header>Edit recipe details...</Modal.Header> : <Modal.Header>Add to your recipe book...</Modal.Header>}
            <Modal.Content>
                {children}
            </Modal.Content>
        </Modal>
    )

}

export default RecipeInputModal