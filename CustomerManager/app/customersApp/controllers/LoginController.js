(function() {
    var LoginController = function($scope, $routeParams,$location, authService) {
        var path = '/';
        $scope.email = null;
        $scope.password = null;
        $scope.errorMessage = null;
        $scope.isEmailValid = true;

        $scope.login = function() {
            authService.login($scope.email, $scope.password).then(
                function(status) {
                    if (!status) {
                        $scope.errorMessage = 'Unable to login';
                        return;
                    }

                    if (status && $routeParams && $routeParams.redirect) {
                        path = path + $routeParams.redirect;
                    }

                    $location.path(path);
                });
        };
    };

    LoginController.$inject = ['$scope', '$routeParams','$location', 'authService'];

    angular.module('customersApp').controller('LoginController', LoginController);
}());
