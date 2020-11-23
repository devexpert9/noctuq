var fs = require( 'fs' );
let app = require('express')();
var https = require('https');

var server = https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt'),
    requestCert: false,
    rejectUnauthorized: false
},app);

server.listen(3001);
var io = require('socket.io').listen(server);

io.sockets.on('socket',function (socket) {
    socket.on('send_message', function(msg){
        socket.emit('rec_message', msg);
     });

     socket.on('send_message_a', function(msg){
             console.log('msg')
             console.log(msg)
        socket.emit('rec_message_a', msg);
     });     

     socket.on('deactivate_user', function(msg){
             console.log(msg)
        socket.emit('rec_deactivate_user', msg);
      });    
      
      socket.on('send_notification', function(msg){
             console.log(msg)
       socket.emit('rec_notification', msg);
     });
});

app.get("/", function(request, response){
    console.log('Socket working ....')
})