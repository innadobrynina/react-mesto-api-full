import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleChangeName(evt) {
    setName(evt.target.value)
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name,
      link
    });
    setName('');
    setLink('');
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      title='Новое место'
      name='add'
      buttonText='Создать'
      isOpen={props.isOpen}
      onClose={props.onClose}>
      <input
        className="popup__input popup__input_place"
        type="text"
        name="name"
        id="place-name"
        placeholder="Название"
        required
        minLength={2}
        maxLength={30}
        value={name}
        onChange={handleChangeName}

      />
      <span className="popup__input-error popup__input-error_place" id="place-name-error"></span>
      <input
        className="popup__input popup__input_image"
        type="url"
        name="link"
        id="link-image"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={handleChangeLink}

      />
      <span className="popup__input-error popup__input-error_image" id="link-image-error"></span>
    </PopupWithForm>
  )

}

export default AddPlacePopup