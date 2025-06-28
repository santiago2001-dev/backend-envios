require('dotenv').config()
const Server = require('./config/server/server')
const server = new Server();
server.listen();