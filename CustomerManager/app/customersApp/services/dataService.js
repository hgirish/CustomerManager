(function() {
    var dataService = function( customersService) {
        return customersService;
    };
    dataService.$inject = [ 'customersService'];

    angular.module('customersApp').factory('dataService', dataService);
}());