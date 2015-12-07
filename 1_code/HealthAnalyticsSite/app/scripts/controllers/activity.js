'use strict';

/**
 * @ngdoc function
 * @name healthAnalyticsSiteApp.controller:ActivityCtrl
 * @description
 * # ActivityCtrl
 * Controller of the healthAnalyticsSiteApp
 */
angular.module('healthAnalyticsSiteApp')
  .controller('ActivityCtrl', function ($scope, $stateParams, $location, AuthenticationService, WorkoutService) {
    // MET values are taken from 'Compendium of Physical Activities', see README.md file
    $scope.workoutTypes = [
      {text: 'Run', value: 'run', met: 8.0},
      {text: 'Walk', value: 'Walk', met: 6.0},
      {text: 'Bike', value: 'bike', met: 7.5}
    ];

    // Calculate the estimated calories everytime user changes workout_type or duration
    // It uses the function 'calculateCalories' defined below
    $scope.$watchGroup( ['workoutData.workout_type', 'workoutData.duration'], function ( newValues, oldValues, scope ) {
      $scope.workoutData.calories = $scope.calculateCalories(newValues[0], newValues[1]);
    });

    // Calculate the estimated calories for the workout done
    // Information on how/were we got the information for this is found
    // on the README.md file of this application.
    $scope.calculateCalories = function(activityType, duration){
      // Formula used: Calories = METS x weight (kg) x time (hours)
      // 1 kg = 0.45359237 (pounds)
      // 1 hour = 60 (mins)
      // METS values are defined above
      var userWeightKg = parseFloat($scope.currentUser.weight) * 0.45359237;
      var durationHours = parseFloat(duration) / 60.0;
      var activityMET = 6.0; // default MET
      for (var workout in $scope.workoutTypes) {
        if ($scope.workoutTypes[workout].value === activityType) {
          activityMET = $scope.workoutTypes[workout].met;
          break;
        }
      }
      return parseFloat(activityMET * userWeightKg * durationHours);
    }

    // Format the display of calories to two decimal points (xx.00)
    $scope.formatCalories = function(calories) {
      if(calories) {
        var calculatedCalories = parseFloat(calories);
        var value = calculatedCalories.toFixed(2);
        return value;
      }
    }

    // New user Workout template data object
    $scope.workoutData = {
      comments: null,
      workout_type: 'run',
      workout_timestamp: moment().toDate(),
      distance: 0.0,
      duration: 0.0,
      calories: 0.0
    };

    // Submit the user Workout item to server
    $scope.submitWorkout = function() {
      $scope.workoutData.workout_timestamp = moment($scope.workoutData.workout_timestamp).utc().toDate(); // convert date to utc
      WorkoutService.Create(AuthenticationService.CurrentUser().username, $scope.workoutData)
        .then(function (response) {
          if (response.success) {
            //NEED CONVERSION
            //$ionicHistory.nextViewOptions({disableBack: true});
            $location.path('app/workouts');
          } else {
              alert('Update Failed!');
          }
        });
    }

    /*
     New Workout request variables format:
     workout_type=[string(100)]
     distance=[float(6,2)] miles
     duration=[int] minutes
     calories=[int]
     workout_timestamp=[UTC formatted date]
     authtoken=[string(32)]
     Example of user's Workout item:
     {"workout_id":51,
     "workout_type":"jog",
     "distance":2,
     "duration":65,
     "calories":250,
     "pace":1,
     "workout_timestamp":"2015-11-05T13:12:43.511Z",
     "email":"ntaylor@aps.rutgers.edu"},
     */
  });
