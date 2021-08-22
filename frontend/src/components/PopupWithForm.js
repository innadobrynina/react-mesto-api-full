import React from "react";
import closeIcon from '../images/close_icon.svg'

function PopupWithForm(props) {
    return (
        <section className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
            <form onSubmit={props.onSubmit} className="popup__container" name={props.name} id={props.name} method="post" action="#" autoComplete="off" noValidate>
                <h3 className="popup__title">{props.title}</h3>
                {props.children}
                <button className="popup__form-submit" type="submit">{props.buttonText}</button>
                <button onClick={props.onClose} className="popup__close" type="button"><img src={closeIcon} className="popup__close-image" alt="кнопка закрытия" /></button>
            </form>
        </section>
    );
}
export default PopupWithForm;