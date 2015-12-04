'use strict';

/**
 * @ngdoc service
 * @name healthAnalyticsSiteApp.Authentication
 * @description
 * # Authentication
 * Service in the healthAnalyticsSiteApp.
 */
angular.module('healthAnalyticsSiteApp')
  .service('Authentication', function ($http, $cookieStore, $rootScope, $timeout, UserService, AppConfig) {
    var service = {};
    service.Login = Login;
    service.Logout = Logout;
    service.SetCredentials = SetCredentials;
    service.ClearCredentials = ClearCredentials;
    service.IsLoggedIn = IsLoggedIn;
    service.CurrentUser = CurrentUser;
    service.SetCurrentUser = SetCurrentUser;
    return service;

    function Login(username, password, callback) {

      /* If our config points to 'Local' we use dummy authentication for testing, uses $timeout to simulate api call */
      if (AppConfig.apiLocal) {
        $timeout(function () {
          var response;
          UserService.GetByUsername(username)
            .then(function (user) {
              if (user !== null && user.password === password) {
                SetCredentials(username, password, user.token);
                response = {success: true, code: 200, data: 'Ok'};
              } else {
                response = {success: false, code: 401, data: 'Username or password is incorrect'};
              }
              callback(response);
            });
        }, 1000);
      } else { /* Else, use real API Authentication */
        $http.post(AppConfig.apiUrl + AppConfig.loginUserApi + username, {password: password})
          .then(function (resp) { // success
            var token = resp.data;
            if (token && token.authtoken) {
              // we logged in, let's retrieve the user
              SetCredentials(username, password, token.authtoken, undefined);
              UserService.GetByUsername(username.toLowerCase()).then(function (response) {
                if (response.success) {
                  var user = response.data;
                  user.gender = user.gender.toLowerCase(); // send gender to lowercase....
                  user.birth_date = moment(user.birth_date).toDate(); // convert date object
                  SetCredentials(username, password, token.authtoken, user);
                } else {
                  Logout(); // logout because we couldn't retrieve the user...
                }
                callback(response); // send response, this covers both OK and BAD
              });
            }
          }, function (resp) { // error
            var response = {success: false, code: resp.status, data: resp.statusText};
            callback(response);
          });
      }
    }

    function SetCredentials(username, password, token, user) {
      $rootScope.globals = {
        currentUser: {
          username: username,
          password: password,
          authdata: token,
          user: user
        }
      };
      // Setting the authentication token/credentials for all http requests
      $http.defaults.headers.common['AuthToken'] = token;
      $cookieStore.put('globals', $rootScope.globals);
    }

    function CurrentUser() {
      if ($rootScope.globals.currentUser) {
        return $rootScope.globals.currentUser;
      } else {
        return {};
      }

    }

    function SetCurrentUser(user) {
      if (user) {
        $rootScope.globals.currentUser.user = user;
        $cookieStore.put('globals', $rootScope.globals);
      }
    }

    function IsLoggedIn() {
      if ($rootScope.globals.currentUser) {
        return true;
      } else {
        return false;
      }
    }

    function Logout() {
      var user = CurrentUser();
      if (user && user.username) {
        $http.post(AppConfig.apiUrl + AppConfig.logoutUserApi + user.username)
          .then(function (response) { // success
            ClearCredentials(); // Success or fail, we will clear credentials anyway....
          }, function (response) { // error
            ClearCredentials(); // Success or fail, we will clear credentials anyway....
          });
      } else {
        ClearCredentials(); // Success or fail, we will clear credentials anyway....
      }

    }

    function ClearCredentials() {
      $rootScope.globals = {};
      $cookieStore.remove('globals');
      // Clearing the authentication token/credentials for all http requests
      $http.defaults.headers.common['AuthToken'] = undefined;
    }
  });
