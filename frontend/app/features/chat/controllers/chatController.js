(function() {
    angular.module("em.chat").controller("em.chat.chatController", chatController);

    function chatController($scope, chatService) {
        // chatService
        $scope.msgSend = function() {
            var msg = document.forms.publish.message.value;
            chatService.send(msg);
        }
        $scope.message = chatService.get();
        console.log($scope.message);

    }

    chatController.$inject = ["$scope", "em.chat.chatService"]

})();
