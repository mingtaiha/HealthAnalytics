'use strict';

/**
 * @ngdoc service
 * @name healthAnalyticsSiteApp.UserService
 * @description
 * # UserService
 * Service in the healthAnalyticsSiteApp.
 */
angular.module('healthAnalyticsSiteApp')
  .service('UserService', function ($http, AppConfig, $q, $filter, $timeout) {
    var service = {};
    if (AppConfig.apiLocal) { // If the API is set to local, user the Local functions
      service.GetAll = GetAllLocal;
      service.GetById = GetByIdLocal;
      service.GetByUsername = GetByUsernameLocal;
      service.Create = CreateLocal;
      service.Update = UpdateLocal;
      service.Delete = DeleteLocal;
    } else { // else use the actual API functions.
      service.GetAll = GetAll;
      service.GetById = GetById;
      service.GetByUsername = GetByUsername;
      service.Create = Create;
      service.Update = Update;
      service.Delete = Delete;
    }
    return service;

    // API Service Functions
    function GetAll() {
      return $http.get(AppConfig.apiUrl + AppConfig.getUserApi).then(handleSuccess, handleError);
    }

    function GetById(id) {
      return $http.get(AppConfig.apiUrl + AppConfig.getUserApi + id).then(handleSuccess, handleError);
    }

    function GetByUsername(username) {
      return $http.get(AppConfig.apiUrl + AppConfig.getUserApi + username).then(handleSuccess, handleError);
    }

    function Create(user) {
      return $http.post(AppConfig.apiUrl + AppConfig.addUserApi + user.email, user).then(handleSuccess, handleError);
    }

    function Update(user) {
      return $http.put(AppConfig.apiUrl + AppConfig.updateUserApi + user.email, user).then(handleSuccess, handleError);
    }

    function Delete(id) {
      return $http.delete(AppConfig.apiUrl + AppConfig.deleteUserApi + username).then(handleSuccess, handleError);
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
      deferred.resolve(getUsers());
      return deferred.promise;
    }

    function GetByIdLocal(id) {
      var deferred = $q.defer();
      var filtered = $filter('filter')(getUsers(), {id: id});
      var user = filtered.length ? filtered[0] : null;
      deferred.resolve(user);
      return deferred.promise;
    }

    function GetByUsernameLocal(username) {
      var deferred = $q.defer();
      var filtered = $filter('filter')(getUsers(), {username: username});
      var user = filtered.length ? filtered[0] : null;
      deferred.resolve(user);
      return deferred.promise;
    }

    function CreateLocal(user) {
      var deferred = $q.defer();
      $timeout(function () {
        GetByUsername(user.username)
          .then(function (duplicateUser) {
            if (duplicateUser !== null) {
              deferred.resolve({success: false, message: 'Username "' + user.username + '" is already taken'});
            } else {
              var users = getUsers();

              var lastUser = users[users.length - 1] || {id: 0};
              user.id = lastUser.id + 1;
              user.authtoken = 'sometoken';

              users.push(user);
              setUsers(users);

              deferred.resolve({success: true});
            }
          });
      }, 1000);
      return deferred.promise;
    }

    function UpdateLocal(user) {
      var deferred = $q.defer();
      var users = getUsers();
      for (var i = 0; i < users.length; i++) {
        if (users[i].id === user.id) {
          users[i] = user;
          break;
        }
      }
      setUsers(users);
      deferred.resolve();
      return deferred.promise;
    }

    function DeleteLocal(id) {
      var deferred = $q.defer();
      var users = getUsers();
      for (var i = 0; i < users.length; i++) {
        var user = users[i];
        if (user.id === id) {
          users.splice(i, 1);
          break;
        }
      }
      setUsers(users);
      deferred.resolve();
      return deferred.promise;
    }

    function getUsers() {
      if (!localStorage.users) {
        localStorage.users = JSON.stringify([]);
      }
      return JSON.parse(localStorage.users);
    }

    function setUsers(users) {
      localStorage.users = JSON.stringify(users);
    }

  });
