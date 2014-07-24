(function () {
    var app = angular.module('customersApp', ['ngRoute']);

    app.config(['$routeProvider', function($routeProvider) {
        var viewBase = '/app/customersApp/views/';

        $routeProvider
            .when('/customers', {
                    controller: 'CustomersController',
                    templateUrl: viewBase + 'customers/customers.html'
                })
                .otherwise({ redirectTo: '/customers' });
        }
    ])
}());
