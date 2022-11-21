const createError = require('http-errors')
const { Comment, Post } = require('../models')
module.exports = {
  beforeAllById: (req, res, next, id) => Promise.resolve()
    .then(() => {
      res.locals.post = { id }
      next()
    })
    .catch(err => next(err)),
  list: (req, res, next) => Promise.resolve()
    .then(() => Comment.find({ post: res.locals.post.id }))
    .then((data) => {
      res.send({
        comments: data
      })
    })
    .catch(err => next(err)),
  add: (req, res, next) => Promise.resolve()
    .then(() => new Comment(Object.assign(req.body, { post: res.locals.post.id })).save())
    .then((comment) => Post.findById(comment.post)
      .then(post => Object.assign(post, { comments: [...post.comments, comment._id] }))
      .then(post => Post.findByIdAndUpdate(comment.post, post))
      .then(() => comment)
    )
    .then(() => {
      res.status(201).end()
    })
    .catch(err => next(err)),
  show: (req, res, next) => Promise.resolve()
    .then(() => Comment.findById(req.params.id))
    .then((data) => {
      if (data) {
        res.send({
          comment: data
        })
      } else {
        next(createError(404))
      }
    })
    .catch(err => next(err)),
  save: (req, res, next) => Promise.resolve()
    .then(() => Comment.findByIdAndUpdate(req.params.id, req.body.comment, {
      runValidators: true
    }))
    .then((data) => {
      res.status(201).end()
      //res.redirect(`/v1/posts/${res.locals.post.id}/comments/${req.params.id}`)
    })
    .catch(err => next(err)),
  delete: (req, res, next) => Promise.resolve()
    .then(() => Comment.deleteOne({ _id: req.params.id }))
    .then(() => {
      res.status(204).end()
      //res.redirect(`/v1/posts/${res.locals.post.id}`)
    })
    .catch(err => next(err)),
  edit: (req, res, next) => Promise.resolve()
    .then(() => Comment.findById(req.params.id))
    .then((data) => {
      res.send({
        comment: data
      }).status(200)
    })
    .catch(err => next(err)),
  new: (req, res, next) => Promise.resolve()
    .then((data) => {
      res.send({ comment: new Comment(res.locals.comment) }).status(201)
    })
    .catch(err => next(err))
}
