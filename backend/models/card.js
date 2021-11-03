const { Types, Schema, model } = require('mongoose');
const validator = require('validator');

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link, { protocols: ['http', 'https'], require_protocol: true }),
      message: 'Некорректная ссылка',
    },
  },
  owner: {
    type: Types.ObjectId,
    ref: 'user',
  },
  likes: [{
    type: Types.ObjectId,
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('card', cardSchema);
