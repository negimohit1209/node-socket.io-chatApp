var socket = io();
socket.on('connect' , function(){
    console.log("connectd to server");
});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});

socket.on('newMessage', function (message){
    console.log(`MESSAGE: `);
    console.log(JSON.stringify(message, undefined, 2));
})