(function() {
    var CustomersController = function ($scope,$filter,$timeout, dataService) {
       
        $scope.customers = [];
        $scope.filteredCustomers = [];
        $scope.filteredCount = 0;
        $scope.orderby = 'lastName';
        $scope.reverse = false;
        $scope.searchText = null;
        $scope.cardAnimationClass = 'card-animation';

        //paging
        $scope.totalRecords = 0;
        $scope.pageSize = 10;
        $scope.currentPage = 1;

        $scope.DisplayModeEnum = { Card: 0, List: 1 };
        $scope.changeDisplayMode = function(displayMode) {
            switch (displayMode) {
            case $scope.DisplayModeEnum.Card:
                $scope.listDisplayModeEnabled = false;
                break;
                case $scope.DisplayModeEnum.List:
                    $scope.listDisplayModeEnabled = true;
                    break;
            }
        }

        $scope.setOrder = function(orderby) {
            if (orderby === $scope.orderby) {
                $scope.reverse = !$scope.reverse;
            }
            $scope.orderby = orderby;
        }
        $scope.searchTextChanged = function() {
            filterCustomers($scope.searchText);
        };
        function init() {
            getCustomersSummary();
        }
        var getCustomersSummary = function() {
            dataService.getCustomersSummary($scope.currentPage - 1, $scope.pageSize)
                .then(function(data) {
                    $scope.totalRecords = data.totalRecords;
                    $scope.customers = data.result;
                    filterCustomers('');
                    $timeout(function() {
                        $scope.cardAnimationClass = '';
                    }, 1000);
                }, function(error) {
                    $window.alert('Sorry, an error occured: ' + error.data.message);
                });
        };

        var filterCustomers = function (filterText) {
            $scope.filteredCustomers = $filter('nameCityStateFilter')($scope.customers, filterText);
            $scope.filteredCount = $scope.filteredCustomers.length;

        };

        init();
    };

    CustomersController.$inject = ['$scope','$filter','$timeout', 'dataService'];

    angular.module('customersApp').controller('CustomersController', CustomersController);
}());