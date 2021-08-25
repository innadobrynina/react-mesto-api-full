import React, { useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ onUpdateUser, isOpen, onClose, onClick }) {

    const currentUser = React.useContext(CurrentUserContext);
    // const [isValid, setIsValid] = React.useState(false);
    const [isValid, setIsValid] = React.useState({ name: true, about: true });
    // const [validationMessage, setValidationMessage] = React.useState('');
    const [validationMessage, setValidationMessage] = React.useState({ name: '', about: '', });
    const [inputValue, setInputValue] = React.useState({ name: '', about: '' });
    const isFormValid = Object.values(isValid).every(Boolean);

    function handleInputChange(event) {
        const { name, value } = event.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
        setIsValid({
            ...isValid,
            [name]: event.target.validity.valid,
        })
        setValidationMessage({
            ...validationMessage,
            [name]: event.target.validationMessage,
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateUser({
            name: inputValue.name,
            about: inputValue.about
        });
    }

    useEffect(() => {
        setInputValue({
            name: currentUser.name || '',
            about: currentUser.about || ''
        });
        setValidationMessage({ name: '', about: '', });
    }, [currentUser.about, currentUser.name, isOpen])

    return (
        <PopupWithForm
            name='edit'
            isOpen={isOpen}
            onClose={onClose}
            title="Редактировать профиль"
            onSubmit={handleSubmit}
            formClassName="popup__form"
            isDisabled={!isFormValid}
            onClick={onClick}
            submitButtonClassName="popup"

            submitButtonText="Сохранить"
        >
            <label className="popup__field">
                <input
                    className="popup__input"
                    type="text"
                    id="title-name"
                    name="name"
                    placeholder="Имя"
                    aria-label="Имя"
                    required
                    minLength={2}
                    maxLength={40}
                    value={inputValue.name}
                    onChange={handleInputChange}
                />
                <span className={!isValid.name ? 'popup__input-error popup__input-error_name' : ""} id="title-name-error">{validationMessage.name}</span>
            </label>
            <label className="popup__field">
                <input
                    className="popup__input"
                    type="text"
                    id="about-name"
                    name="about"
                    placeholder="Род деятельности"
                    aria-label="О себе"
                    required
                    minLength={2}
                    maxLength={200}
                    value={inputValue.about}
                    onChange={handleInputChange}
                />
                <span className={!isValid.about ? "popup__input-error popup__input-error_about" : ""} id="about-name-error"> {validationMessage.about}</span>
            </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;