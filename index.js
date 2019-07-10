const express = require('express');

const server = express();
const Routes = require('./Routes')

server.use('/api', Routes);


server.listen(6000, ()=> console.log ('Running on 6000'))