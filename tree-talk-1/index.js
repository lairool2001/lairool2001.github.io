var port = 80;
var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(port, function () {
    console.log(port + ' port listening.');
});
app.use(express.static('public'));
var output_all_data, tree;
var io = socket(server);
var clientz = [];
var refresh_new_client = false;

io.on('connection', function (socket) {
    console.log('Good! made socket connection', socket.id);
    clientz.push(socket);
    if (clientz.length >= 2) {
        clientz[0].emit('get_data');
        console.log('clientz[0].emit();');
    }
    socket.on('chat', function (data) {
        var linez = data.message.split('\n');
        for (var i = 0; i < linez.length; i++) {
            var line = linez[i];
            var send_data = JSON.parse(JSON.stringify(data));
            console.log(line);
            line = escape(line);
            send_data.message = line;
            send_data.id = send_data.id + "-" + i;
            console.log(send_data.message);
            io.sockets.emit('chat', send_data);
        }
    });
    //send_all_data
    socket.on('send_all_data', function (data) {
        output_all_data = data;

        for (var i = 0; i < clientz.length; i++) {
            clientz[i].emit('set_data', output_all_data);
        }

    });
    socket.on('disconnect', function () {
        console.log(socket.id + ' disconnect.');
        var index = clientz.indexOf(socket);
        clientz.splice(index, 1);
    });
});

function escape(s) {
    return s.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/'/g, "&#39;")
        .replace(/"/g, "&quot;");
}
