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
    service.GetEthnicitiesList = GetEthnicitiesListLocal;
  } else { // else use the actual API functions.
    service.GetAll = GetAll;
    service.GetById = GetById;
    service.GetByUsername = GetByUsername;
    service.Create = Create;
    service.Update = Update;
    service.Delete = Delete;
    service.GetEthnicitiesList = GetEthnicitiesList;
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

  function GetEthnicitiesList() {
    return $http.get(AppConfig.apiUrl + AppConfig.getEthnicities).then(handleSuccess, handleError);
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

  function GetEthnicitiesListLocal() {
    var ethnicities = [
      {"ethnicity_id":"Asian","ethnicity":"Asian"},
      {"ethnicity_id":"Black","ethnicity":"Black"},
      {"ethnicity_id":"Hisp","ethnicity":"Hispanic"},
      {"ethnicity_id":"Mixed","ethnicity":"Mixed"},
      {"ethnicity_id":"NavAm","ethnicity":"Native American"},
      {"ethnicity_id":"Other","ethnicity":"Other"},
      {"ethnicity_id":"PacIs","ethnicity":"Pacific Islander"},
      {"ethnicity_id":"WhiteNonHisp","ethnicity":"White Non Hispanic"}
    ];
    var deferred = $q.defer();
    deferred.resolve(ethnicities);
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
    service.GetAggregateStats = GetAggregateStatsLocal;
  } else { // else use the actual API functions.
    service.GetStats = GetStats;
    service.GetAggregateStats = GetAggregateStats;
  }
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

  function GetAggregateStatsLocal(state) {
    var stats = {
      age_summary:[{state:state.toUpperCase(),average:45.94613,std:17.21731,min:18,max:100,bin1:0.07066,bin2:0.07645,bin3:0.06873,bin4:0.07974,bin5:0.0808,bin6:0.07601,bin7:0.07967,bin8:0.08131,bin9:0.07957,bin10:0.08178,bin11:0.05077,bin12:0.04363,bin13:0.0396,bin14:0.02863,bin15:0.02853,bin16:0.02352,bin17:0.00399,bin18:0.00224,bin19:0.00211,bin20:0.00225}],
      bmi_summary:[{state:state.toUpperCase(),average:28.67137,std:6.57933,min:16,max:59,bin1:0.00934,bin2:0.05642,bin3:0.10961,bin4:0.13275,bin5:0.13553,bin6:0.13172,bin7:0.11278,bin8:0.08849,bin9:0.06632,bin10:0.04888,bin11:0.03659,bin12:0.02662,bin13:0.0182,bin14:0.01213,bin15:0.00768,bin16:0.00373,bin17:0.00194,bin18:0.00086,bin19:0.00028,bin20:0.00013}],
      dia_summary:[{state:state.toUpperCase(),average:77.74728,std:14.71972,min:47,max:132,bin1:0.00453,bin2:0.01842,bin3:0.04034,bin4:0.0815,bin5:0.12629,bin6:0.15199,bin7:0.15058,bin8:0.11005,bin9:0.0765,bin10:0.05094,bin11:0.03546,bin12:0.03466,bin13:0.03149,bin14:0.02966,bin15:0.02372,bin16:0.01417,bin17:0.00934,bin18:0.00424,bin19:0.00345,bin20:0.00266}],
      ethnicity_summary:[{state:state.toUpperCase(),whitenonhisp:0.57231,navam:0.00284,hisp:0.1521,other:0.055,mixed:0.01991,asian:0.07604,black:0.12149,pacis:0.00031}],
      gender_summary:[{state:state.toUpperCase(),male:0.48835,female:0.51165}],
      hdl_summary:[{state:state.toUpperCase(),average:54.36565,std:17.57512,min:14,max:150,bin1:0.00201,bin2:0.0177,bin3:0.05156,bin4:0.1334,bin5:0.19326,bin6:0.19496,bin7:0.14512,bin8:0.1007,bin9:0.06726,bin10:0.03301,bin11:0.01786,bin12:0.00883,bin13:0.00793,bin14:0.00749,bin15:0.00599,bin16:0.00463,bin17:0.0042,bin18:0.0023,bin19:0.00115,bin20:0.00063}],
      height_summary:[{state:state.toUpperCase(),average:168.99825,std:9.73936,min:144,max:195,bin1:0.00146,bin2:0.00273,bin3:0.01808,bin4:0.03677,bin5:0.0521,bin6:0.06762,bin7:0.08111,bin8:0.08694,bin9:0.09243,bin10:0.09678,bin11:0.0879,bin12:0.08222,bin13:0.07574,bin14:0.05866,bin15:0.05342,bin16:0.04293,bin17:0.03127,bin18:0.0197,bin19:0.01045,bin20:0.00169}],
      hr_summary:[{state:state.toUpperCase(),average:73.58025,std:15.19269,min:36,max:224,bin1:0.01235,bin2:0.04356,bin3:0.19596,bin4:0.30087,bin5:0.25276,bin6:0.12436,bin7:0.03276,bin8:0.01583,bin9:0.01077,bin10:0.00417,bin11:0.0011,bin12:0.00114,bin13:0.0008,bin14:0.00099,bin15:0.00056,bin16:0.00044,bin17:0.00032,bin18:0.00051,bin19:0.00032,bin20:0.00042}],
      ldl_summary:[{state:state.toUpperCase(),average:116.2614,std:40.38877,min:9,max:344,bin1:0.00241,bin2:0.01562,bin3:0.02789,bin4:0.07715,bin5:0.15165,bin6:0.19754,bin7:0.182,bin8:0.14513,bin9:0.09363,bin10:0.05076,bin11:0.01551,bin12:0.00903,bin13:0.00875,bin14:0.00821,bin15:0.00635,bin16:0.00303,bin17:0.00208,bin18:0.0013,bin19:0.00123,bin20:0.00075}],
      population_summary:[{state:state.toUpperCase(),population:8938175}],
      sys_summary:[{state:state.toUpperCase(),average:133.10822,std:26.7503,min:93,max:235,bin1:0.01796,bin2:0.07102,bin3:0.15119,bin4:0.18158,bin5:0.15402,bin6:0.10367,bin7:0.06719,bin8:0.04939,bin9:0.03334,bin10:0.02848,bin11:0.02618,bin12:0.02383,bin13:0.02073,bin14:0.01994,bin15:0.01608,bin16:0.01452,bin17:0.01007,bin18:0.00666,bin19:0.00352,bin20:0.00062}],
      tri_summary:[{state:state.toUpperCase(),average:121.38435,std:68.29915,min:12,max:400,bin1:0.01825,bin2:0.05733,bin3:0.1451,bin4:0.16185,bin5:0.15137,bin6:0.1155,bin7:0.08808,bin8:0.06864,bin9:0.05197,bin10:0.03734,bin11:0.02479,bin12:0.01748,bin13:0.0119,bin14:0.00934,bin15:0.00886,bin16:0.00746,bin17:0.00772,bin18:0.00787,bin19:0.00642,bin20:0.00272}],
      waist_summary:[{state:state.toUpperCase(),average:97.6031,std:14.60002,min:68,max:144,bin1:0.00863,bin2:0.04277,bin3:0.05928,bin4:0.06355,bin5:0.08535,bin6:0.0965,bin7:0.09553,bin8:0.09577,bin9:0.0925,bin10:0.08425,bin11:0.07032,bin12:0.06081,bin13:0.04346,bin14:0.02935,bin15:0.02491,bin16:0.0197,bin17:0.01389,bin18:0.0097,bin19:0.00313,bin20:0.00059}],
      weight_summary:[{state:state.toUpperCase(),average:81.68499,std:18.82847,min:46,max:164,bin1:0.01825,bin2:0.07243,bin3:0.08405,bin4:0.1195,bin5:0.12435,bin6:0.12457,bin7:0.11067,bin8:0.09081,bin9:0.07574,bin10:0.05729,bin11:0.04205,bin12:0.02741,bin13:0.02315,bin14:0.01672,bin15:0.00938,bin16:0.00087,bin17:0.00079,bin18:0.00069,bin19:0.00073,bin20:0.00054}],
      wthr_summary:[{state:state.toUpperCase(),average:0.57877,std:0.08874,min:0,max:1,bin1:0,bin2:0,bin3:0,bin4:0,bin5:0,bin6:0,bin7:0,bin8:0.00042,bin9:0.05042,bin10:0.15599,bin11:0.20637,bin12:0.20971,bin13:0.16758,bin14:0.10613,bin15:0.06043,bin16:0.03097,bin17:0.01052,bin18:0.00141,bin19:4.0e-5,bin20:0}]
    };
    var deferred = $q.defer();
    deferred.resolve(stats);
    return deferred.promise;
  }

});


