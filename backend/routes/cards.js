const cardsRoutes = require('express').Router();
const { validateCardInfo, validateCardId } = require('../middlewares/celebrate');
const {
  createCard, getCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRoutes.get('/cards', getCard);

cardsRoutes.post('/cards', validateCardInfo, createCard);

cardsRoutes.delete('/cards/:cardId', validateCardId, deleteCard);

cardsRoutes.put('/cards/:cardId/likes', validateCardId, likeCard);

cardsRoutes.delete('/cards/:cardId/likes', validateCardId, dislikeCard);

module.exports = cardsRoutes;
