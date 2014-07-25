(function () {
    var CustomerOrdersController = function ($scope, $routeParams, $window, dataService) {
        var customerId = ($routeParams.customerId) ? parseInt($routeParams.customerId) : 0;

        $scope.customer = {};
        $scope.ordersTotal = 0.00;

        init();

        function init() {
            if (customerId > 0) {
                dataService.getCustomer(customerId)
                .then(function(customer) {
                    $scope.customer = customer;
                }, function(error) {
                    $window.alert("Sorry, an error occureed: " + error.message);
                });
            }
        }
    };
    CustomerOrdersController.$inject = ['$scope','$routeParams', '$window','dataService' ];

    angular.module('customersApp').controller('CustomerOrdersController', CustomerOrdersController);
}());