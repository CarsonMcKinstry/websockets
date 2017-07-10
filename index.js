var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var cors = require('cors');

var port = 5627;

app.use(cors)

currentUsers = [];

io.on("connection", function(socket) {
    io.to(socket.id).emit("connected", true);
    socket.on("user", function(user) {
        var user_index = currentUsers.findIndex(function(currentUser) {
            return user.user_id = currentUser.user_id;
        });

            if (user_index == -1) {
                var newUser = {
                    user_id: user.user_id,
                    senderSocket: undefined,
                    receiverSocket: undefined
                };
                if (user.client == "sender") {
                    newUser.senderSocket = socket.id;
                }
                if (user.client == "receiver") {
                    newUser.receiverSocket = socket.id;
                }
                currentUsers.push(newUser);
            } else {
                var currentUser = currentUsers[user_index];
                console.log(user);
                if (user.client == "sender") {
                    currentUser.senderSocket = socket.id
                }
                if (user.client == "receiver") {
                    currentUser.receiverSocket = socket.id
                }
            }

            console.log(currentUsers);
    });

    socket.on("sender", function(data) {
        var currentUser = currentUsers.find(function(user) {
            return user.user_id === data.user_id;
        });
        io.to(currentUser.receiverSocket).emit('sent data', data.message);
    })
})

http.listen(port, function() {
    console.log(`Websocket listening on ${port}`)
})
