import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card(props) {

    const { card } = props;
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    const cardDeleteButtonClassName = (
        `card__remove ${isOwn ? 'card__remove_visible' : 'card__remove_hidden'}`
    );
    const cardLikeButtonClassName = (
        `card__like ${isLiked ? 'card__like_active' : 'card__like'}`
    );

    function handleClick() {
        props.onCardClick(card);
    }

    function handleLikeClick() {
        props.onCardLike(card);
    }

    function handleDeleteClick() {
        props.onCardDelete(card);
    }

    return (
        <div className="card">
            <img
                className="card__image"
                src={card.link} alt={card.name}
                onClick={handleClick}
            />
            <button
                type="button"
                aria-label="корзина"
                className={cardDeleteButtonClassName}
                onClick={handleDeleteClick}>
            </button>

            <div className="card__info">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-wrap">
                    <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button" aria-label="Мне нравится" />
                    <span className='card__likes-counter'>{card.likes.length}</span>
                </div>
            </div>

        </div>
    );
}

export default Card;