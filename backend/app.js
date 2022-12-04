const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const createError = require('http-errors')
const routers = require('./routers')
const { model } = require('mongoose')
const { Connection } = require('./models')
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerAutogen = require('swagger-autogen');
const swaggerFile = require('./swagger_output.json')
const routersLogin = require('./routersLogin')
const {User: userModels} = require ('./models')
const pubsub = require('./lib/pubsub')


const jwt = require('jsonwebtoken')
const { urlencoded } = require('body-parser')
const ACCESS_TOKEN_SECRET = "kamehameha"

const app = express()

//app.use(helmet())

app.use(cors())

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const urlencodedMiddleware = bodyParser.urlencoded({
  extended: true
})

app.use((req,res,next)=>(/^multipart\//i.test(req.get('Content-Type'))) ? next() : urlencodedMiddleware(req,res,next))

app.use(bodyParser.json({
  defer: true
}))

app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'some secret here'
}))

function authenticatetoken(req,res,next){
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.toString()
  if (token ==null ) return next(createError(401))
  jwt.verify(token,ACCESS_TOKEN_SECRET, (err,user)=>{
    if(err) return next(createError(403))
    userModels.findOne({_id: user._id})
      .then((u)=>{
        req.user=u
        next()
      })
      .catch(error =>next(error))
  })
}

// take the errors from session and clean
app.use(function (req, res, next) {
  // expose "error" local variable
  res.locals = Object.assign(res.locals, req.session.form)
  res.locals.errors = Object.assign([], res.locals, req.session.errors)
  res.locals.messages = Object.assign([], res.locals, req.session.messages)
  next()
  // empty or "flush" the error so they
  // don't build up
  req.session.errors = []
  req.session.messages = []
  req.session.form = {}
})

app.use((req, res, next) => Connection
  .then(() => next())
  .catch(err => next(err))
)

app.use(pubsub.pub)

app.use('/',routersLogin)
app.use('/v1', authenticatetoken,routers
/*#swagger.security = [{
  "JWT":[]
}]*/)


module.exports = app