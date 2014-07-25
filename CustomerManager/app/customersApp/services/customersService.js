(function() {
    var customersFactory = function($http, $q) {
        var serviceBase = '/api/dataservice/',
            factory = {};

        factory.getCustomers = function(pageIndex, pageSize) {
            return getPagedResource('customers', pageIndex, pageSize);
        };
        factory.getCustomersSummary = function(pageIndex, pageSize) {
            return getPagedResource('customersSummary', pageIndex, pageSize);
        }
        factory.getCustomer = function(id) {
            return $http.get(serviceBase + 'customerById/' + id)
                .then(function(status) {
                    return status.data;
                });
        }
        function getPagedResource(baseResource, pageIndex, pageSize) {
            var resource = baseResource;
            resource += (arguments.length == 3) ? buildPagingUri(pageIndex, pageSize) : '';
            return $http.get(serviceBase + resource).then(function(response) {
                var custs = response.data;
                extendCustomers(custs);
                return{
                    totalRecords: parseInt(response.headers('X-InlineCount')),
                    result: custs
                };
            });
        }

        function buildPagingUri(pageIndex, pageSize) {
            var uri = '?$top=' + pageSize + '&$skip=' + (pageIndex * pageSize);
            return uri;
        }

        function extendCustomers(customers) {
            var custsLen = customers.length;
            for (var i = 0; i < custsLen; i++) {
                var cust = customers[i];
                if (!cust.orders) {
                    continue;
                }

                var ordersLen = cust.orders.length;
                for (var j = 0; j < ordersLen; j++) {
                    var order = cust.orders[j];
                    order.orderTotal = order.quantity * order.price;
                }
                cust.ordersTotal = ordersTotal(cust);
            }
        }

        function ordersTotal(customer) {
            var total = 0;
            var orders = customer.orders;
            var count = orders.length;

            for (var i = 0; i < count; i++) {
                total += orders[i].orderTotal;
            }
            return total;
        }

        return factory;
    };

    customersFactory.$inject = ['$http', '$q'];

    angular.module('customersApp').factory('customersService', customersFactory);
}());