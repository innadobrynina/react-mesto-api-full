import React from "react";
import Popup from "./Popup";
import SubmitButton from "./SubmitButton";

function PopupWithForm({ isOpen, onClose, name, title, children, onSubmit, isDisabled, onClick, formClassName, submitButtonClassName, submitButtonText }) {
    return (
        <Popup
            classname="popup__container"
            isOpen={isOpen}
            onClose={onClose}
            submitButtonClass="popup"
        >
            <form
                onSubmit={onSubmit}
                className={formClassName}
                name={name} id={name}
                method="POST"
                action="#"
                autoComplete="off"
                noValidate
            >
                <h3 className="popup__title">{title}</h3>
                {children}

                <SubmitButton
                    classname={submitButtonClassName}
                    isDisabled={isDisabled}
                    onClick={onClick}
                    button={submitButtonText}
                >
                </SubmitButton>

            </form>

        </Popup>

    );
}
export default PopupWithForm;