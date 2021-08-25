import React from "react";
import Popup from './Popup';

function ImagePopup({ onClose, isOpen, card }) {
    return (
        <Popup
            name="image"
            classname="popup-image__container"
            onClose={onClose}
            isOpen={isOpen}
        >
            <img
                className="popup-image__content"
                src={card ? card.link : ""}
                alt={card ? card.name : ""}
            />

            <figcaption
                className="popup-image__caption">
                {card ? card.name : ''}
            </figcaption>
        </Popup >
    )
}

export default ImagePopup;