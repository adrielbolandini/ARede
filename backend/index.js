const http = require('http')
const socketio = require("socket.io")
const jwt = require('jsonwebtoken')
const {User: UserModel} = require('./models')

const pubsub = require ('./pubsub')
const app = require('./app')
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "kamehameha"

const server = http.Server(app)
const io = socketio(server,{
  cors:{
    origin: '*'
  }
})

const liveData = io.of('/v1')

liveData.use((socket,next)=>{
  if (socket.handshake.auth && socket.handshake.auth.token){
    jwt.verify(socket.handshake.auth.token, ACCESS_TOKEN_SECRET, function (err,user){
      if (err) return next(new Error('Authentication Error'))
      UserModel.findOne({
        user
      }).populate('profile')
        .then(u=>{
          if(u) {
            socket.profile = u.profile
          next()
        } else {
          next(new Error('Authentication Error'))
        }
        })
    })
    }
})

liveData.on('connection', function(socket){
  console.warn(`a user connected live ${socket.profile.name}`)
  socket.on('disconnected',()=>{
    console.log(socket.connected)
  })
  socket.on('error',(err)=>{
    console.error(err)
  })
  socket.emit('connect_profile',socket.profile)
})

pubsub.sub().then((sub)=>{
  sub.on('message',function(message,content,ackOrNack){
    ackOrNack()
    Object.entries(Object.fromEntries(liveData.sockets))
    .filter(([,v])=>content.keys.includes(v.profile._id.toString()))
    .map(([k,v])=>{
      return v.emit(content.type,content.payload)
    })
  })
}).catch(console.error)

app.listen(process.env.PORT || 4000, () => {
  console.log(`server listen on http://localhost:${process.env.PORT} || 4000`)
})

console.log('ENV VARIABLES:')
console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`PORT: ${process.env.PORT}`)
console.log(`MONGODB: ${process.env.MONGODB}`)