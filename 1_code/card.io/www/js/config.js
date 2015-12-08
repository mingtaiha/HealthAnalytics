angular.module('starter.config', [])
.constant('AppConfig', {

  /* The api server url */
  'apiUrl': 'http://www.rugatech.com/se1/api/',

  /* All apis should end in a slash '/' */

  // Authentication
  'loginUserApi': 'loginUser/',
  'logoutUserApi': 'logoutUser/',

  // User API
  'getUserApi': 'getUser/',
  'addUserApi': 'addUser/',
  'updateUserApi': 'updateUser/',
  'deleteUserApi': 'deleteUser/',
  'getEthnicities': 'getEthnicities/',

  // Food API
  'getFoodListApi': 'getFoodList/',
  'getFoodAllApi': 'getFoodAll/',
  'getFoodUserApi': 'getFoodUser/',
  'getFoodApi': 'getFood/',
  'addFoodApi': 'addFood/',

  // Workout API
  'getWorkoutAllApi': 'getWorkoutAll/',
  'getWorkoutUserApi': 'getWorkoutUser/',
  'getWorkoutApi': 'getWorkout/',
  'addWorkoutApi': 'addWorkout/',

  // Health Stats API
  'getHealthStats': 'getHealthStats/',
  'getAggregatedHealthStats': 'getAggregatedHealthStats/',

  // Api Version
  'version': '0.1'
});