(function() {
    angular.module("em.profile").service("em.profile.profile-service", profileService);

    function profileService($routeParams, users) {
        // $scope.path = $routeParams.userID;

        // this.getEventsByUserId = function() {
        //     return events;
        // }
        // this.updateEventSubscribe = function($scope, state) {
        //         angular.forEach(users, function(users, path) {
        //             if (users.id == $scope.path) {
        //                 users.isSubscribe = state;
        //             }
        //         });
        //     }
        // get current user from db
        this.getUserData = function() {
            var index;
            angular.forEach(users, function(value, key) {

                if (value.id == $routeParams.userID) {
                    index = key;
                }

            });
            return users[index];

        }
    }
    profileService.$inject = ["$routeParams", "em.db.users"]
})();
