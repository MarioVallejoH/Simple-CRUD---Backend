const Server = require('./models/server');

require('dotenv').config();


// console.log(process.env.MONGODB_CNN, '++++++++++++++++++++++++++++++++++++')
const server = new Server();

server.startListening();
 


