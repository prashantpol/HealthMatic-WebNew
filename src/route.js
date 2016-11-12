
angular.module('webapp')
 .config(['$stateProvider', '$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('home',{
		url:'/',
		templateUrl:'/client/home.html'

	})
	.state('about',{
		url:'/about',
		templateUrl:'/client/index2.html'

	});

}]);