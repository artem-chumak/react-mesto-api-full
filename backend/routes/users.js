const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);

router.get('/users/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().required().length(24),
    }),
  }),
  getUserById);

router.patch('/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser);

router.patch('/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(/((http|https):\/\/)?(www\.)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~]*)*(#[\w-]*)?(\?.*)?/),
    }),
  }),
  updateAvatar);

module.exports = router;
