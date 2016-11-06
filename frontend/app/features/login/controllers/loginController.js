(function() {

    angular.module('em.login').controller('em.login.loginController', loginController);

    function loginController($scope, $location, flashService, userService, $auth) {

        $scope.login = function() {
            $scope.dataLoading = true;

            $auth.login($scope.user)
                .then(function(res) {
                    console.log(res.data.user);
                    userService.setUserInfo(res.data.user); //write information about current logged user to userService
                    $scope.currentUser = userService.getUserInfo();
                    $location.path('/me');
                    //$scope.classHandler();
                    var getUserEventsPromise = userService.getUserEvents($scope.currentUser.id);
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
        $scope.authenticate = function(provider) {
            $auth.authenticate(provider)
                .then(function() {
                    flashService.success('You have successfully signed in with ' + provider + '!', true);
                    $location.path('/me');
                //    $scope.classHandler();
                })
                .catch(function(error) {
                    if (error.message) {
                        // Satellizer promise reject error.
                        flashService.error('Satellizer promise reject error', false);
                    } else if (error.data) {
                        // HTTP response error from server
                        flashService.error('HTTP response error from server', false);
                    } else {
                        flashService.error('Error');
                    }
                });
        };
  //      $scope.classHandler();
    }
    loginController.$inject = ["$scope", "$location", "flashService", "userService", "$auth"];
})();
