const { connect, connection } = require('mongoose')
const { MONGODB_URI } = require('./config')

const connectDB = async () => {
  await connect(MONGODB_URI)
}

connection.on('error', (err) => console.log(err))

module.exports = {
  connectDB,
  connection
}
