const createError = require('http-errors')
const { Connection, User,Profile } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ACCESS_TOKEN_SECRET = "kamehameha" //todo

module.exports = {
    /**
     * @route GET /users/me
     * @group User
     * @returns {User}
     * @returns {Error}
     * @security JWT
     */
  show: ((req,res,next)=>Promise.resolve()
    .then(()=>User.findById(req.user.id))
    .then((data)=> data? res.status(200).json(data): next(createError(404)))
    .catch(err => next(err))
  ),
  update: ((req,res,next)=>Promise.resolve()
    .then(()=>User.findByIdAndUpdate(req.user.id,req.user.body,{runValidators: true}))
    .then((data)=> res.status(203).json(data))
    .catch(err => next(err))
  ),
  search: ((req,res,next)=>Promise.resolve()
    .then(()=> Profile.find({$text:{$search: `${req.query.q}`}},{score: {$meta:'textScore'}}).sort({score:{
        $meta: 'textScore'}}))
    .then((data)=> data ? res.status(200).json(data): next(createError(404)))
    .catch(err => next(err))
  ),
  relatives: ((req,res,next)=> Promise.resolve()
        .then(()=> Profile.findById(req.params.id).populate(['following','followers']))
        .then((data)=> data? res.status(200).json(data):next(createError(404)))
        .catch(err => next(err))
  ),
  newrelative: ((req,res,next)=>Promise.resolve()
        .then(()=> Profile.findOneAndUpdate({_id:req.params.id},{$push:{followers: req.user.profile._id}}))
        .then(()=> Profile.findOneAndUpdate({_id:req.user.profile._id},{$push:{following: req.params.id}}))
        .then((data)=> res.status(203).json(data))
        .catch(err => next(err))
  )
  
 }