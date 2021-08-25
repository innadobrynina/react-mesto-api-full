import React from 'react';
import Form from './Form';
import AuthInput from './AuthInput';
import SubmitButton from './SubmitButton';

function Login({ onLoggin }) {
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
        e.preventDefault()
        const { email, password } = inputValue;
        if (!email || !password) {
            return;
        }
        onLoggin(email, password);
    }
    return (
        <>
            <Form
                title="Вход"
                onSubmit={handleSubmit}
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
                    button="Войти"
                    classname="auth"
                >
                </SubmitButton>
            </Form>
        </>
    );
}

export default Login;