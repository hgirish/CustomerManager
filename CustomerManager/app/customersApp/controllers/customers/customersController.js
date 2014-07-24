(function() {
    var CustomersController = function ($scope) {


       

        function init() {
            getCustomersSummary();
        }
        var getCustomersSummary = function() {
            
        };

        init();
    };

    CustomersController.$inject = ['$scope'];

    angular.module('customersApp').controller('CustomersController', CustomersController);
}());