var jwt = require('jwt-simple');
var moment = require('moment');
var config = require("./database/config");
var auth = new(require("./database/auth"));
var chatDb = new(require("./database/chat"));

var chat = {
    init: function init(server) {
        var WebSocketServer = require("ws").Server;
        var webSocketServer = new WebSocketServer({
            server: server
        });

        // connected users
        var clients = {};

        var response = {
            data: '',
            error: false,
            errorMessage: ''
        };

        webSocketServer.on('connection', function(socket) {
            var id = Math.random();
            clients[id] = socket;

            chatDb.getHistory().then(function(data, res) {
                response.data = data;
                clients[id].send(JSON.stringify(response));
            }).catch(function(error) {
                response.error = true;
                response.errorMessage = error;
            });

            socket.on('message', function(obj) {
                // if token can be decoded and isn't expired
                var requestObj = isAuth(obj);

                if (!requestObj.error) {
                    // console.log(requestObj.data);
                    chatDb.addMessage(requestObj.data).then(function() {
                        for (var key in clients) {
                            clients[id].send(JSON.stringify(requestObj));
                        }
                    }).catch(function(error) {
                        requestObj.error = true;
                        requestObj.errorMessage = error;
                        clients[id].send(JSON.stringify(requestObj));
                    });

                } else {
                    requestObj.error = true;
                    requestObj.errorMessage = 'Incorrect token. Try to login again';
                    clients[id].send(JSON.stringify(requestObj));
                }

            });

            socket.on('close', function() {
                delete clients[id];
            });
        });
    }
};

function isAuth(req) {

    var data = JSON.parse(req);

    var payload = null;

    var obj = {
        data: data,
        error: false,
        errorMessage: ''
    }

    var token = data.token;
    try {
        payload = jwt.decode(token, config.TOKEN_SECRET);
    } catch (err) {
        obj.errorMessage = err.message;
        obj.error = true;
        return obj;
    }

    if (payload.exp <= moment().unix()) {
        obj.errorMessage = 'Token has expired';
        obj.error = true;
        return obj;
    }
    obj.data.decodedId = payload.sub;
    return obj;

}
module.exports = chat;
