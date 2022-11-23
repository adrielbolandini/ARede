const express = require('express')

const router = express.Router()

const {
    PostController,
    CommentController,
    UserController
  } = require('./controllers')

router
  .route('/signup')
  .post(UserController.createUser)

router
  .route('/login')
  .post(UserController.login)

router
  .route('/users')
  .get(UserController.show)

module.exports = router