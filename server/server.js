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
    
    socket.emit('newMessage', {
        from: "Admin",
        text: 'Welcome to the chatapp',
        createdAt: new Date().getTime()
    });
    socket.broadcast.emit('newMessage', {
        from: "Admin",
        text: "New user joined the room",
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message)=>{
        console.log(`Message: `);
        console.log(JSON.stringify(message,undefined, 2));
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    })
    //when the user is disconnected
    socket.on('disconnect', ()=>{
        console.log('user was disconnected');
    });
});
server.listen(port, () => console.log(`app running on port ${port}`));