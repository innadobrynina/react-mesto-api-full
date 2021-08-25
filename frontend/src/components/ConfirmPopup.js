import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ onClick, card, onDelete, isOpen, onClose }) {

    function handleSubmit(event) {
        event.preventDefault();
        onDelete(card)
    }

    return (
        <PopupWithForm
            title="Вы уверены?"
            name="delete"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            formClassName="popup__form"
            submitButtonText="Да"
            submitButtonClassName="popup"
            onClick={onClick}
        >
        </PopupWithForm>
    )
}

export default ConfirmPopup;