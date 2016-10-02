
(function() {
    angular.module("em.chat").controller("em.chat.chatController", chatController);

    function chatController($scope, chatService) {

        $scope.msgSend = function() {
            var msg = document.forms.publish.message.value;
            if (msg !== ''){
              chatService.msgSend(msg);
              document.forms.publish.message.value = '';
              var objDiv = document.querySelector('.chat-body');
              objDiv.scrollTop = objDiv.scrollHeight;

              console.log(objDiv.scrollTop);
              console.log(objDiv.scrollHeight);

            } else {
              alert('Enter something!');
            }


        };
        // history
        $scope.history = chatService.history;
        // new messages
        $scope.live = chatService.live;
    }

    chatController.$inject = ["$scope", "em.chat.chatService"];

})();
