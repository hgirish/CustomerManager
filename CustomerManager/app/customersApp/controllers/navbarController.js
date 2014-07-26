(function () {
    var NavbarController = function($scope, $location) {
        var appTitle = 'Customer Management';
        $scope.appTitle = appTitle;

        $scope.$on('redirectToLogin', function(loggedIn) {
            redirectToLogin();
        });

        function redirectToLogin() {
            var path = '/login' + $location.$$path;
            $location.replace();
            $location.path(path);
        }
    };

    NavbarController.$inject = ['$scope', '$location'];

    angular.module('customersApp').controller('NavbarController', NavbarController);

}());