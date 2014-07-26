(function () {
    var NavbarController = function($scope, $location, authService) {
        var appTitle = 'Customer Management';
        $scope.appTitle = appTitle;
        $scope.loginLogoutText = '';
        $scope.$on('redirectToLogin', function(loggedIn) {
            redirectToLogin();
        });

        function redirectToLogin() {
            var path = '/login' + $location.$$path;
            $location.replace();
            $location.path(path);
        }

        $scope.$on('loginStatusChanged', function(loggedIn) {
            setLoginLogoutText(loggedIn);
        });

        function setLoginLogoutText() {
            $scope.loginLogoutText = (authService.user.isAuthenticated) ? 'Logout' : 'Login';
        }
        $scope.loginOrOut = function() {
            setLoginLogoutText();
            var isAuthenticated = authService.user.isAuthenticated;
            if (isAuthenticated) {
                authService.logout().then(
                    function() {
                        $location.path('/');
                        return;
                    }
                );
            }
            redirectToLogin();
        }

        setLoginLogoutText();
    };

    NavbarController.$inject = ['$scope', '$location','authService'];

    angular.module('customersApp').controller('NavbarController', NavbarController);

}());