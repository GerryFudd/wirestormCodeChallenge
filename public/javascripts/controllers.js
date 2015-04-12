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
    $http.post('/api/addComment',
      {comment: self.comment, ind: self.products.indexOf(product)}).
    success(function (data, staus, headers, config) {
      console.log('added comment: ' + data);
    }).
    error(function(data, status, headers, config){
      console.log(data);
    });
    self.comment = '';
    delete product.showForm;
    initiatePage();
  }

  // makes a comment form appear below a product
  this.makeItShow = function (product) {
    product.showForm = true;
  }

  // retrieve the list of products from the database
  function initiatePage () {
    $http.get('/api/').
      success(getList).
      error(function(data, status, headers, config){
      });
  }
  function getList (data) {
    self.products = data.products;
  }

  initiatePage();
}]);