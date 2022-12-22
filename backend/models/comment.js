const { Schema, model } = require('mongoose')
/**
 * @typeof Comment
 * @property {string} _id
 * @property {string} description.required
 * @property {Profile} profile.required
 * @property {Post} post.required
 */
const commentSchema = new Schema({
  description: {
    type: String,
    required: true,
    minLength: 2
  },
  profile:{
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }]
}, { timestamps: true })

module.exports = model('Comment', commentSchema)
