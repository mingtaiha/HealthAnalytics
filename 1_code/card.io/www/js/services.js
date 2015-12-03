angular.module('starter.services', ['starter.config'])
.factory('UserService', function($http, AppConfig) {
  var service = {};
  if(AppConfig.apiLocal) { // If the API is set to local, user the Local functions
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
    return { success:true, code:response.status, data: response.data };
  }

  function handleError(response) {
    return { success: false, code:response.status , data: response.statusText };
  }

  // Local Service Functions
  function GetAllLocal() {
    var deferred = $q.defer();
    deferred.resolve(getUsers());
    return deferred.promise;
  }

  function GetByIdLocal(id) {
    var deferred = $q.defer();
    var filtered = $filter('filter')(getUsers(), { id: id });
    var user = filtered.length ? filtered[0] : null;
    deferred.resolve(user);
    return deferred.promise;
  }

  function GetByUsernameLocal(username) {
    var deferred = $q.defer();
    var filtered = $filter('filter')(getUsers(), { username: username });
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
          deferred.resolve({ success: false, message: 'Username "' + user.username + '" is already taken' });
        } else {
          var users = getUsers();

          var lastUser = users[users.length - 1] || { id: 0 };
          user.id = lastUser.id + 1;
          user.authtoken = 'sometoken';

          users.push(user);
          setUsers(users);

          deferred.resolve({ success: true });
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
    if(!localStorage.users){
      localStorage.users = JSON.stringify([]);
    }
    return JSON.parse(localStorage.users);
  }

  function setUsers(users) {
    localStorage.users = JSON.stringify(users);
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

    /* If our config points to 'Local' we use dummy authentication for testing, uses $timeout to simulate api call */
    if(AppConfig.apiLocal) {
      $timeout(function () {
        var response;
        UserService.GetByUsername(username)
        .then(function (user) {
          if (user !== null && user.password === password) {
            SetCredentials(username, password, user.token);
            response = { success: true, code:200 , data: 'Ok' };
          } else {
            response = { success: false, code:401 , data: 'Username or password is incorrect'};
          }
          callback(response);
        });
      }, 1000);
    } else { /* Else, use real API Authentication */
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
    if($rootScope.globals.currentUser){
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
    if($rootScope.globals.currentUser){
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
})


.factory('FoodService', function($http, AppConfig) {
  var service = {};
  if(AppConfig.apiLocal) { // If the API is set to local, user the Local functions
    service.GetFoodList = GetFoodListLocal;
    service.GetAll = GetAllLocal;
    service.GetById = GetByIdLocal;
    service.Create = CreateLocal;
  } else { // else use the actual API functions.
    service.GetFoodList = GetFoodList;
    service.GetAll = GetAll;
    service.GetById = GetById;
    service.Create = Create;
  }
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

  // Local Service Functions
  // Local Service Functions
  function GetFoodListLocal() {
    var deferred = $q.defer();
    deferred.resolve(JSSON.parse('[{"food_id":1,"food_name":"Cheese Pizza","calories":272,"serving_size":"1 slice","serving_size_normalized":103},{"food_id":2,"food_name":"Coffee (milk and sugar)","calories":41,"serving_size":"8 fl oz","serving_size_normalized":237},{"food_id":3,"food_name":"Yellow Cake with Vanilla Frosting","calories":239,"serving_size":"1 slice(1/8 of 18oz cake)","serving_size_normalized":64}]'));
    return deferred.promise;
  }

  function GetAllLocal() {
    var deferred = $q.defer();
    deferred.resolve(getFoods());
    return deferred.promise;
  }

  function GetByIdLocal(id) {
    var deferred = $q.defer();
    var filtered = $filter('filter')(getFoods(), { id: id });
    var food = filtered.length ? filtered[0] : null;
    deferred.resolve(food);
    return deferred.promise;
  }

  function CreateLocal(username, food) {
    var deferred = $q.defer();
    $timeout(function () {
      var foods = getFoods();
      var lastFood = foods[foods.length - 1] || { id: 0 };
      food.id = lastFood.id + 1;

      foods.push(food);
      setFoods(foods);

      deferred.resolve({ success: true });
    }, 1000);
    return deferred.promise;
  }

  function getFoods() {
    if(!localStorage.food){
      localStorage.food = JSON.stringify([]);
    }
    return JSON.parse(localStorage.food);
  }

  function setFoods(foods) {
    localStorage.food = JSON.stringify(foods);
  }
})


.factory('WorkoutService', function($http, AppConfig) {
  var service = {};
  if(AppConfig.apiLocal) { // If the API is set to local, user the Local functions
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
    return { success:true, code:response.status, data: response.data };
  }

  function handleError(response) {
    return { success: false, code:response.status , data: response.statusText };
  }

  // Local Service Functions
  function GetAllLocal() {
    var deferred = $q.defer();
    deferred.resolve(getWorkouts());
    return deferred.promise;
  }

  function GetByIdLocal(id) {
    var deferred = $q.defer();
    var filtered = $filter('filter')(getWorkouts(), { id: id });
    var food = filtered.length ? filtered[0] : null;
    deferred.resolve(workout);
    return deferred.promise;
  }

  function CreateLocal(username, workout) {
    var deferred = $q.defer();
    $timeout(function () {
      var workouts = getWorkouts();
      var lastWorkout = workouts[workouts.length - 1] || { id: 0 };
      workout.id = lastWorkout.id + 1;

      workouts.push(workout);
      setWorkouts(workouts);

      deferred.resolve({ success: true });
    }, 1000);
    return deferred.promise;
  }

  function getWorkouts() {
    if(!localStorage.workout){
      localStorage.workout = JSON.stringify([]);
    }
    return JSON.parse(localStorage.workout);
  }

  function setWorkouts(workouts) {
    localStorage.workout = JSON.stringify(workouts);
  }
})


.factory('HealthService', function($http, AppConfig) {
  var service = {};
  if(AppConfig.apiLocal) { // If the API is set to local, user the Local functions
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
    return { success:true, code:response.status, data: response.data };
  }

  function handleError(response) {
    return { success: false, code:response.status , data: response.statusText };
  }

  // Local Service Functions
  function GetStatsLocal() {
    var stats = {
      Dia:{min:0,max:0},
      HDL:{min:0,max:0},
      HR:{min:0,max:0},
      LDL:{min:0,max:0},
      Sys:{min:0,max:0},
      Tri:{min:0,max:0}
    };
    var deferred = $q.defer();
    deferred.resolve(stats);
    return deferred.promise;
  }
});


