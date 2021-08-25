import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onClick }) {
    const avatarRef = React.useRef('');
    const [isValid, setIsValid] = React.useState(false);
    const [validationMessage, setValidationMessage] = React.useState('');
    const [isFormValid, setFormValid] = React.useState(false);

    function handleChange(evt) {
        if (!evt.target.validity.valid) {
            setIsValid(true)
            setValidationMessage(evt.target.validationMessage)
            setFormValid();
        } else {
            setIsValid(false)
            setValidationMessage('')
            setFormValid(true);
        }
    };

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({
            link: avatarRef.current.value,
        });
    }


    React.useEffect(() => {
        avatarRef.current.value = '';
        setValidationMessage('');
        setFormValid();
    }, [isOpen])



    return (
        <PopupWithForm
            formClassName="popup__form"
            isOpen={isOpen}
            onClose={onClose}
            name='update-avatar'
            submitButtonText='Обновить'
            onSubmit={handleSubmit}
            submitButtonClassName="popup"
            isDisabled={!isFormValid}
            onClick={onClick}
            title="Обновить аватар"
        >
            <label className="popup__field">
                <input
                    id="avatar-link"
                    type="url"
                    name="avatar"
                    className="popup__input"
                    placeholder="Ссылка на аватар"
                    required
                    aria-label="Ссылка на аватар"
                    ref={avatarRef}
                    onChange={handleChange}
                />
                <span className={isValid ? " popup__input-error_avatar" : ""} id="avatar-link-error">{validationMessage}</span>
            </label>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;