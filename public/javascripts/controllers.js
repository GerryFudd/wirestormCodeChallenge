var catalogueApp = angular.module('catalogueApp', []);

catalogueApp.controller('CatalogueCtrl', [ '$http', function($http) {
  this.products = [
    {'name': 'Product 1',
     'description': 'This is the first product',
     'comments': []
    },
    {'name': 'Product 2',
     'description': 'This is the second product',
     'comments': []
    },
    {'name': 'Product 3',
     'description': 'This is the third product',
     'comments': []
    }
  ];

  this.comment = '';

  var self = this;

  this.addComment = function (list) {
    list.push(self.comment);
    self.comment = '';
  }
}]);