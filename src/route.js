
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

	}).state('addpatient',{
		url:'/addpatient',
		templateUrl:'/client/addpatient.html'

	}).state('doctorlist',{
		url:'/doctorlist',
		templateUrl:'/client/doctorlist.html'

	}).state('nurselist',{
		url:'/nurselist',
		templateUrl:'/client/nurselist.html'

	}).state('patient',{
		url:'/patient',
		templateUrl:'/client/patient.html'

	}).state('assignstaff',{
		url:'/assignstaff',
		templateUrl:'/client/assignstaff.html'

	});

}]);