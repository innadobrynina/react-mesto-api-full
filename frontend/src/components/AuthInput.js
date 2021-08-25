import React from 'react';

function AuthInput({ type, placeholder, name, value, onChange }) {

    return (
        <input
            className="auth__item"
            type={type}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
            required
        />
    );
}

export default AuthInput;