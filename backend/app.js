const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
//const session = require('express-session')
const createError = require('http-errors')
const routers = require('./routers')
const { model } = require('mongoose')

const app = express()

app.use(express.urlencoded({
    extended: true
  }))

app.use(bodyParser.json())

app.use(methodOverride('_method'))

app.get('/', (req, res) => res.redirect('/v1/posts'))
app.use('/v1', routers)

module.exports = app