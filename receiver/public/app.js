$(document).ready(function() {
    var user_id = 1234;
    var current_data = {};


    var socket = io("http://localhost:5627");

    socket.on('connected', function(connected) {
        if (connected) {
            socket.emit("user", {
                user_id: user_id,
                client: "receiver"
            });
        }
    });

    socket.on('sent data', function(message) {
        console.log(message);
        document.querySelector('#currentInfo').innerHTML = message;
    })
});
