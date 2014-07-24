(function() {
    var nameCityStateFilter = function() {
        return function(customers, filterValue) {
            if (!filterValue) {
                return customers;
            }

            return customers;
        }
    };

    angular.module('customersApp').filter('nameCityStateFilter', nameCityStateFilter);
}());