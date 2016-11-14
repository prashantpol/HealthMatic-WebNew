
angular.module('webapp')
 .config(['$stateProvider', '$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('login',{
		url:'/',
		templateUrl:'/client/login.html'

	}).state('patientlist',{
		url:'/patientlist',
		templateUrl:'/client/patientlist.html'

	})
	.state('about',{
		url:'/about',
		templateUrl:'/client/index2.html'

	}).state('patientdetails',{
		url:'/patientdetails',
		templateUrl:'/client/patientdetails.html'

	});

}]);