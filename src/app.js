  angular.module('webapp',['ui.router','ngAnimate','google.places','ngCookies'])
  .controller('webctrl',function($scope,$state,$http,$rootScope,$window,$cookieStore ){
  //animation 
  $scope.patientClass = '';
  $scope.patientinfo='';
  $scope.show=true;
$scope.postsuccess=false;
    $scope.currState = $state;
    //alert($window.sessionStorage.pat);
  if($window.sessionStorage.pat)
  {
  $scope.selectedpatient=$rootScope.patient;
  }
  else
  {
  // $state.go('patientlist');
  }

  $scope.go = function(path) {
  //  alert();
  $state.go(path);
  };
  //$window.sessionStorage.isLogin=false;
 // alert($scope.currState.name);
   
  
  //alert($state.current.name);

  var mobileView = 500;

$scope.getColor=function (patient) {
  if(patient.condition==='Critical')
  {
    return 'changered';
  }

};
  $scope.getWidth = function() {
  return window.innerWidth;
  };
  $scope.view='web';

  $scope.$watch($scope.getWidth, function(newValue, oldValue) {
  console.log(newValue,oldValue);
  if(!newValue)
    {return;

    }

    if (newValue >= mobileView) {
      $scope.view='web'
        //alert();

      } else {
        //alert();
        $scope.view='mobile'
      }
     // alert($scope.view);
   });
  $scope.moveBack = function() {
     // alert();
     window.history.back();
   };

   $scope.goLogin=function (user) {
  	//alert();
  	console.log(user);
    if(!user)

    { 
     $scope.errorlogin='Please enter username and password';


   }
   else
   {
    if(user.email==='admin' && user.pwd==='admin')
    {
 
      $state.go('patientlist');
    }
    else if(user.email==='doctor' && user.pwd==='doctor')
    {
      $state.go('patientlist');
    }
    else if(user.email==='nurse' && user.pwd==='nurse')
    {
 
      $state.go('patientlist');
    }
    else
    {
      $scope.errorlogin='Invalid Username and Password';
    }


  }
  	//$state.go('patientlist');

  	// body...
  };

  if($state.current.name==='login')
  {
  // alert();
  $scope.show=false;
  }
  $scope.loadPatient=function () {
  $http({
    method : "GET",
    url : "http://ec2-52-87-238-75.compute-1.amazonaws.com/patients"
  }).then(function mySucces(response) {
    $scope.patientList = response.data;

       // console.log($scope.patientList);
     }, function myError(response) {
       console.log(response);
     });

  };
  // if(!$scope.patientList)
  // {
  // $scope.loadPatient();
  // }
  //$scope.show=$state.current.name;

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

  // $http({
  //     method : "GET",
  //     url : "http://ec2-52-87-238-75.compute-1.amazonaws.com/login"
  //   }).then(function mySucces(response) {
  //         console.log(response);

  //    }, function myError(response) {
  //     console.log( );
  //   });


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
            'bloodType': patient.bloodType,
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

            // $http.post('http://shelalainechan.com/patients', patientschema).success(function(response) {
            // console.log('<<<<<<<'+response);

            // $scope.postsuccess=true;
            // $state.go('patientdetails');

            // }).error(function(response) {

            // });

 
            // Simple GET request example:
            $http({
              method: 'POST',
              url: 'http://shelalainechan.com/patients',
              data:patientschema
            }).then(function successCallback(response) {
              console.log('Success >> '+response)
                                 $scope.loadPatient();

              $scope.postsuccess=true;
             $state.go('patientlist');
               console.log($scope.postsuccess);
            $scope.currState = 'patientlist';
                // this callback will be called asynchronously
                // when the response is available
              }, function errorCallback(response) {
               console.log('ERROR >> '+response)
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              });
              // $http.post('http://shelalainechan.com/patients', patientschema).success(function(data, status) {
              //         $scope.postsuccess=true;
              //         $state.go('patientdetails');
              //     });

              //     $http.post('http://shelalainechan.com/patients', patientschema, config).then(successCallback, errorCallback);
            

   };



  $scope.goAddMedcine=function(data)
  {
  //alert();


  // $http({
  //   method : "GET",
  //   url : "http://ec2-52-87-238-75.compute-1.amazonaws.com/patients/"+data._id
  // }).then(function mySucces(response) {
  //   $scope.patientList = response.data;
  //      // console.log($scope.patientList);
  //    }, function myError(response) {
  //     console.log(response);
  //   });
  // console.log(data);

  $scope.patientList.prescriptions=[];
  $scope.patientList.prescriptions=data.prescriptions

  $scope.patientList.prescriptions.push({
   'prescribedByName': data.firstName,
   'duration': data.prescriptions.duration,
   'frequency': '1',
   'dosage': data.prescriptions.dosage,
   'medicineName': data.prescriptions.medicinename,
   'date':  new Date()

  });


          // $http({
          //     method: 'POST',
          //     url: 'http://shelalainechan.com/patients',
          //     data:patientschema
          //   }).then(function successCallback(response) {
          //     console.log('Success >> '+response)
          //                        $scope.loadPatient();

          //     $scope.postsuccess=true;
          //    $state.go('patientlist');
          //      console.log($scope.postsuccess);
          //   $scope.currState = 'patientlist';
          //       // this callback will be called asynchronously
          //       // when the response is available
          //     }, function errorCallback(response) {
          //      console.log('ERROR >> '+response)
          //       // called asynchronously if an error occurs
          //       // or server returns response with an error status.
          //     });


  $http.put('http://shelalainechan.com/patients/' + data._id,{
    prescriptions:$scope.patientList.prescriptions
  }).then(function successCallback(response) {
   // $scope.patientList=response.data;
 //  $scope.loadPatient();
      $scope.patient=response.data;
      $scope.patientList=response.data;
    //console.log(response);

  });


  };

  $scope.goAddNotes=function(data)
  {
  //alert();


  // $http({
  //   method : "GET",
  //   url : "http://ec2-52-87-238-75.compute-1.amazonaws.com/patients/"+data._id
  // }).then(function mySucces(response) {
  //   $scope.patientList = response.data;
  //          // console.log($scope.patientList);
  //        }, function myError(response) {
  //         console.log(response);
  //       });
  // console.log(data);

  $scope.patientList.drNotes=[];
  $scope.patientList.drNotes=data.drNotes

  $scope.patientList.drNotes.push({
    'notes': data.drNotes.notes,
    'date': new Date()

  });


  $http.put('http://shelalainechan.com/patients/' + data._id,{
    drNotes:$scope.patientList.drNotes
  }).then(function successCallback (response) {
   // $scope.patientList=response.data;
      //$scope.loadPatient();

     $scope.patient=response.data;
           $scope.patientList=response.data;

        //console.log(response);
 
   });


  };

  $scope.goAddDoctor=function(data)
  {
  //alert();


  // $http({
  //   method : "GET",
  //   url : "http://ec2-52-87-238-75.compute-1.amazonaws.com/patients/"+data._id
  // }).then(function mySucces(response) {
  //   $scope.patientList = response.data;
  //          // console.log($scope.patientList);
  //        }, function myError(response) {
  //         console.log(response);
  //       });
  // console.log(data);

  $scope.patientList.doctors=[];
  $scope.patientList.doctors=data.doctors

  $scope.patientList.doctors.push({
    'name': data.doctors.name,
    'date': new Date()

  });


  $http.put('http://shelalainechan.com/patients/' + data._id,{
    doctors:$scope.patientList.doctors
  }).then (function successCallback (response) {
   // $scope.patientList=response.data;
        //console.log(response);
        //   $scope.loadPatient();

          $scope.patient=response.data;
                $scope.patientList=response.data;


      });


  };

  $scope.goAddTest=function(data)
  {
  //alert();


  // $http({
  //   method : "GET",
  //   url : "http://ec2-52-87-238-75.compute-1.amazonaws.com/patients/"+data._id
  // }).then(function mySucces(response) {
  //   $scope.patientList = response.data;

  //          // console.log($scope.patientList);
  //        }, function myError(response) {
  //         console.log(response);
  //       });
  // console.log(data);

  $scope.patientList.labTests=[];
  $scope.patientList.labTests=data.labTests

  $scope.patientList.labTests.push({
    'testType': data.labTests.testType,
    'requestDate': data.labTests.requestDate,
    

  });


  $http.put('http://shelalainechan.com/patients/' + data._id,{
    labTests:$scope.patientList.labTests
  }).then(function successCallback(response) {
  //  $scope.patientList=response.data;
     //$scope.loadPatient();

      $scope.patient=response.data;
            $scope.patientList=response.data;

        //console.log(response);

      });


  };


  $scope.goAddVitals=function(data)
  {
  //alert();


  // $http({
  //   method : "GET",
  //   url : "http://ec2-52-87-238-75.compute-1.amazonaws.com/patients/"+data._id
  // }).then(function mySucces(response) {
  //   $scope.patientList = response.data;
  //          // console.log($scope.patientList);
  //        }, function myError(response) {
  //         console.log(response);
  //       });
  // console.log(data);

  $scope.patientList.vitals=[];
  $scope.patientList.vitals=data.vitals

  $scope.patientList.vitals.push({
   'date':  new Date(),
   'takenByName': data.firstName,
   'systolic': data.vitals.systolic,
   'diastolic': data.vitals.diastolic,
   'heartRate': data.vitals.heartRate,
   'temperature': data.vitals.temperature,
   'respirationRate':data.vitals.respirationRate

  });


  $http.put('http://shelalainechan.com/patients/' + data._id,{
    vitals:$scope.patientList.vitals
  }).then(function successCallback (response) {
   // $scope.patientList=response.data;
      //$scope.loadPatient();

      $scope.patient=response.data;
            $scope.patientList=response.data;

        console.log(response);

      });


  };

  $scope.goaddPatient=function (data) {
  $http.post('http://ec2-52-87-238-75.compute-1.amazonaws.com/patients', data, config)
  .then(
   function(response){
    //alert();
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
              $scope.postsuccess=false;


if(patient){
   
           

          $http({
          method : "GET",
          url : "http://ec2-52-87-238-75.compute-1.amazonaws.com/patients/"+patient._id
          }).then(function mySucces(response) {
          $scope.patientList = response.data;
          $cookieStore.put('pat',response.data);
          $window.sessionStorage.pat=response.data;
          $rootScope.patientList=$scope.patientList;
               // console.log($scope.patientList);
             }, function myError(response) {
              console.log(response);
            });

          $rootScope.patient=patient;
          console.log($rootScope.patient);
          console.log('>>>');

        

          $scope.selectedpatient=$rootScope.patient;
          if($rootScope.patient)
          {

          $state.go('patientdetails');
          }
}
else
{
  $state.go('patientlist')
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





