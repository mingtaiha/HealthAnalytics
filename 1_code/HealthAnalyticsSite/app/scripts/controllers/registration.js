'use strict';

/**
 * @ngdoc function
 * @name healthAnalyticsSiteApp.controller:RegistrationCtrl
 * @description
 * # RegistrationCtrl
 * Controller of the healthAnalyticsSiteApp
 */
angular.module('healthAnalyticsSiteApp')
  .controller('RegistrationCtrl', function ($scope, UserService, AuthenticationService) {
    $scope.loginData = {};
    $scope.registerData = {};


    // List used for gender drop downs
    $scope.genderList = [
      {text: 'Male', value: 'm'},
      {text: 'Female', value: 'f'}
    ]

    // List used for state dropdowns
    $scope.stateList = [
      {value: 'AL', text: 'Alabama'}, {value: 'AK', text: 'Alaska'},
      {value: 'AZ', text: 'Arizona'}, {value: 'AR', text: 'Arkansas'},
      {value: 'CA', text: 'California'}, {value: 'CO', text: 'Colorado'},
      {value: 'CT', text: 'Connecticut'}, {value: 'DE', text: 'Delaware'},
      {value: 'FL', text: 'Florida'}, {value: 'GA', text: 'Georgia'},
      {value: 'HI', text: 'Hawaii'}, {value: 'ID', text: 'Idaho'},
      {value: 'IL', text: 'Illinois'}, {value: 'IN', text: 'Indiana'},
      {value: 'IA', text: 'Iowa'}, {value: 'KS', text: 'Kansas'},
      {value: 'KY', text: 'Kentucky'}, {value: 'LA', text: 'Louisiana'},
      {value: 'ME', text: 'Maine'}, {value: 'MD', text: 'Maryland'},
      {value: 'MA', text: 'Massachusetts'}, {value: 'MI', text: 'Michigan'},
      {value: 'MN', text: 'Minnesota'}, {value: 'MS', text: 'Mississippi'},
      {value: 'MO', text: 'Missouri'}, {value: 'MT', text: 'Montana'},
      {value: 'NE', text: 'Nebraska'}, {value: 'NV', text: 'Nevada'},
      {value: 'NH', text: 'New Hampshire'}, {value: 'NJ', text: 'New Jersey'},
      {value: 'NM', text: 'New Mexico'}, {value: 'NY', text: 'New York'},
      {value: 'NC', text: 'North Carolina'}, {value: 'ND', text: 'North Dakota'},
      {value: 'OH', text: 'Ohio'}, {value: 'OK', text: 'Oklahoma'},
      {value: 'OR', text: 'Oregon'}, {value: 'PA', text: 'Pennsylvania'},
      {value: 'RI', text: 'Rhode Island'}, {value: 'SC', text: 'South Carolina'},
      {value: 'SD', text: 'South Dakota'}, {value: 'TN', text: 'Tennessee'},
      {value: 'TX', text: 'Texas'}, {value: 'UT', text: 'Utah'},
      {value: 'VT', text: 'Vermont'}, {value: 'VA', text: 'Virginia'},
      {value: 'WA', text: 'Washington'}, {value: 'WV', text: 'West Virginia'},
      {value: 'WI', text: 'Wisconsin'}, {value: 'WY', text: 'Wyoming'}
    ]


    // Update the registerData variable with a 'Date' object
    // Used for display + data submission purposes
    $scope.$watch($scope.registerData.birth_date, function (birth_date) {
      $scope.registerData.birth_date = new Date(birth_date);
    });

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      AuthenticationService.Login($scope.loginData.email, $scope.loginData.password,
        function (response) {
          if (response.success) {
            // Go to the Home
            $location.path('app/home');
          } else {
            // Show error
            alert('Login Failed');
          }
        });
    }

    // Perform the register action when the user submits the register form
    $scope.doRegister = function () {
      $scope.registerData.birth_date = new Date($scope.registerData.birth_date); // convert date object
      UserService.Create($scope.registerData).then(function (response) {
        if (response.success) {
          // Success! Close modal, since we are good!
          // They need to log in now...
          $scope.closeRegisterModal();
        } else {
          // Show error
          alert('Registration Failed!');
        }
      });
    }

    // When user clicks on "register" we show a modal
    // This is creates the register modal that we will use
    $ionicModal.fromTemplateUrl('templates/register.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.openRegisterModal = function () {
      $scope.modal.show();
    };

    $scope.closeRegisterModal = function () {
      $scope.modal.hide();
    };

    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });

    $scope.$on('modal.hidden', function () {
      $scope.registerData = {}; // delete all registerData when modal is hidden
    });
  });
