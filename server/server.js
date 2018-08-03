const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {Users} = require('./utils/users');

const {generateMessage , generateLocationMessage} = require('./utils/message');
const { isRealString } = require('./utils/validation');

const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket)=> {
    console.log(`new user connected`);

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required');
        }
        // io.emit() -> io.to("room-name").emit()
        // socket.broadcast.emit -> socket.broadcast.to("roommane").emit()
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));  
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chatapp'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));       
        callback();
    });

    socket.on('createMessage', (message, callback)=>{
        var user = users.getUser(socket.id)[0];
        
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name,message.text));
        }
        callback();
    });

    socket.on('createLocationMessage', (coords)=>{
        var user = users.getUser(socket.id)[0];
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });
    //when the user is disconnected
    socket.on('disconnect', ()=>{
        var user = users.removeUser(socket.id);
        if(user) {
            io.to(user[0].room).emit('updateUserList', users.getUserList(user[0].room));
            io.to(user[0].room).emit('newMessage', generateMessage('Admin', `${user[0].name} has left`));
        }
    });
});
server.listen(port, () => console.log(`app running on port ${port}`));
