;
(function() {
    angular.module("em.chat").controller("em.chat.chatController", chatController);

    function chatController($scope, chatService) {

        $scope.msgSend = function() {
            chatService.msgSend($scope.msg);
            $scope.msg ='';
        };
        // history
        $scope.history = chatService.history;
        // new messages
        $scope.live = chatService.live;
    }

    chatController.$inject = ["$scope", "em.chat.chatService"];

})();
