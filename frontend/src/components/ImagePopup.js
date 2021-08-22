import React from "react";
import closeIcon from '../images/close_icon.svg'

function ImagePopup(props) {
    return (
        <section
            className={props.isOpen ? 'popup popup_opened' : 'popup'} id="popup-image">
            <div className="popup-image__container">
                <button onClick={props.onClose} className="popup__close" aria-label="Закрыть" type="button">
                    <img src={closeIcon} className="popup-image__close-btn" alt="кнопка закрытия" />
                </button>

                <img src={props.card.link} alt={props.card.name} className="popup-image__content" id="img01" />
                <div className="popup-image__caption">{props.card.name}</div>
            </div>
        </section>
    );
}

export default ImagePopup;