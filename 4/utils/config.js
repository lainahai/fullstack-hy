
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let port = 3001
let mongoUrl = process.env.MONGODB_URI
if (process.env.NODE_ENV === 'test'){
  mongoUrl = process.env.MONGODB_TEST_URI
  port = process.env.TEST_PORT
}

module.exports = {
  port,
  mongoUrl
}