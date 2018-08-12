const mongoose = require ('mongoose')
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true
})
.then(()=> {
    console.log('CONNECTED TO DATABASE')
})
.catch(error => { 
    console.error('ERROR CONNECTING TO DATABASE:', error)})


module.exports = mongoose;