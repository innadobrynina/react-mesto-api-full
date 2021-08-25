
import React, { useEffect } from 'react';

function Popup({ onClose, isOpen, name, classname, children, submitButtonClass, isDisabled, onClick, button }) {


    useEffect(() => {
        function handleEsc(event) {
            if (event.key !== 'Escape') {
                return
            }
            onClose();
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
        }

        return () => document.removeEventListener('keydown', handleEsc);
    }, [isOpen]);

    return (
        <section className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
            <div className={classname}>
                <button
                    type="button"
                    aria-label="закрыть модальное окно"
                    className="popup__close"
                    onClick={onClose}>
                </button>
                {children}
            </div>
        </section>
    )
}

export default Popup;