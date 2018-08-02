const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket)=> {
    console.log(`new user connected`);

    socket.on('disconnect', ()=>{
        console.log('user was disconnected');
    })
})
server.listen(port, () => console.log(`app running on port ${port}`));