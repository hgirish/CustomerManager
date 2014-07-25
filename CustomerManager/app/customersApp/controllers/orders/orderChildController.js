﻿(function() {
    var OrderChildController = function($scope) {

        $scope.orderby = 'product';
        $scope.reverse = false;
        $scope.ordersTotal = 0.00;

        $scope.setOrder = function(orderby) {
            if (orderby == $scope.orderby) {
                $scope.reverse = !$scope.reverse;
            }
            $scope.orderby = orderby;
        };
        var init = function() {
            if ($scope.customer && $scope.customer.orders) {
                var total = 0.00;
                for (var i = 0; i < $scope.customer.orders.length; i++) {
                    var order = $scope.customer.orders[i];
                    total += (order.price * order.quantity);
                }
                $scope.ordersTotal = total;
            }

        };

        init();


    };
    OrderChildController.$inject = ['$scope'];

    angular.module('customersApp').controller('OrderChildController', OrderChildController);
}());