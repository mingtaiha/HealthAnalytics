'use strict';

/**
 * @ngdoc function
 * @name healthAnalyticsSiteApp.controller:FoodCtrl
 * @description
 * # FoodCtrl
 * Controller of the healthAnalyticsSiteApp
 */
angular.module('healthAnalyticsSiteApp')
  .controller('FoodCtrl', function ($scope, $stateParams, $location, AuthenticationService, FoodService) {
    // Types of meal
    $scope.mealTypes = [
      {text: 'Breakfast', value: 'breakfast', id: 0},
      {text: 'Lunch', value: 'lunch', id: 1},
      {text: 'Dinner', value: 'dinner', id: 2},
      {text: 'Snack', value: 'snack', id: 3},
      {text: 'Other', value: 'other', id: 4}
    ];

    // Types of serving
    $scope.servingTypes = [
      {text: 'Quick Snack', value: '0.5', id: 0},
      {text: 'Normal', value: '1', id: 1},
      {text: 'Moderate', value: '2', id: 2},
      {text: 'A Lot', value: '3', id: 3}
    ];

    $scope.selected = {};
    $scope.selected.selectedMealType = $scope.mealTypes[0]; // Default to 'Breakfast'
    $scope.selected.selectedServingType = $scope.servingTypes[1]; // Default to 'Normal'

    // template user food data object
    $scope.foodData = {
      food: 1, // food id
      meal: 'breakfast',
      serving: '0.5',
      food_timestamp: moment().toDate(),
      comments: null
    };

    // Submit new user Food to server
    $scope.submitFood = function() {
      // overrite some of the foodData values
      $scope.foodData.food = $scope.selected.selectedFoodType.food_id; // food id
      $scope.foodData.meal = $scope.selected.selectedMealType.value; // meal value
      $scope.foodData.serving = $scope.selected.selectedServingType.value; // serving value
      $scope.foodData.food_timestamp = moment($scope.foodData.food_timestamp).utc().toDate(); // convert date to utc

      // Send to server
      FoodService.Create(AuthenticationService.CurrentUser().username, $scope.foodData)
        .then(function (response) {
          if (response.success) {
            //NEEDS CONVERSION TO ANGULAR
            //$ionicHistory.nextViewOptions({disableBack: true});
            $location.path('app/foods');
          } else {
            alert('Update Failed!');
          }
        });
    }

    // Get list of pre-defined foods.
    FoodService.GetFoodList().then(function (response){
      if(response.success) {
        $scope.foods = response.data;
      }
    });

    // Load the scope data before enetering the view...
    $scope.$on('$ionicView.beforeEnter', function(){
      // Get user's list of foods
      FoodService.GetAll($scope.username).then(function(response) {
        if(response.success) {
          $scope.foodList = response.data;
        }
      });
    });

    // Refresh mechanism for pull-to-refresh
    $scope.doRefresh = function() {
      FoodService.GetAll($scope.username).then(function(response) {
        if(response.success) {
          $scope.foodList = response.data;
          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        }
      });
    }

    // Format the date using 'moment'
    $scope.formatDate = function(date) {
      if(date) {
        return moment(date).format('ll');
      }
    }

    // Format the calories using 'moment'
    $scope.formatCalories = function(calories) {
      if(calories) {
        var calculatedCalories = parseFloat(calories);
        var value = calculatedCalories.toFixed(2) + " calories";
        return value;
      }
    }
  });
