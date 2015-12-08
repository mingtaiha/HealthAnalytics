describe('Unit: LogInCtrl + AppCtrl', function(){
    var scope;
    var AuthenticationService;
    var UserService;
    
    // load the controller's module and all dependencies
    beforeEach(module('ionic', 'ngCookies', 'starter.config', 'starter.services', 'angular-md5', 'ngIOS9UIWebViewPatch', 'starter.controllers'));
    

    beforeEach(inject(function($rootScope, $controller, $q) {
        scope = $rootScope.$new();
        var user = {"fname":"Manuel","mi":"O","lname":"Maldonado","role":"user","email":test_user_id,"weight":220,"height":72,"birth_date":"1987-09-16T04:00:00.000Z","gender":"M","waist_size":36,"address1":"One Awesome Way","address2":null,"city":"New Brunswick","state":"NJ","zip":"12345","ethnicity":"Hisp"};
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

        UserService = {
            GetById: function (id) {
                var deferred = $q.defer();
                deferred.resolve({success: true, code: 200, data: user});
                return deferred.promise;
              },

            GetByUsername: function (username) {
                var deferred = $q.defer();
                deferred.resolve({success: true, code: 200, data: user });
                return deferred.promise;
              },

              Create: function (user) {
                var deferred = $q.defer();
                deferred.resolve({ success: true, code: 200, data: 'OK' });
                return deferred.promise;
              },

              Update: function(user) {
                var deferred = $q.defer();
                deferred.resolve({ success: true, code: 200, data: 'OK' });
                return deferred.promise;
              },

              GetEthnicitiesList: function () {
                var deferred = $q.defer();
                deferred.resolve({ success: true, code: 200, data: ethnicities });
                return deferred.promise;
              }      
        };

        AuthenticationService = {
            Login: function (username, password, callback) {
                callback({ success: false, code: 200, data: 'OK' });
            },

            SetCredentials: function (username, password, token, user) {
                return true; 
            },

            CurrentUser: function () {
                return {
                    username: 'mo.maldonado@gmail.com',
                    password: '1234',
                    authdata: '1234567890asdfgh',
                    user: user
                };
            },

            SetCurrentUser: function(user) {
                return true;
            },

            IsLoggedIn: function () {
                return true;
            },

            ClearCredentials: function() {
                return true;
            }, 

            Logout: function() {
                return true;
            }

        };
        
        // Add the scope values needed
        scope.loginData = {email: test_user_id, password: test_user_password};
        scope.registerData = user;

        $controller('AppCtrl', {$scope: scope, UserService: UserService, AuthenticationService: AuthenticationService});
        $controller('LogInCtrl', {$scope: scope, UserService: UserService, AuthenticationService: AuthenticationService});
    }));

    // tests start here
    it('get workout icon should return correct icon', function(){
        expect(scope.getWorkoutIcon('walk')).toEqual('ion-android-walk');
        expect(scope.getWorkoutIcon('jog')).toEqual('ion-ribbon-a');
        expect(scope.getWorkoutIcon('bike')).toEqual('ion-android-bicycle');
    });

    it('get food item should return correct icon', function(){
        expect(scope.getFoodIcon('cheese pizza')).toEqual('ion-pizza');
        expect(scope.getFoodIcon('coffee (milk and sugar)')).toEqual('ion-coffee');
        expect(scope.getFoodIcon('yellow cake with vanilla frosting')).toEqual('ion-fork');
    });

    it('cat get state list and it returns 50 states', function(){
        expect(scope.stateList.length).toEqual(50);
    });

    it('cat get gender list and it returns 2 genders', function(){
        expect(scope.genderList.length).toEqual(2);
    });

    it('can call isUserLogged function and should return false', function(){
        expect(scope.isUserLogged()).toEqual(true);
    });

    it('can get current user', function(){
        expect(scope.getCurrentUser()).toEqual(jasmine.objectContaining({
            email: test_user_id
        }));
    });

    it('can register', function(){
        scope.doRegister();
    });

    it('can log in', function(){
        scope.doLogin();
    });

    it('cat log out', function(){
        scope.doLogOut();
    });
    
});


// Profile Controller
describe('Unit: ProfileCtrl', function(){
    var scope;
    var AuthenticationService;
    var UserService;
    
    // load the controller's module and all dependencies
    beforeEach(module('ionic', 'ngCookies', 'starter.config', 'starter.services', 'angular-md5', 'ngIOS9UIWebViewPatch', 'starter.controllers'));
    

    beforeEach(inject(function($rootScope, $controller, $ionicPopup, $q) {
        scope = $rootScope.$new();
        var user = {"fname":"Manuel","mi":"O","lname":"Maldonado","role":"user","email":test_user_id,"weight":220,"height":72,"birth_date":"1987-09-16T04:00:00.000Z","gender":"M","waist_size":36,"address1":"One Awesome Way","address2":null,"city":"New Brunswick","state":"NJ","zip":"12345","ethnicity":"Hisp"};
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

        UserService = {
            GetById: function (id) {
                var deferred = $q.defer();
                deferred.resolve({success: true, code: 200, data: user});
                return deferred.promise;
              },

            GetByUsername: function (username) {
                var deferred = $q.defer();
                deferred.resolve({success: true, code: 200, data: user });
                return deferred.promise;
              },

              Create: function (user) {
                var deferred = $q.defer();
                deferred.resolve({ success: true, code: 200, data: 'OK' });
                return deferred.promise;
              },

              Update: function(user) {
                var deferred = $q.defer();
                deferred.resolve({ success: true, code: 200, data: 'OK' });
                return deferred.promise;
              },

              GetEthnicitiesList: function () {
                var deferred = $q.defer();
                deferred.resolve({ success: true, code: 200, data: ethnicities });
                return deferred.promise;
              }      
        };

        AuthenticationService = {
            Login: function (username, password, callback) {
                callback({ success: false, code: 200, data: 'OK' });
            },

            SetCredentials: function (username, password, token, user) {
                return true; 
            },

            CurrentUser: function () {
                return {
                    username: 'mo.maldonado@gmail.com',
                    password: '1234',
                    authdata: '1234567890asdfgh',
                    user: user
                };
            },

            SetCurrentUser: function(user) {
                return true;
            },

            IsLoggedIn: function () {
                return true;
            },

            ClearCredentials: function() {
                return true;
            }, 

            Logout: function() {
                return true;
            }

        };
        
        // Add the scope values needed
        scope.currentUser = user;
        scope.userProfile = user;
        $controller('ProfileCtrl', {$scope: scope, $ionicPopup: $ionicPopup, UserService: UserService, AuthenticationService: AuthenticationService});
    }));

    // tests start here
    it('can toggle edit', function(){
        scope.editing = false;
        scope.toggleEdit();
        expect(scope.editing).toEqual(true);
    });

    it('can save profile', function(){
        scope.editing = true;
        scope.isUserDataHasChanges = true;
        scope.saveProfile();
    });
    
});


// Add Workout Controller
describe('Unit: AddWorkoutCtrl', function(){
    var scope;
    var AuthenticationService;
    var WorkoutService;
    
    // load the controller's module and all dependencies
    beforeEach(module('ionic', 'ngCookies', 'starter.config', 'starter.services', 'angular-md5', 'ngIOS9UIWebViewPatch', 'starter.controllers'));
    

    beforeEach(inject(function($rootScope, $controller, $q) {
        scope = $rootScope.$new();
        var user = {"fname":"Manuel","mi":"O","lname":"Maldonado","role":"user","email":test_user_id,"weight":220,"height":72,"birth_date":"1987-09-16T04:00:00.000Z","gender":"M","waist_size":36,"address1":"One Awesome Way","address2":null,"city":"New Brunswick","state":"NJ","zip":"12345","ethnicity":"Hisp"};
        var workout = {
            "workout_id":1,
            "workout_type":"jog",
            "distance":2,
            "duration":65,
            "calories":250,
            "pace":1,
            "workout_timestamp":"2015-11-05T13:12:43.511Z",
            "email":"ntaylor@aps.rutgers.edu"
        };

        WorkoutService = {
            GetById: function (id) {
                var deferred = $q.defer();
                deferred.resolve({success: true, code: 200, data: workout});
                return deferred.promise;
              },

            GetAll: function (username) {
                var deferred = $q.defer();
                deferred.resolve({success: true, code: 200, data: [workout] });
                return deferred.promise;
              },

            Create: function (username, workout) {
                var deferred = $q.defer();
                deferred.resolve({ success: true, code: 200, data: 'OK' });
                return deferred.promise;
            }

        };

        AuthenticationService = {
            Login: function (username, password, callback) {
                callback({ success: false, code: 200, data: 'OK' });
            },

            SetCredentials: function (username, password, token, user) {
                return true; 
            },

            CurrentUser: function () {
                return {
                    username: 'mo.maldonado@gmail.com',
                    password: '1234',
                    authdata: '1234567890asdfgh',
                    user: user
                };
            },

            SetCurrentUser: function(user) {
                return true;
            },

            IsLoggedIn: function () {
                return true;
            },

            ClearCredentials: function() {
                return true;
            }, 

            Logout: function() {
                return true;
            }

        };
        
        // Add the scope values needed
        scope.currentUser = user;
        scope.workoutData = {
            comments: 'Some comments', 
            workout_type: 'run', 
            workout_timestamp: moment().toDate(), 
            distance: 3.0, 
            duration: 30.0,
            calories: 399.16
          };
        $controller('AddWorkoutCtrl', {$scope: scope, WorkoutService: WorkoutService, AuthenticationService: AuthenticationService});
    }));



    // tests start here
    it('can get workout types', function(){
        expect(scope.workoutTypes).toEqual([
            {text: 'Run', value: 'run', met: 8.0},
            {text: 'Walk', value: 'Walk', met: 6.0},
            {text: 'Bike', value: 'bike', met: 7.5}
        ]);
    });

    it('can calculate calories', function(){
        expect( parseFloat(scope.calculateCalories('run',30.0)).toFixed(2)).toEqual('399.16');
    });

    it('can format calories', function(){
        expect(scope.formatCalories(37.09090909)).toEqual('37.09');
    });

    it('can submit workout', function() {
        scope.submitWorkout();
    });
    
});



// Add Food Controller
describe('Unit: AddFoodCtrl', function(){
    var scope;
    var AuthenticationService;
    var FoodService;
    
    // load the controller's module and all dependencies
    beforeEach(module('ionic', 'ngCookies', 'starter.config', 'starter.services', 'angular-md5', 'ngIOS9UIWebViewPatch', 'starter.controllers'));
    

    beforeEach(inject(function($rootScope, $controller, $q) {
        scope = $rootScope.$new();
        var user = {"fname":"Manuel","mi":"O","lname":"Maldonado","role":"user","email":test_user_id,"weight":220,"height":72,"birth_date":"1987-09-16T04:00:00.000Z","gender":"M","waist_size":36,"address1":"One Awesome Way","address2":null,"city":"New Brunswick","state":"NJ","zip":"12345","ethnicity":"Hisp"};
        var food = {
          userfood_id:1,
          food: 1,
          serving:2.50,
          meal:"breakfast",
          food_timestamp:"2015-11-23T14:34:43.954Z",
          email:"mo.maldonado@gmail.com",
          food_name:"Cheese Pizza",
          calories_per_serving:272,
          serving_size:"1 slice",
          serving_size_normalized:103,
          total_calories:680,
          total_mass:257
        };
        var foodType = {
          food_id:1,
          food_name:"Cheese Pizza",
          calories:272,
          serving_size:"1 slice",
          serving_size_normalized:103
        };

        FoodService = {
            GetById: function (id) {
                var deferred = $q.defer();
                deferred.resolve({success: true, code: 200, data: food});
                return deferred.promise;
              },

            GetAll: function (username) {
                var deferred = $q.defer();
                deferred.resolve({success: true, code: 200, data: [food] });
                return deferred.promise;
              },

            Create: function (username, workout) {
                var deferred = $q.defer();
                deferred.resolve({ success: true, code: 200, data: 'OK' });
                return deferred.promise;
            },

            GetFoodList: function() {
                var deferred = $q.defer();
                deferred.resolve({success: true, code: 200, data: [foodType]});
                return deferred.promise;
            }

        };

        AuthenticationService = {
            Login: function (username, password, callback) {
                callback({ success: false, code: 200, data: 'OK' });
            },

            SetCredentials: function (username, password, token, user) {
                return true; 
            },

            CurrentUser: function () {
                return {
                    username: 'mo.maldonado@gmail.com',
                    password: '1234',
                    authdata: '1234567890asdfgh',
                    user: user
                };
            },

            SetCurrentUser: function(user) {
                return true;
            },

            IsLoggedIn: function () {
                return true;
            },

            ClearCredentials: function() {
                return true;
            }, 

            Logout: function() {
                return true;
            }

        };
        
        // Add the scope values needed
        scope.currentUser = user;
        scope.foodData = {
            food: 1, // food id
            meal: 'breakfast', 
            serving: '0.5', 
            food_timestamp: moment().toDate(),
            comments: null
        };
        $controller('AddFoodCtrl', {$scope: scope, FoodService: FoodService, AuthenticationService: AuthenticationService});
    }));



    // tests start here
    it('can get meal types', function(){
        expect(scope.mealTypes).toEqual([
            {text: 'Breakfast', value: 'breakfast', id: 0},
            {text: 'Lunch', value: 'lunch', id: 1},
            {text: 'Dinner', value: 'dinner', id: 2},
            {text: 'Snack', value: 'snack', id: 3},
            {text: 'Other', value: 'other', id: 4}
        ]);
    });

    it('can get serving types', function(){
        expect(scope.servingTypes).toEqual([
            {text: 'Quick Snack', value: '0.5', id: 0},
            {text: 'Normal', value: '1', id: 1},
            {text: 'Moderate', value: '2', id: 2},
            {text: 'A Lot', value: '3', id: 3}
        ]);
    });

    it('can submit workout', function() {
        scope.selected = {};
        scope.selected.selectedFoodType = { food_id:1, food_name:"Cheese Pizza", calories:272, serving_size:"1 slice", serving_size_normalized:103 };
        scope.selected.selectedMealType = {text: 'Breakfast', value: 'breakfast', id: 0}; // meal value
        scope.selected.selectedServingType = {text: 'Quick Snack', value: '0.5', id: 0}; // serving value
        scope.submitFood();
    });
    
});