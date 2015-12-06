'use strict';

/**
 * @ngdoc function
 * @name healthAnalyticsSiteApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the healthAnalyticsSiteApp
 */
angular.module('healthAnalyticsSiteApp')
  .controller('AccountCtrl', function ($scope, $rootScope, AuthenticationService, UserService) {
    $scope.username = AuthenticationService.CurrentUser().username;
    $scope.editing = false;
    $scope.isUserDataHasChanges = false;
    $scope.userProfile = $scope.currentUser; // get it from the cache...
    $scope.ethnicityList = [];

    // Get ethnicities list to populate dropdown
    UserService.GetEthnicitiesList().then(function (response) {
      if(response.success) {
        $scope.ethnicityList = response.data;
      }
    });

    /*
    //NEED CONVERSION FROM IONIC TO ANGULAR
    // Load the scope data before enetering the view...
    $scope.$on('$ionicView.beforeEnter', function(){
      if ( !$scope.userProfile ) { // if the profile was empty, fill it
        UserService.GetByUsername($scope.username).then(function (response){
          if (response.success) {
            var user = response.data;
            user.gender = user.gender.toLowerCase(); // send gender to lowercase....
            user.birth_date = moment(user.birth_date).toDate(); // convert date object
            $scope.userProfile = user;
          }
        });
      }
    });
  */
    // Set the watch of the variable
    // This checks for dirty-ness
    $scope.$watch('userProfile', function (newValue, oldValue) {
      if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
        $scope.isUserDataHasChanges = true;
      }
    }, true);

    // Perform the login action when the user submits the login form
    $scope.toggleEdit = function() {
      $scope.editing = true;
    };

    // Perform the login action when the user submits the login form
    $scope.saveProfile = function() {
      if ($scope.editing && $scope.isUserDataHasChanges) {
        UserService.Update($scope.userProfile).then(function (response){
          if (response.success) { // update success

            alert('Success!');

            // Get the user from the server again and update currentUser + userProfile...
            UserService.GetByUsername($scope.username).then(function (resp) {
              if(resp.success) {
                var user = resp.data;
                user.gender = user.gender.toLowerCase(); // send gender to lowercase....
                user.birth_date = moment(user.birth_date).toDate(); // convert date object
                AuthenticationService.SetCurrentUser(user);
                $scope.userProfile = user;
                $scope.editing = false; // done editing...
                $scope.isUserDataHasChanges = false; // user was updated, forcing false...
              }
            });
          } else {
            alert('Update Failed!');
          }
        });
      } else {
        $scope.editing = false;
      }
    };

    /*
     Ethnicities List Example:
     [
     {"ethnicity_id":"Asian","ethnicity":"Asian"},
     {"ethnicity_id":"Black","ethnicity":"Black"},
     {"ethnicity_id":"Hisp","ethnicity":"Hispanic"},
     {"ethnicity_id":"Mixed","ethnicity":"Mixed"},
     {"ethnicity_id":"NavAm","ethnicity":"Native American"},
     {"ethnicity_id":"Other","ethnicity":"Other"},
     {"ethnicity_id":"PacIs","ethnicity":"Pacific Islander"},
     {"ethnicity_id":"WhiteNonHisp","ethnicity":"White Non Hispanic"}
     ]
     */
  });
