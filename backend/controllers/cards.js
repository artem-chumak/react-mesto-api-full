const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError'); // 400
const NotFoundError = require('../errors/NotFoundError'); // 404
const ForbiddenAccessError = require('../errors/ForbiddenAccessError'); // 403

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.status(200).json(cards);
  } catch (error) { next(error); }
};

const addCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const card = new Card({ name, link, owner });
    await card.save();
    return res.status(201).json(card);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } return next(error);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const card = await Card.findById(req.params.id);
    if (!card) {
      throw new NotFoundError('Карточки с таким номером нет');
    }
    if (card.owner.toString() !== userId) {
      throw new ForbiddenAccessError('Можно удалять только свои карточки');
    }
    await Card.remove(card);
    return res.status(200).json(card);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } return next(error);
  }
};

const setLike = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Передан несуществующий id карточки');
    } return res.status(200).json(card);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } return next(error);
  }
};

const removeLike = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Передан несуществующий id карточки');
    } return res.status(200).send(card);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } return next(error);
  }
};

module.exports = {
  getCards,
  addCard,
  deleteCard,
  setLike,
  removeLike,
};
