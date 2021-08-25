import React from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import AuthInput from './AuthInput';
import SubmitButton from './SubmitButton.js';

function Register({ onRegister }) {

    const [inputValue, setInputValue] = React.useState({
        email: '',
        password: ''
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    }


    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = inputValue;
        onRegister(email, password);
    }
    return (
        <>
            <Form
                title="Регистрация"
                onSubmit={handleSubmit}
                text={"Уже зарегистрированы?"}
                link={<Link className="auth__link" to="/sign-in">Войти</Link>}
            >
                <AuthInput
                    type="email"
                    placeholder="Email"
                    value={inputValue.email}
                    name="email"
                    onChange={handleInputChange}
                />
                <AuthInput
                    type="password"
                    placeholder="Пароль"
                    value={inputValue.password}
                    name="password"
                    onChange={handleInputChange}
                />
                <SubmitButton
                    button="Зарегистрироваться"
                    classname="auth"
                >
                </SubmitButton>
            </Form>
        </>
    );
}

export default Register;