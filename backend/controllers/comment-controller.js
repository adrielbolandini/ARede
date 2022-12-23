const createError = require('http-errors')
const { Comment, Post,Profile } = require('../models')
module.exports = {
  beforeAllById: (req, res, next, id) => Promise.resolve()
    .then(() => {
      res.locals.post = { id }
      next()
    })
    .catch(err => next(err)),
  list: (req, res, next) => Promise.resolve()
    .then(() => Comment.find({ post: res.locals.post.id }).populate('post').populate('profile'))
    .then((data) => {
      console.log(data)
      res.json(
        data
      )
    })
    .catch(err => next(err)),
  add: (req, res, next) => Promise.resolve()
    //.then(() => new Comment({...req.body, post: res.locals.post.id, profile : req.user.profile._id}).save())
    .then(() => new Comment({...req.body, post: req.params.postId, profile : req.user.profile._id}).save())//1
    .then((comment) => Post.findById(comment.post)
      //.then(post => Object.assign(post, { comments: [...post.comments, comment._id, comment.profile.name] }))
      .then(post => post.updateOne({ $push: { comments: comment.id } })) //1
      .then(post => Post.findByIdAndUpdate(comment.post, post))
      .then(args=>req.publish('comment', [args.profile],args))
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
  //req.body.comments
    .then(() => Comment.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true
    }))
    .then((data) => {
      res.status(201).end()
    })
    .catch(err => next(err)),
  delete: (req, res, next) => Promise.resolve()
    .then(() => Comment.deleteOne({ _id: req.params.id }))
    .then(() => {
      res.status(204).end()
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
      res.send({ comment: new Comment({...res.locals.comment,profile:req.user._id}) }).status(201)
    })
    .catch(err => next(err)),
/**
 * 
 * @route POST /posts/{postId}/comments/{id}/like 
 * @param {string} postId.path.require 
 * @param {string} id.path.require 
 * @group Cooment 
 * @security JWT 
 */  
  like: (req, res, next) => Promise.resolve()
    .then(()=> Post.findOneAndUpdate({_id: req.params.id},{$push: {likes:req.user._id}}))
    .then(args=> req.publish('comment-like', [args.profile],args))
    .then((data)=> res.status(200).json(data))
    .catch(err => next(err))
}
