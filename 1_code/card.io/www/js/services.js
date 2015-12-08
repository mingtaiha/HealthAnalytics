angular.module('starter.services', ['starter.config'])
.factory('UserService', function($http, AppConfig) {
  var service = {};
  service.GetByUsername = GetByUsername;
  service.Create = Create;
  service.Update = Update;
  service.GetEthnicitiesList = GetEthnicitiesList;
  return service;

  // API Service Functions
  function GetByUsername(username) {
    return $http.get(AppConfig.apiUrl + AppConfig.getUserApi + username).then(handleSuccess, handleError);
  }

  function Create(user) {
    return $http.post(AppConfig.apiUrl + AppConfig.addUserApi + user.email, user).then(handleSuccess, handleError);
  }

  function Update(user) {
    return $http.put(AppConfig.apiUrl + AppConfig.updateUserApi + user.email, user).then(handleSuccess, handleError);
  }

  function GetEthnicitiesList() {
    return $http.get(AppConfig.apiUrl + AppConfig.getEthnicities).then(handleSuccess, handleError);
  }

  function handleSuccess(response) {
    return { success:true, code:response.status, data: response.data };
  }

  function handleError(response) {
    return { success: false, code:response.status , data: response.statusText };
  }
})

.factory('AuthenticationService', function($http, $cookieStore, $rootScope, $timeout, UserService, AppConfig){
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
    $http.post(AppConfig.apiUrl + AppConfig.loginUserApi + username, { password: password })
    .then(function (resp) { // success
      var token = resp.data;
      if(token && token.authtoken){
        // we logged in, let's retrieve the user
        SetCredentials(username, password, token.authtoken, undefined);
        UserService.GetByUsername(username.toLowerCase()).then(function(response) {
          if(response.success) {
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
    }, function (resp){ // error
      var response = { success: false, code: resp.status, data: resp.statusText };
      callback(response);
    });
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

  function CurrentUser(){
    if($rootScope.globals && $rootScope.globals.currentUser){
      return $rootScope.globals.currentUser;
    } else {
      return {};
    }
     
  }

  function SetCurrentUser(user){
    if(user){
      $rootScope.globals.currentUser.user = user;
      $cookieStore.put('globals', $rootScope.globals);
    } 
  }

  function IsLoggedIn(){
    if($rootScope.globals && $rootScope.globals.currentUser){
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
        var deferred = $q.defer();
        deferred.resolve({ success: true, code: response.status, data: resp.statusText });
        return deferred.promise;
      }, function (response) { // error
        ClearCredentials(); // Success or fail, we will clear credentials anyway....
        deferred.resolve({ success: false, code: response.status, data: resp.statusText });
        return deferred.promise;
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
})


.factory('FoodService', function($http, AppConfig) {
  var service = {};
  service.GetFoodList = GetFoodList;
  service.GetAll = GetAll;
  service.GetById = GetById;
  service.Create = Create;
  return service;

  // API Service Functions
  function GetFoodList() {
    return $http.get(AppConfig.apiUrl + AppConfig.getFoodListApi).then(handleSuccess, handleError);
  }

  function GetAll(username) {
    return $http.get(AppConfig.apiUrl + AppConfig.getFoodUserApi + username).then(handleSuccess, handleError);
  }

  function GetById(id) {
    return $http.get(AppConfig.apiUrl + AppConfig.getFoodApi + id).then(handleSuccess, handleError);
  }

  function Create(username, food) {
    return $http.post(AppConfig.apiUrl + AppConfig.addFoodApi + username, food).then(handleSuccess, handleError);
  }

  function handleSuccess(response) {
    return { success:true, code:response.status, data: response.data };
  }

  function handleError(response) {
    return { success: false, code:response.status , data: response.statusText };
  }
})


.factory('WorkoutService', function($http, AppConfig) {
  var service = {};
  service.GetAll = GetAll;
  service.GetById = GetById;
  service.Create = Create;
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
    return { success:true, code:response.status, data: response.data };
  }

  function handleError(response) {
    return { success: false, code:response.status , data: response.statusText };
  }
})


.factory('HealthService', function($http, AppConfig) {
  var service = {};
  service.GetStats = GetStats;
  service.GetAggregateStats = GetAggregateStats;
  return service;

  // API Service Functions
  function GetStats(username) { //getHealthStats
    return $http.get(AppConfig.apiUrl + AppConfig.getHealthStats + username).then(handleSuccess, handleError);
  }

  function GetAggregateStats(state) {
    return $http.get(AppConfig.apiUrl + AppConfig.getAggregatedHealthStats + state).then(handleSuccess, handleError);
  }

  function handleSuccess(response) {
    return { success:true, code:response.status, data: response.data };
  }

  function handleError(response) {
    return { success: false, code:response.status , data: response.statusText };
  }
});


