(function() {

    angular.module('em.login').controller('em.login.loginController', loginController);

    function loginController($scope, $location, authenticationService, flashService, userService, $auth, $rootScope) {

        $scope.login = function() {
            $scope.dataLoading = true;

            $auth.login($scope.user)
                .then(function(res) {
                    console.log('You have logged in');
                    userService.setUserInfo(res.data.user);  //write information about current logged user to userService
                    localStorage.setItem('userId', res.data.user.id);
                    localStorage.setItem('fullName', res.data.user.full_name);
                    $scope.id = localStorage.getItem('userId');
                    $location.path('/profile/' + $scope.id);
                    $scope.classHandler();
                    var getUserEventsPromise = userService.getUserEvents($scope.id);
                    getUserEventsPromise.then(function(res) {
                        angular.forEach(res.data, function(value, key) {
                            localStorage.setItem(value.event, value.event);
                        });
                    }, function(error) {
                        console.log('Error: ' + error);
                    });
                })
                .catch(function(error) {
                    flashService.error('Wrong email or password', false);
                    $scope.dataLoading = false;
                });


        };
        $scope.reset = function() {
            authenticationService.clearCredentials();
        };
        $scope.classHandler();
    }
})();
