const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  addCard,
  deleteCard,
  setLike,
  removeLike,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(/((http|https):\/\/)?(www\.)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~]*)*(#[\w-]*)?(\?.*)?/),
    }),
  }),
  addCard);
router.delete('/cards/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().required().length(24),
    }),
  }),
  deleteCard);
router.put('/cards/:id/likes',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().required().length(24),
    }),
  }),
  setLike);
router.delete('/cards/:id/likes',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().required().length(24),
    }),
  }),
  removeLike);

module.exports = router;
