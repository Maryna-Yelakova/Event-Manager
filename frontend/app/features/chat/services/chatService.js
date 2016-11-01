(function() {
    angular.module("em.chat").service("em.chat.chatService", ["$rootScope", "flashService", chatService]);

    function chatService($rootScope, flashService) {

        var host = location.origin.replace(/^http/, 'ws');
        var socket = new WebSocket(host);

        var initialization = {
            token: localStorage.getItem("satellizer_token"),
            getHistory: true,
            index: $rootScope.chatIndex //index defined first time on server
        }

        socket.onopen = function(obj) {
            socket.send(JSON.stringify(initialization));
        };

        var self = this;
        self.history = [];
        self.live = [];
        self.error = false;

        socket.onmessage = function(obj) {
            var response = JSON.parse(obj.data);

            if (!response.error) {
                $rootScope.chatIndex = response.index;
                angular.forEach(response.data, function(value, key) {
                    response.data[key].date = response.data[key].date.substring(11, 19);
                });
                // $rootScope.$apply(function() {
                //     self.live.push(response.data[0]);
                // });
                // if single msg
                if (response.data.length == 1) {
                    $rootScope.$apply(function() {
                        // angular.extend(self.live, []);
                        self.live.push(response.data[0]);
                    });
                } else {
                    // console.log(self.live.length);
                    $rootScope.$apply(function() {
                        // angular.extend(self.live, []);
                        console.log(self.history);
                        angular.extend(self.history, response.data);
                    });
                }
            } else {
                $rootScope.$apply(function() {
                    self.error = true;
                    flashService.error(response.errorMessage, false);
                });
            }
        }
        self.msgSend = function(msg) {
            // self.live = [];
            if (socket.readyState == 1) {
                socket.send(JSON.stringify(msg));
            }
        }
        self.getHistory = function() {
            // self.live = [];
            initialization.index = $rootScope.chatIndex;
            initialization.getHistory = true;
            socket.send(JSON.stringify(initialization));
        }
    }
})();
