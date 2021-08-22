import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext'


function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <div className="content">
                <section className="profile">
                    <div className="profile__avatar-block">
                        <div className="profile__avatar" alt="аватар" style={{ backgroundImage: `url(${currentUser.avatar})` }} />
                        <div onClick={props.onEditAvatar} className="profile__avatar-overlay"></div>
                    </div>
                    <div className="profile__info">
                        <div className="profile__text">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button onClick={props.onEditProfile} className="profile__button-edit" type="button" aria-label="Редактировать профиль"></button>
                        </div>
                        <p className="profile__subtitle">{currentUser.about}</p>

                    </div>

                    <button onClick={props.onAddPlace} className="profile__button-add" aria-label="Добавить карточку" type="button"></button>

                </section>
                <section className="elements">
                    {props.cards.map((card) => (
                        <Card
                            key={card._id}
                            link={card.link}
                            name={card.name}
                            likes={card.likes.length}
                            card={card}
                            onCardClick={props.onCardClick}
                            onCardDelete={props.onCardDelete}
                            onCardLike={props.onCardLike}
                        />)
                    )}
                </section>
            </div>
        </main>
    );
}

export default Main;