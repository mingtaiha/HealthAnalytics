'use strict';

/**
 * @ngdoc service
 * @name healthAnalyticsSiteApp.health
 * @description
 * # health
 * Service in the healthAnalyticsSiteApp.
 */
angular.module('healthAnalyticsSiteApp')
  .service('health', function ($http, AppConfig) {
    var service = {};
    if (AppConfig.apiLocal) { // If the API is set to local, user the Local functions
      service.GetStats = GetStatsLocal;
    } else { // else use the actual API functions.
      service.GetStats = GetStats;
    }
    return service;

    // API Service Functions
    function GetStats(username) { //getHealthStats
      return $http.get(AppConfig.apiUrl + AppConfig.getHealthStats + username).then(handleSuccess, handleError);
    }

    function handleSuccess(response) {
      return {success: true, code: response.status, data: response.data};
    }

    function handleError(response) {
      return {success: false, code: response.status, data: response.statusText};
    }

    // Local Service Functions
    function GetStatsLocal() {
      var stats = {
        Dia: {min: 0, max: 0},
        HDL: {min: 0, max: 0},
        HR: {min: 0, max: 0},
        LDL: {min: 0, max: 0},
        Sys: {min: 0, max: 0},
        Tri: {min: 0, max: 0}
      };
      var deferred = $q.defer();
      deferred.resolve(stats);
      return deferred.promise;
    }
  });
