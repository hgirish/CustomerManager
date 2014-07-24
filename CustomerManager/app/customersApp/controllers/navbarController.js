(function () {
    var NavbarController = function($scope) {
        var appTitle = 'Customer Management';
        $scope.appTitle = appTitle;
    };

    NavbarController.$inject = ['$scope'];

    angular.module('customersApp').controller('NavbarController', NavbarController);

}());