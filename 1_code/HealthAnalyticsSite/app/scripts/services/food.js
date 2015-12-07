'use strict';

/**
 * @ngdoc service
 * @name healthAnalyticsSiteApp.food
 * @description
 * # food
 * Service in the healthAnalyticsSiteApp.
 */
angular.module('healthAnalyticsSiteApp')
  .service('food', function ($http, AppConfig) {
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
  });
