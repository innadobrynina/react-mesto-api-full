import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ onClick, onAddPlace, isOpen, onClose }) {

  const [inputValue, setInputValue] = React.useState({ name: '', link: '', });
  const [isValid, setIsValid] = React.useState({ name: false, link: false });
  const [validationMessage, setValidationMessage] = React.useState({ name: '', link: '' });
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
    onAddPlace({
      name: inputValue.name,
      link: inputValue.link,
    });
  }

  React.useEffect(() => {
    setInputValue({ name: '', link: '' });
    setValidationMessage({ name: '', link: '' });
    setIsValid({ name: false, link: false });
  }, [isOpen])

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Новое место"
      onSubmit={handleSubmit}
      formClassName="popup__form"
      submitButtonClassName="popup"
      isDisabled={!isFormValid}
      submitButtonText="Создать"
      onClick={onClick}
    >

      <label className="popup__field">
        <input
          className="popup__input popup__input_place"
          type="text"
          name="name"
          id="place-name"
          placeholder="Название"
          required
          minLength={2}
          maxLength={30}
          value={inputValue.name}
          onChange={handleInputChange}

        />
        <span className={!isValid.name ? "popup__input-error popup__input-error_place" : ""} id="place-name-error">{validationMessage.name}</span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_image"
          type="url"
          name="link"
          id="link-image"
          placeholder="Ссылка на картинку"
          required
          value={inputValue.link}
          onChange={handleInputChange}

        />
        <span className={!isValid.link ? "popup__input-error popup__input-error_image" : ""} id="link-image-error">{validationMessage.link}</span>
      </label>


    </PopupWithForm>
  )
}

export default AddPlacePopup;