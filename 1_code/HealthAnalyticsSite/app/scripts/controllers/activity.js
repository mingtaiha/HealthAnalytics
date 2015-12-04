'use strict';

/**
 * @ngdoc function
 * @name healthAnalyticsSiteApp.controller:ActivityCtrl
 * @description
 * # ActivityCtrl
 * Controller of the healthAnalyticsSiteApp
 */
angular.module('healthAnalyticsSiteApp')
  .controller('ActivityCtrl', function (AppConfig, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    function Create(user) {
      return $http.post(AppConfig.apiUrl + AppConfig.addUserApi + user.email, user).then(handleSuccess, handleError);
    }

    ok = Create('wkaravites@gmail.com', 'Will Karavites');
  });
