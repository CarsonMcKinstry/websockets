

$(document).ready(function() {
    var user_id = 1234;
    var current_data = {};


    var socket = io("http://localhost:5627");

    socket.on('connected', function(connected) {
        if (connected) {
            socket.emit("user", {
                user_id: user_id,
                client: "sender"
            });
            socket.emit("sender", {
                user_id: user_id,
                message: "Nothing yet"
            })
        }
    })

    let buttons = document.querySelectorAll("button");
    buttons.forEach( button => {
        button.addEventListener('click', handleClick);
    });


    function handleClick() {
        let id = this.getAttribute("id");
        let message = `The sender clicked ${id}`;
        socket.emit("sender", {
            user_id: user_id,
            message: message
        })
    }
});
