import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';



function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isMessagePopupOpen, setMessagePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [message, setMessage] = useState('');

  const history = useHistory();

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([info, card]) => {
        setCurrentUser(info);
        setCards(card);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  //лайк карточки
  function handleCardLike(card) {
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    api.changeLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      })
  }
  //удаление карточки
  function handleCardDelete(card) {
    setIsLoading(true)
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
        closeAllPopups()
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }


  function handleDeleteClick(card) {
    setSelectedCard(card)
    setDeletePopupOpen(true);
  }

  // открытие попапа картинки
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }


  // открытие попапа изменения аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  // открытие попапа изменения данных пользователя
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // открытие попапа добавления картинки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }


  // закрытие попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setDeletePopupOpen(false);
    setMessagePopupOpen(false);
    setSelectedCard({});
  }

  //обновление данных пользователя
  function handleUpdateUser(data) {
    setIsLoading(true)
    api.setUserData(data)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // обновление аватара
  function handleUpdateAvatar(data) {
    setIsLoading(true)
    api.setUserAvatarData(data)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups()
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  }

  // добавление новой карточки через форму
  function handleAddPlaceSubmit(card) {
    setIsLoading(true)
    api.postNewCard(card)
      .then((results) => {
        setCards([results, ...cards]);
        closeAllPopups()
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  }

  //регистрация
  function handleRegister(email, password) {
    auth.register(email, password)
      .then((data) => {
        if (data) {
          history.push('/sign-in');
          setMessagePopupOpen(true);
          setIsSuccessful(true);
          setMessage('Вы успешно зарегистрировались!');
        }
      })
      .catch((err) => {
        setMessage('Что-то пошло не так! Попробуйте ещё раз');
        setMessagePopupOpen(true);
        setIsSuccessful(false);
        if (err === 400) {
          return console.log('Некорректно заполнено одно из полей');
        }
      })
  }


  //авторизация
  function handleLogin(email, password) {

    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          setEmail(email)
          setLoggedIn(true);
          localStorage.setItem('token', data.token)
          history.push('/')
        }
      })
      .catch((err) => {
        setMessage('Что-то пошло не так! Попробуйте ещё раз');
        setMessagePopupOpen(true);
        setIsSuccessful(false);
        if (err === 400) {
          return console.log('Не передано одно из полей');
        }
        if (err === 401) {
          return console.log('Пользователь с email не найден');
        }
      })
  }


  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
        .then((data) => {
          setEmail(data.data.email)
          setLoggedIn(true)
          history.push('/')
        })
        .catch((err) => {
          if (err === 401) {
            return console.log('Токен не передан или передан не в том формате');
          }
        })
    }
  }

  // Выход из системы
  function handleSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/sign-in')
  }

  useEffect(() => {
    tokenCheck();
  }, []);


  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>

        <div className="container">

          <Header
            email={email}
            onClick={handleSignOut}
            loggedIn={loggedIn}
          />

          <Switch>

            <ProtectedRoute exact path='/' loggedIn={loggedIn}>
              <Main
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteClick}
              />
              <Footer />
            </ProtectedRoute>
            <Route path="/sign-up">
              <Register
                onRegister={handleRegister}
              />
            </Route>
            <Route path="/sign-in">
              <Login
                onLoggin={handleLogin}
              />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onClick={isLoading}
        />

        <AddPlacePopup
          onClick={isLoading}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onClick={isLoading}
        />

        <ConfirmPopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onDelete={handleCardDelete}
          card={selectedCard}
          onClick={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isMessagePopupOpen}
          isSuccess={isSuccessful}
          message={message}
          onClose={closeAllPopups}
        />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
