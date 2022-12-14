const createError = require('http-errors')
const { Connection, User,Profile } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ACCESS_TOKEN_SECRET = "kamehameha"

module.exports = {
  beforeAll: (req, res, next, id) => Promise.resolve()
    .then(() => Connection.then())
    .then(()=>{
      next()
    })
    .catch(err => next(err)),
  show: ((req,res,next)=>Promise.resolve()
    .then(()=>Profile.find({}))
    .then((data)=>res.status(200).json(data))
    .catch(err => next(err))
  ),

  login: ((req,res,next)=>Promise.resolve()
  .then(()=>User.findOne({user: req.body.user}))
  .then((user)=>user? bcrypt.compare(req.body.password, user.password).then(passHashed => [user,passHashed]): next(createError(404)))
  .then(([user,passHashed])=> passHashed ? jwt.sign(JSON.stringify(user), ACCESS_TOKEN_SECRET): next(createError(401)))
  .then((accessToken)=>res.status(201).json({accessToken}))
  .catch(err => next(err))
  ),

  createUser:((req,res,next)=>Promise.resolve()
    .then(()=> bcrypt.hash(req.body.password,10))
    .then((passHashed)=> new User({...req.body,password:passHashed}).save())
    .then(user => new Profile({name: req.body.name || req.body.user, user:user._id}).save()
      .then(profile => User.findByIdAndUpdate(user._id,{profile})))
    .then(({data})=> res.status(201).json(data))
    .catch(err => next(err))
  )
 }