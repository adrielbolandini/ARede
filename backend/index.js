const app = require('./app')
app.listen(process.env.PORT || 4000, () => {
  console.log(`server listen on http://localhost:${process.env.PORT || 4000}`)
})

console.log('ENV VARIABLES:')
console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`PORT: ${process.env.PORT}`)
console.log(`MONGODB: ${process.env.MONGODB}`)