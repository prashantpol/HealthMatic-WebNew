angular.module('webapp',['ui.router','ngAnimate'])
.controller('webctrl',function($scope,$state,$http,$rootScope){
//animation 
$scope.patientClass = '';
if($rootScope.patient)
{
  $scope.selectedpatient=$rootScope.patient;
}
else
{
  $state.go('patientlist');
}

 $scope.go = function(path) {
   	$state.go(path);
 };


  $scope.goLogin=function (user) {
  	//alert();
  	console.log('login clicked');
  	$state.go('patientlist');
 	if(user.email==='test@gmail.com' && user.pwd==='test')
 	{
 	$state.go('patientlist');
 	}
 	// body...
 };
 

 $scope.loadPatient=function () {
 	$http({
        method : "GET",
        url : "http://ec2-52-87-238-75.compute-1.amazonaws.com/patients"
    }).then(function mySucces(response) {
        $scope.patientList = response.data;
    }, function myError(response) {
    	console.log(response);
     });
 	 
 };
$scope.loadPatient();


$scope.goPatientDetails=function(patient){
//animation 
$scope.patientClass = 'patient-home';
  $rootScope.patient=patient;
   $scope.selectedpatient=$rootScope.patient;
  if($rootScope.patient)
  {
      $state.go('patientdetails');
  }

 };





});
