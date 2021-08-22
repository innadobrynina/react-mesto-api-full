import React, { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(evt) {
        setName(evt.target.value)
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            title='Редактировать профиль'
            name='profile'
            buttonText='Сохранить'
            isOpen={props.isOpen}
            onClose={props.onClose}>
            <input
                className="popup__input popup__input_name"
                type="text"
                id="title-name"
                name="name"
                placeholder="Имя"
                aria-label="Имя"
                required
                minLength={2}
                maxLength={40}
                value={name}
                onChange={handleChangeName}
            />
            <span className="popup__input-error popup__input-error_name" id="title-name-error"></span>
            <input
                className="popup__input popup__input_about"
                type="text"
                id="about-name"
                name="about"
                placeholder="Род деятельности"
                aria-label="О себе"
                required
                minLength={2}
                maxLength={200}
                value={description}
                onChange={handleChangeDescription}
            />
            <span className="popup__input-error popup__input-error_about" id="about-name-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;