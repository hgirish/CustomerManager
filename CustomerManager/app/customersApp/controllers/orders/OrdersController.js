(function() {
    var OrdersController = function($scope,$window,$filter, dataService) {
        $scope.customers = [];
        $scope.filteredCustomers=[];
        $scope.filteredCount = 0;

        $scope.totalRecords = 0;
        $scope.pageSize = 10;
        $scope.currentPage = 1;

      

        $scope.searchTextChanged = function () {
            filterCustomersProducts($scope.searchText);
        };

        function filterCustomersProducts(filterText) {
            $scope.filteredCustomers = $filter("nameProductFilter")($scope.customers, filterText);
            $scope.filteredCount = $scope.filteredCustomers.length;
        }
        init();

        function init() {
            getCustomers();
        }
        function getCustomers() {
            dataService.getCustomers($scope.currentPage - 1, $scope.pageSize)
            .then(function(data) {
                $scope.totalRecords = data.totalRecords;
                $scope.customers = data.result;
                filterCustomersProducts('');
            }, function(error) {
                $window.alert(error.message);
            })
        }
    };

    OrdersController.$inject = ['$scope','$window','$filter', 'dataService'];

    angular.module('customersApp').controller('OrdersController', OrdersController);
}());
