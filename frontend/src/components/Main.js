import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main(props) {
    const { onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete } = props;
    const currentUser = React.useContext(CurrentUserContext);

    return (

        <main className="content">
            <section className="profile">
                <div className="profile__avatar">
                    <img
                        className="profile__image"
                        src={currentUser.avatar}
                        alt="аватар"

                    />
                    <div className="profile__avatar-overlay">
                        <button
                            onClick={onEditAvatar}
                            type="button"
                            className="profile__avatar-edit"
                            aria-label="обновить фотографию пользователя">
                        </button>
                    </div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <button
                        onClick={onEditProfile}
                        className="profile__button-edit"
                        type="button"
                        aria-label="Редактировать профиль">
                    </button>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button
                    onClick={onAddPlace}
                    className="profile__button-add"
                    aria-label="Добавить карточку"
                    type="button">
                </button>
            </section>

            <section className="elements">
                <ul className="elements__list">
                    {props.cards.map(card => (
                        <Card {...card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                            key={card._id}
                            card={card}
                        />)
                    )}
                </ul>
            </section>
        </main >

    );
}

export default Main;