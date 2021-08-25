import React from 'react';
import successIcon from '../images/success.svg';
import failIcon from '../images/fail.svg';
import Popup from './Popup';

function InfoTooltip({ isOpen, onClose, isSuccess, message }) {
    return (
        <Popup
            name="confirm"
            classname="popup__container"
            isOpen={isOpen}
            onClose={onClose}
        >
            <img
                className="popup__image"
                src={isSuccess ? successIcon : failIcon}
                alt="Изображение"
            />
            <p className="popup__message">{message}</p>
        </Popup>
    );
}

export default InfoTooltip;