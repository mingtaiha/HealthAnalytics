'use strict';

/**
 * @ngdoc service
 * @name healthAnalyticsSiteApp.activity
 * @description
 * # activity
 * Service in the healthAnalyticsSiteApp.
 */
angular.module('healthAnalyticsSiteApp')
  .service('workout', function () {
    var service = {};
    if (AppConfig.apiLocal) { // If the API is set to local, user the Local functions
      service.GetAll = GetAllLocal;
      service.GetById = GetByIdLocal;
      service.Create = CreateLocal;
    } else { // else use the actual API functions.
      service.GetAll = GetAll;
      service.GetById = GetById;
      service.Create = Create;
    }
    return service;

    // API Service Functions
    function GetAll(username) {
      return $http.get(AppConfig.apiUrl + AppConfig.getWorkoutUserApi + username).then(handleSuccess, handleError);
    }

    function GetById(id) {
      return $http.get(AppConfig.apiUrl + AppConfig.getWorkoutApi + id).then(handleSuccess, handleError);
    }

    function Create(username, workout) {
      return $http.post(AppConfig.apiUrl + AppConfig.addWorkoutApi + username, workout).then(handleSuccess, handleError);
    }

    function handleSuccess(response) {
      return {success: true, code: response.status, data: response.data};
    }

    function handleError(response) {
      return {success: false, code: response.status, data: response.statusText};
    }

    // Local Service Functions
    function GetAllLocal() {
      var deferred = $q.defer();
      deferred.resolve(getWorkouts());
      return deferred.promise;
    }

    function GetByIdLocal(id) {
      var deferred = $q.defer();
      var filtered = $filter('filter')(getWorkouts(), {id: id});
      var food = filtered.length ? filtered[0] : null;
      deferred.resolve(workout);
      return deferred.promise;
    }

    function CreateLocal(username, workout) {
      var deferred = $q.defer();
      $timeout(function () {
        var workouts = getWorkouts();
        var lastWorkout = workouts[workouts.length - 1] || {id: 0};
        workout.id = lastWorkout.id + 1;

        workouts.push(workout);
        setWorkouts(workouts);

        deferred.resolve({success: true});
      }, 1000);
      return deferred.promise;
    }

    function getWorkouts() {
      if (!localStorage.workout) {
        localStorage.workout = JSON.stringify([]);
      }
      return JSON.parse(localStorage.workout);
    }

    function setWorkouts(workouts) {
      localStorage.workout = JSON.stringify(workouts);
    }
  });
