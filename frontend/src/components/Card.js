import React from 'react';
import trashCard from '../images/trash.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext'


function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `card__remove ${isOwn ? 'card__remove_visible' : 'card__remove_hidden'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `card__like ${isLiked ? 'card__like_active' : 'card__like'}`
    );

    function handleClick() {
        props.onCardClick(props.name, props.link);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <div className="card">
            <button onClick={handleDeleteClick} type="button" className={cardDeleteButtonClassName}><img src={trashCard} alt="корзина" /></button>
            <div onClick={handleClick} className="card__image-block" style={{ backgroundImage: `url(${props.link})` }}>
            </div>
            <div className="card__text">
                <h2 className="card__title">{props.name}</h2>
                <div className="card__like-wrap">
                    <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button" aria-label="Мне нравится" />
                    <span className='card__likes-counter'>{props.likes}</span>
                </div>
            </div>

        </div>
    );
}

export default Card;