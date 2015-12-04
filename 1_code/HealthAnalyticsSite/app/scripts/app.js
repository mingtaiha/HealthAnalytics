'use strict';

/**
 * @ngdoc overview
 * @name healthAnalyticsSiteApp
 * @description
 * # healthAnalyticsSiteApp
 *
 * Main module of the application.
 */
angular
  .module('healthAnalyticsSiteApp', [
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/activity', {
        templateUrl: 'views/activity.html',
        controller: 'ActivityCtrl',
        controllerAs: 'act'
      })
      .when('/community', {
        templateUrl: 'views/community.html',
        controller: 'CommunityCtrl',
        controllerAs: 'comm'
      })
      .when('/export', {
        templateUrl: 'views/export.html',
        controller: 'ExportCtrl',
        controllerAs: 'export'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      }).when('/registration', {
        templateUrl: 'views/registration.html',
        controller: 'RegistrationCtrl',
        controllerAs: 'regis'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).constant('AppConfig', {
  'version': '0.1',

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

  /* Should we use local API or use the server? 'true' for local, 'false' for server */
  'apiLocal': false

});
