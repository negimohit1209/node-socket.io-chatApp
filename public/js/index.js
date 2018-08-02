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
    var li = jQuery('<li></li>');
    li.text(`${message.from}:  ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    var li = jQuery('<li></li>'); 
    var a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
})

jQuery("#message-form").on('submit', function(e){
    e.preventDefault();
    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'user',
        text: messageTextbox.val()
    }, function(){
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    if (!navigator.geolocation){
        return alert('Golocation Not supported by your browser');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...')
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

    }, function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
})