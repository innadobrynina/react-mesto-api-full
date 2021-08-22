import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }
    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            title='Обновить аватар'
            name='update-avatar'
            buttonText='Обновить'
            isOpen={props.isOpen}
            onClose={props.onClose}

        >

            <input
                id="avatar-link"
                type="url"
                name="avatar"
                className="popup__input"
                placeholder="Ссылка на аватар"
                required
                aria-label="Ссылка на аватар"
                ref={avatarRef}

            />
            <span className="popup__input-error popup__input-error_avatar" id="avatar-link-error"></span>

        </PopupWithForm>
    );
}

export default EditAvatarPopup;