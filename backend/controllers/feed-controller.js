const express = require('express')
const router = express.Router()
const {Post,Profile} = require('../models')

/*router
.route(/)*/

/**
 * @route GET /feed
 * @group feed
 * @returns {Array.<Post>}
 * @returns {Error}
 * @security JWT
 */

exports.list = ((req,res,next)=> Promise.resolve()
    .then(()=>Profile.findByIdAndUpdate(req.user.profile._id))
    .then((profile)=> Post.find({profile:{$in: profile.following}}).populate('profile'))
    .then((data)=> res.status(200).json(data))
    .catch((err) => next(err))
)
