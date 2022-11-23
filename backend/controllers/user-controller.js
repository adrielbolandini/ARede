const createError = require('http-errors')
const { Connection, User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ACCESS_TOKEN_SECRET = "kamehameha" //todo

module.exports = {
  beforeAll: (req, res, next, id) => Promise.resolve()
    .then(() => Connection.then())
    .then(()=>{
      next()
    })
    .catch(err => next(err)),
  show: ((req,res,next)=>Promise.resolve()
    .then(()=>User.find({}))
    .then((data)=>res.status(200).json(data))
    .catch(err => next(err))
  ),
  login: ((req,res,next)=>Promise.resolve()
  .then(()=>User.findOne({user: req.body.user}))
  .then((user)=>user? bcrypt.compare(req.body.password, user.password): next(createError(404)))
  .then((passHashed)=> passHashed ? jwt.sign(req.body.user, ACCESS_TOKEN_SECRET): next(createError(401)))
  .then((accessToken)=>res.status(201).json(accessToken))
  .catch(err => next(err))
  ),
  createUser:((req,res,next)=>Promise.resolve()
    .then(()=> bcrypt.hash(req.body.password,10))
    .then((passHashed)=> new User({...req.body,password:passHashed}).save())
    .then(({data})=> res.status(201).json(data))
    .catch(err => next(err))
  )
 }