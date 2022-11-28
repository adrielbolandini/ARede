const { Schema, model } = require('mongoose')
const Redact = require('./redact')
/**
 * @typeof Post
 * @property {string} _id
 * @property {string} title.required
 * @property {string} description.required
 * @property {Profile} profile.required
 * @property {Array.<Comment>} comments
 */
const postSchema = new Schema({
  title: {
    type: String,
    required: [true, 'titulo obrigatorio'],
    minLength: [2, 'titulo no minimo 2']
  },
  description: {
    type: String,
    required: [true, 'descricao obrigatoria'],
    validate: { // bonus track
      validator: (val) => Redact
        .count({ term: val })
        .then(count => count === 0),
      message: 'nao pode usar a palavra {VALUE}'
    }
  },
  profile:{
    type:Schema.Types.ObjectId,
    ref:'Profile'
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }],
  image: {
    type: Boolean,
    default:false
  }
}, { timestamps: true })

module.exports = model('Post', postSchema)
