var catalogueApp = angular.module('catalogueApp', []);

catalogueApp.controller('CatalogueCtrl', [ '$http', function($http) {
  this.products = [
    {'name': 'Product 1',
     'description': 'This is the first product'},
    {'name': 'Product 2',
     'description': 'This is the second product'},
    {'name': 'Product 3',
     'description': 'This is the third product'}
  ];
}]);