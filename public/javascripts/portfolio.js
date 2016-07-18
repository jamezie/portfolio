var portfolioApp = angular.module('portfolioApp', ['ngRoute']);

portfolioApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'home.html',
			controller: 'HomeCtrl'
		})
		.when('/login', {
			templateUrl: 'login.html',
			controller: 'AuthenticateCtrl'
		})
		.when('/signup', {
			templateUrl: 'signup.html',
			controller: 'AuthenticateCtrl'
		});
});

portfolioApp.controller('BodyCtrl', function ($scope) {
	$scope.title = "James Portfolio";
	return $scope;
});

portfolioApp.controller('AuthenticateCtrl', function($scope) {
	$scope.error_message="";
	return $scope;
});

portfolioApp.controller('HomeCtrl', function($scope) {
	return $scope;
});