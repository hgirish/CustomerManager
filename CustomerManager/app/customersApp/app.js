(function () {
    var app = angular.module('customersApp', ['ngRoute','ui.bootstrap']);

    app.config(['$routeProvider', function($routeProvider) {
        var viewBase = '/app/customersApp/views/';

        $routeProvider
            .when('/customers', {
                    controller: 'CustomersController',
                    templateUrl: viewBase + 'customers/customers.html'
            })
            .when('/customerorders/:customerId', {
                controller: 'CustomerOrdersController',
                templateUrl: viewBase+ 'customers/customerOrders.html'
            })
            .when('/customeredit/:customerId', {
                controller: 'CustomerEditController',
                templateUrl: viewBase + 'customers/customerEdit.html',
                secure: true
            })
            .when('/orders', {
                controller: 'OrdersController',
                templateUrl: viewBase + 'orders/orders.html'
            })
            .when('/about', {
                controller: 'AboutController',
                templateUrl: viewBase + 'about.html'
            })
            .when('/login/:redirect*?', {
                controller: 'LoginController',
                templateUrl: viewBase + 'login.html'
            })
                .otherwise({ redirectTo: '/customers' });
        }
    ]);

    app.run(['$rootScope', 'authService',
        function ($rootScope, authService) {
            $rootScope.$on('$routeChangeStart', function(event, next, current) {
                if (next && next.$$route && next.$$route.secure) {
                    if (!authService.user.isAuthenticated) {
                        authService.redirectToLogin();
                    }
                }
            });

        }]);
}());
