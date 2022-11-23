const createError = require('http-errors')
const { Post } = require('../models')

exports.list = (req, res, next) => Promise.resolve()
  .then(() => Post.find({}))
  .then((data) => (req.accepts(['html', 'json']) === 'json')
    ? res.json(data)
    : res.send({ posts: data })
  )
  .catch(err => next(err))

exports.add = (req, res, next) => Promise.resolve()
  .then(console.log(`${req.body} e ${req.user}`))
  .then(() => new Post({...req.body, user : req.user._id}).save())
  .then((data) => {
    res.status(201).end()
    //res.redirect(`/v1/posts/${data._id}`)
  })
  .catch(err => next(err))

exports.show = (req, res, next) => Promise.resolve()
  .then(() => Post.findById(req.params.id).populate({
    path: 'comments'
  }))
  .then((data) => {
    if (data) {
      (req.accepts(['html', 'json']) === 'json')
        ? res.json(data)
        : res.send({ post: data })
    } else {
      next(createError(404))
    }
  })
  .catch(err => next(err))

exports.save = (req, res, next) => Promise.resolve()
  .then(() => Post.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true
  }))
  .then((data) => {
    res.status().end()
    res.redirect(`/v1/posts/${req.params.id}`)
  })
  .catch(err => next(err))

exports.delete = (req, res, next) => Promise.resolve()
  .then(() => Post.deleteOne({ _id: req.params.id }))
  .then(() => {
    res.status(204).end()
    //res.redirect('/v1/posts')
  })
  .catch(err => next(err))

exports.edit = (req, res, next) => Promise.resolve()
  .then(() => Post.findById(req.params.id))
  .then((data) => {
    res.send({
      post: data
    }).status(204)
  })
  .catch(err => next(err))

exports.new = (req, res, next) => Promise.resolve()
  .then(console.log(req.local))
  .then((data) => {
    res.send({ post: new Post({...res.locals.post, user:req.user._id}) })
  }).status(201)
  .catch(err => next(err))
