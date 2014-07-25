(function() {
    var CustomerEditController = function($scope, $routeParams,$timeout, dataService) {
        var customerId = ($routeParams.customerId) ? parseInt($routeParams.customerId) : 0,
            timer,
            onRouteChangeOff;
        
        $scope.customer = {};
        $scope.states = [];
        $scope.title = (customerId > 0) ? 'Edit' : 'Add';
        $scope.buttonText = (customerId > 0) ? 'Update' : 'Add';
        $scope.updateStatus = false;
        $scope.errorMessage = '';

        init();

        $scope.saveCustomer = function() {
            if ($scope.editForm.$valid) {
                if (!$scope.customer.id) {
                    dataService.insertCustomer($scope.customer)
                        .then(processSuccess, processError);
                } else {
                    dataService.updateCustomer($scope.customer)
                        .then(processSuccess, processError);
                }
            }
        }

        function init() {
            if (customerId > 0) {
                dataService.getCustomer(customerId)
                    .then(function(customer) {
                        $scope.customer = customer;
                    }, processError);
            } else {
                dataService.newCustomer()
                    .then(function(customer) {
                        $scope.customer = customer;
                    });
            }
            getStates();
        }

        function getStates() {
            dataService.getStates()
                .then(function(states) {
                    $scope.states = states;
                }, processError);
        }

        var processError = function(error) {
            $scope.errorMessage = error.message;
            startTimer();
        };
        var processSuccess = function() {
            $scope.editForm.$dirty = false;
            $scope.updateStatus = true;
            $scope.title = 'Edit';
            $scope.buttonText = 'Update';
            startTimer();
        }
        var startTimer = function() {
            timer = $timeout(function() {
                $timeout.cancel(timer);
                $scope.errorMessage = '';
                $scope.updateStatus = false;
            }, 10000);
        };
    };

    CustomerEditController.$inject = ['$scope', '$routeParams','$timeout', 'dataService'];

    angular.module('customersApp').controller('CustomerEditController', CustomerEditController);
}());

