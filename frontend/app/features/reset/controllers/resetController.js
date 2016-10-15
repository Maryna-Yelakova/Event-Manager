(function() {

    angular.module('em.reset').controller('em.reset.resetController', resetController);
    resetController.$inject = ['$scope', 'userService', '$location', '$rootScope', 'flashService'];

    function resetController($scope, userService, $location, $rootScope, flashService) {
      console.log('resetCTRL');
      $scope.range = '.{6,16}';
      $scope.user = {};
      $scope.checkPass = function() {
          if ($scope.resetForm.password.$invalid) {
              flashService.error('The password must be between 6 and 16 characters long', false);
          } else {
              flashService.clearFlashMessage();
          }
      };
      $scope.confirmPass = function() {
          if ($scope.user.password === $scope.user.confirmPassword) {
              flashService.success('Great!', false);
          } else {
              flashService.error('The passwords must match', false);
          }
      };
      $scope.resetForm = function() {
          $scope.dataLoading = true;
          userService.create($scope.user);
      };
    }
})();
