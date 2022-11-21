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

const app = express()

app.use(helmet())

app.use(cors())

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(express.urlencoded({
    extended: true
  }))

app.use(bodyParser.json())

//app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'some secret here'
}))

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

app.get('/', (req, res) => res.redirect('/v1/posts'))
app.use('/v1', routers)

module.exports = app