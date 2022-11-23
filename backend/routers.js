const express = require('express')

const {
  PostController,
  CommentController,
  UserController
} = require('./controllers')

const router = express.Router()

router
  .route('/signup')
  .post(UserController.createUser)

router
  .route('/login')
  .post(UserController.login)

router
  .route('/users')
  .get(UserController.show)

router
  .route('/posts')
  .get(PostController.list)
  .post(PostController.add)
router
  .route('/posts/new')
  .get(PostController.new)
router
  .route('/posts/:id')
  .get(PostController.show)
  .put(PostController.save)
  .delete(PostController.delete)
router
  .route('/posts/:id/edit')
  .get(PostController.edit)

const nRouter = express.Router()

nRouter
  .param('postId', CommentController.beforeAllById)
  .route('/:postId/comments')
  .get(CommentController.list)
  .post(CommentController.add)
nRouter
  .route('/:postId/comments/new')
  .get(CommentController.new)
nRouter
  .route('/:postId/comments/:id')
  .get(CommentController.show)
  .put(CommentController.save)
  .delete(CommentController.delete)
nRouter
  .route('/:postId/comments/:id/edit')
  .get(CommentController.edit)

router.use('/posts', nRouter)

module.exports = router