const express = require('express')

const router = express.Router()

const {
    SecurityController
  } = require('./controllers')

router
  .route('/signup')
  .post(SecurityController.createUser)

router
  .route('/login')
  .post(SecurityController.login)

router
  .route('/users')
  .get(SecurityController.show)

module.exports = router