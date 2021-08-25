import React from 'react';
import headerLogo from "../images/logo.svg";
import { Route, Switch, Link } from 'react-router-dom';



function Header({ email, onClick, loggedIn }) {

    const [isOpen, setIsOpen] = React.useState(true);
    const [isClicked, setIsClicked] = React.useState(false);

    const linkClassName = "header__link";

    const handleClick = () => {
        setIsOpen(!isOpen);
        setIsClicked(!isClicked);
    };

    return (
        <>
            {loggedIn && <div className={`header__menu ${isOpen ? `` : `header__menu_visible`}`}>
                <p className="header__email_menu">{email}</p>
                <Link to="/" onClick={onClick} className="header__link_menu">Выйти</Link>
            </div>}

            <div className="header">
                <img src={headerLogo} className="header__logo" alt="Логотип" />
                <div className="header__container">

                    <Switch>
                        <Route path="/sign-in">
                            <Link to="/sign-up" className={linkClassName}>Регистрация</Link>
                        </Route>
                        <Route path="/sign-up">
                            <Link to="/sign-in" className={linkClassName}>Войти</Link>
                        </Route>
                        <Route path="/">
                            <button className={`header__button 
                ${isClicked ? 'header__button-close' : 'header__button-open'}`}
                                onClick={handleClick}
                            >
                            </button>
                            <p className="header__email">{email}</p>
                            <Link to="/" onClick={onClick} className="header__link">Выйти</Link>
                        </Route>
                    </Switch>

                </div>
            </div>
        </>
    )
}
export default Header;