angular.module('webapp',['ui.router','ngAnimate','google.places'])
.controller('webctrl',function($scope,$state,$http,$rootScope){
//animation 
$scope.patientClass = '';
$scope.patientinfo='';
if($rootScope.patient)
{
  $scope.selectedpatient=$rootScope.patient;
}
else
{
 // $state.go('patientlist');
}

 $scope.go = function(path) {
   	$state.go(path);
 };


  $scope.goLogin=function (user) {
  	//alert();
  	console.log('login clicked');
  	//$state.go('patientlist');
 	if(user.email==='test@gmail.com' && user.pwd==='test')
 	{
 	$state.go('patientlist');
 	}
  else
  {
    $scope.errorlogin='Invalid Username and Password';
  }
 	// body...
 };
 

 $scope.loadPatient=function () {
 	$http({
        method : "GET",
        url : "http://ec2-52-87-238-75.compute-1.amazonaws.com/patients"
    }).then(function mySucces(response) {
        $scope.patientList = response.data;
        console.log($scope.patientList);
    }, function myError(response) {
    	console.log(response);
     });
 	 
 };


 $scope.loadDoctors=function () {
  $http({
        method : "GET",
        url : "http://ec2-52-87-238-75.compute-1.amazonaws.com/staffs"
    }).then(function mySucces(response) {
        $scope.doctorsList = response.data;
     }, function myError(response) {
      console.log(response);
     });
   
 };


  $scope.loadNruses=function () {
  $http({
        method : "GET",
        url : "http://ec2-52-87-238-75.compute-1.amazonaws.com/staffs"
    }).then(function mySucces(response) {
        $scope.nurseList = response.data;
     }, function myError(response) {
      console.log(response);
     });
   
 };
 

 

$scope.loadPatient();
$scope.loadDoctors();
  $scope.loadNruses();


  $scope.addPatient=function (patient) {
   // alert();
   $scope.patientinfo=patient;
var gender='';
   if(patient.gender==='male')
   {
    gender=true;
   }
   else
   {
    gender=false;
   }

   var address=patient.address;
 //  alert(address.address_components[0].long_name);
   console.log(patient.address);

   var patientschema={
    'firstName': patient.firstName,
      'lastName': patient.lastName,
    'birthday': patient.birthday,
    'gender': gender,
    'weight': patient.weight,
    'height': patient.height,
    'occupation': patient.occupation,
    'bloodType': patient.occupation,
    'maritalStatus': gender,
    'condition': patient.condition,
    'admissionDate': '2016-11-25',
    'room':patient.room,
    '__v': 0,
    'nurses': [],
    'doctors': [],
    'vitals': [],
    'prescriptions': [],
    'labTests': [],
    'drNotes': [],
    'allergies': [],
    'insurance': {
      'name': 'r',
      'expiryDate': '5'
    },
    'contact': {
      'phone': patient.contact.phone,
      'email': 'ddd',
      'emergencyContactName': patient.contact.emergencyContactName,
      'emergencyContactNumber': patient.contact.phone
    },
    'address': {
      'street': address.address_components[0].long_name + address.address_components[1].long_name,
      'city': address.address_components[4].long_name,
      'province': address.address_components[6].long_name,
      'zipCode': address.address_components[8].long_name
    }
  }
    console.log('<<<<'+patient)
   
   $http.post('http://shelalainechan.com/patients', patientschema).success(function(response) {
      console.log('<<<<<<<'+response);
      
      $state.go('assignstaff');

    }).error(function(response) {
       
    });

 };



 $scope.goaddPatient=function (data) {
  $http.post('http://ec2-52-87-238-75.compute-1.amazonaws.com/patients', data, config)
   .then(
       function(response){
        alert()
         // success callback
       }, 
       function(response){
         // failure callback
       }
    );
   
 };

$scope.goPatientDetails=function(patient){
//animation 
//$scope.patientClass = 'patient-home';
  $rootScope.patient=patient;
   $scope.selectedpatient=$rootScope.patient;
  if($rootScope.patient)
  {
      $state.go('patientdetails');
  }

 };

$scope.goAddPatient=function(add){
//alert();
  $state.go('addpatient');
};
$scope.assigndoc=function (patient) {
  console.log('>>'+patient);
  $scope.selectedid='';
  if(patient.doctor==='Peter John')
  {
    $scope.selectedid==='5838e28640fae4396cc3c949';
  }
  else if(patient.doctor==='Jane Doe')
  {
    $scope.selectedid==='5838e2d540fae4396cc3c94d';
  }
  else if(patient.doctor==='Salman Khan')
  {
    $scope.selectedid==='5838f987ef50924a4db9a914';

  }
  
 

    var data={
    
    doctors: [{
    name:patient.doctor
    }]
  };
 
  // $http.put(path,data).success(function(stuff){
  //     document.location.reload(true);
  //   });

   

   $http.put('http://shelalainechan.com/patients/582e18c8085b320be8578cb6',
   data)
        .success(function(data) {
            $scope.todoData = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

};
 
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
});
   $scope.names = ["John ", "bill", "charlie", "robert", "alban", "oscar", "marie", "celine", "brad", "drew", "rebecca", "michel", "francis", "jean", "paul", "pierre", "nicolas", "alfred", "gerard", "louis", "albert", "edouard", "benoit", "guillaume", "nicolas", "joseph"];


}).factory('autoCompleteDataService', [function() {
return {
    getSource: function() {

      //$scope.test='test';
        //this is where you'd set up your source... could be an external source, I suppose. 'something.php'
        return ['Peter John', 'Jane Doe', 'Salman Khan'];
    }
}
}]).directive('autoComplete', function(autoCompleteDataService) {
return {
    restrict: 'Aa',
    link: function(scope, elem, attr, ctrl) {
                // elem is attr jquery lite object if jquery is not present,
                // but with jquery and jquery ui, it will be a full jquery object.
        debugger
        elem.autocomplete({
            source: autoCompleteDataService.getSource(), //from your service
            minLength: 1
        });
    }
};
});






