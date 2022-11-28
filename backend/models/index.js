const mongoose = require('mongoose')
const connect = mongoose.connect(
  `${(process.env.MONGODB || 'mongodb://localhost:27017/mydb')}_${process.env.NODE_ENV || 'development'}`,
    // https://mongoosejs.com/docs/connections.html#options
    {
      serverSelectionTimeoutMS: (!process.env.NODE_ENV) ? 30000 : 40000
    } // Keep trying to send operations for 5 seconds
)
exports.Post = require('./post.js')
exports.Comment = require('./comment.js')
exports.Redact = require('./redact.js')
exports.User = require('./user.js')
exports.Profile = require('./profile.js')

mongoose.connection.on('error', () => {
  console.error('Mongo not connected')
})
mongoose.connection.on('connected', () => {
  console.info('Mongo connected')
})
mongoose.connection.on('disconnected', () => {
  console.error('Mongo disconnected')
})

exports.Connection = connect
