const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage , generateLocationMessage} = require('./utils/message')

const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket)=> {
    console.log(`new user connected`);
    
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chatapp'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

    socket.on('createMessage', (message, callback)=>{
        console.log(`Message: `);
        console.log(JSON.stringify(message,undefined, 2));
        io.emit('newMessage', generateMessage(message.from,message.text));
        callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords)=>{
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });
    //when the user is disconnected
    socket.on('disconnect', ()=>{
        console.log('user was disconnected');
    });
});
server.listen(port, () => console.log(`app running on port ${port}`));
