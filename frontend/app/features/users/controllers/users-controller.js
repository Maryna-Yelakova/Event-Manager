(function() {
    angular.module("em.users").controller("em.users.users-controller", usersController);

    function usersController($scope, usersService) {
        $scope.users = usersService.getUser();
    }
    usersController.$inject = ["$scope", "em.users.users-service"];
})();