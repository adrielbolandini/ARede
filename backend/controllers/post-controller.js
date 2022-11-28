const createError = require('http-errors')
const { Post,Profile } = require('../models')
const upload = require('../lib/upload')

exports.list = (req, res, next) => Promise.resolve()
  .then(() => Post.find({profile:req.user.profile._id}).populate('comments').populate('profile'))
  .then((data) => (req.accepts(['html', 'json']) === 'json')
    ? res.json(data)
    : res.send({ posts: data })
  )
  .catch(err => next(err))

exports.add = upload.concat([(req, res, next) => Promise.resolve()
  .then(console.log(`${req.body} e ${req.user}`))
  .then(() => new Post({...req.body, profile : req.user.profile._id}).save())
  .then(args=> req.publish('post',req.user.profile.followers,args))
  .then((data) => {
    res.status(201).json(data)
  })
  .catch(err => next(err))])

exports.show = (req, res, next) => Promise.resolve()
  .then(() => Post.findById(req.params.id).populate('comments').populate('profile'))
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
  .then(() => Post.findByIdAndUpdate(req.params.id, req.body, {runValidators: true}))
  .then((data) => res.status(203).json(data))
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

/**
 * 
 * @route POST /posts/{id}/like 
 * @param {string} id.path.require 
 * @group Post 
 * @security JWT 
 */  
exports.like = (req, res, next) => Promise.resolve()
  .then(()=> Post.findOneAndUpdate({_id: req.params.id},{$push: {likes:req.user.profile._id}}))
  .then(args=> req.publish('post-like', [args.profile],args))
  .then((data)=> res.status(203).json(data))
  .catch(err => next(err))
