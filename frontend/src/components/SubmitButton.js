import React from 'react';

function SubmitButton({ classname, isDisabled, onClick, button }) {

    return (
        <button
            type="submit"
            className={`${classname}__button-submit ${isDisabled ? 'popup__button-submit_disabled' : ''}`}
            disabled={isDisabled}
        >
            {onClick ? "Сохранение..." : button}
        </button>
    )
}

export default SubmitButton;