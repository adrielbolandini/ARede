const express = require('express')

const {
  PostController,
  CommentController,
  FeedController,
  ProfileController
} = require('./controllers')

const router = express.Router()

router
  .route('/profile')
  .get(
    /**
   *  #swagger.tags = ['Profile']
   */
    ProfileController.show
    )
  .post(
  /**
  *  #swagger.tags = ['Profile']
  */
    ProfileController.update)

router
  .route('/profile/followers/:id')
  .get(
  /**
   *  #swagger.tags = ['Profile']
   */
    ProfileController.relatives)

router
  .route('profiles/search?q={q}')
  .get(
  /**
  *  #swagger.tags = ['Profile']
  */
    ProfileController.search)

router
  .route('/profile/follow/:id')
  .post(
  /**
   *  #swagger.tags = ['Profile']
  */
  ProfileController.newrelative)

router
  .route('/feed')
  .get(
  /**
  *  #swagger.tags = ['Feed']
 */
    FeedController.list)

router
  .route('/posts')
  .get(
  PostController.list)
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

router
  .route('/posts/:id/like')
  .post(PostController.like)

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

nRouter
  .route('/:postId/comments/:id/like')
  .get(CommentController.like)

router.use('/posts', nRouter)

module.exports = router