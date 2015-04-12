var catalogueApp = angular.module('catalogueApp', []);

catalogueApp.controller('CatalogueCtrl',
  ['$http', function($http) {
  
  // some data to be collected from the add product form
  this.productName = '';
  this.productCost = '';
  this.productDescription = '';

  // a datum to be collected from the add comment form
  this.comment = '';

  // self will act as the $scope throughout this controller
  var self = this;

  this.showForm = function () {
    self.showProductForm = true;
  }

  this.hideForm = function () {
    delete self.showProductForm;
  }

  // Controlls the addition of a new comment to a product
  this.addProduct = function (product) {
    $http.post('/api/addProduct',
      {
        productName: self.productName,
        productCost: self.productCost,
        productDescription: self.productDescription
      }).
    success(function (data, staus, headers, config) {
      console.log('added product: ' + data);
      self.comment = '';
      delete self.showProductForm;
      initiatePage();
    }).
    error(function(data, status, headers, config){
      console.log(data);
    });
  }

  // Controlls the addition of a new comment to a product
  this.addComment = function (product) {
    var productNumber = self.products.indexOf(product);
    $http.post('/api/addComment',
      {"comment": self.comment, "product": product}).
    success(function (data, staus, headers, config) {
      console.log(data);
      self.comment = '';
      initiatePage(productNumber);
    }).
    error(function(data, status, headers, config){
      console.log(data);
    });
  }

  // makes a comment form appear below a product
  this.showDetail = function (product) {
    product.showDetail = true;
    self.singleView = true;
  }

  this.showFull = function (product) {
    delete product.showDetail;
    delete self.singleView;
  }

  // retrieve the list of products from the database
  function initiatePage (number) {
    $http.get('/api/').
      success(function (data, status, headers, config) {
        getList(data);
        if (typeof(number) === 'number') {
          console.log(number);
          self.products[number].showDetail = true;
        }
      }).
      error(function(data, status, headers, config){
        console.log(data);
      });
  }
  function getList (data) {
    self.products = data.products;
  }

  initiatePage();
}]);