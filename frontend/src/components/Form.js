import React from 'react';

function Form({ title, children, text, onSubmit, link }) {
    return (
        <div className="auth">
            <h3 className="auth__header">{title}</h3>
            <form
                className="auth__form"
                action="#"
                onSubmit={onSubmit}
            >
                {children}
            </form>
            <div className="auth__info">
                <h4 className="auth__text">{text}</h4>
                {link}
            </div>
        </div>
    );
}

export default Form;