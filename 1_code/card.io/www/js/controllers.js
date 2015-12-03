var staticMap = "https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyBCxCvlC1kBSNGd0WEvsN5X0BkqDQTdIdo";
angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope, $ionicHistory, $location, md5, UserService, AuthenticationService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // List used for gender drop downs
  $scope.genderList = [
    {text: 'Male', value: 'm'},
    {text: 'Female', value: 'f'}
  ]

  // List used for state dropdowns
  $scope.stateList = [
    { value: 'AL', text: 'Alabama' }, { value: 'AK', text: 'Alaska' },
    { value: 'AZ', text: 'Arizona' }, { value: 'AR', text: 'Arkansas' },
    { value: 'CA', text: 'California' }, { value: 'CO', text: 'Colorado' },
    { value: 'CT', text: 'Connecticut' }, { value: 'DE', text: 'Delaware' },
    { value: 'FL', text: 'Florida' }, { value: 'GA', text: 'Georgia' },
    { value: 'HI', text: 'Hawaii' }, { value: 'ID', text: 'Idaho' },
    { value: 'IL', text: 'Illinois' }, { value: 'IN', text: 'Indiana' },
    { value: 'IA', text: 'Iowa' }, { value: 'KS', text: 'Kansas' },
    { value: 'KY', text: 'Kentucky' }, { value: 'LA', text: 'Louisiana' },
    { value: 'ME', text: 'Maine' }, { value: 'MD', text: 'Maryland' },
    { value: 'MA', text: 'Massachusetts' }, { value: 'MI', text: 'Michigan' },
    { value: 'MN', text: 'Minnesota' }, { value: 'MS', text: 'Mississippi' },
    { value: 'MO', text: 'Missouri' }, { value: 'MT', text: 'Montana' },
    { value: 'NE', text: 'Nebraska' }, { value: 'NV', text: 'Nevada' },
    { value: 'NH', text: 'New Hampshire' }, { value: 'NJ', text: 'New Jersey' },
    { value: 'NM', text: 'New Mexico' }, { value: 'NY', text: 'New York' },
    { value: 'NC', text: 'North Carolina' }, { value: 'ND', text: 'North Dakota' },
    { value: 'OH', text: 'Ohio' }, { value: 'OK', text: 'Oklahoma' },
    { value: 'OR', text: 'Oregon' }, { value: 'PA', text: 'Pennsylvania' },
    { value: 'RI', text: 'Rhode Island' }, { value: 'SC', text: 'South Carolina' },
    { value: 'SD', text: 'South Dakota' }, { value: 'TN', text: 'Tennessee' },
    { value: 'TX', text: 'Texas' }, { value: 'UT', text: 'Utah' },
    { value: 'VT', text: 'Vermont' }, { value: 'VA', text: 'Virginia' },
    { value: 'WA', text: 'Washington' }, { value: 'WV', text: 'West Virginia' },
    { value: 'WI', text: 'Wisconsin' }, { value: 'WY', text: 'Wyoming' }
  ]

  // Used to display a workout icon in the list
  // Defaults to the ribbon icon.
  $scope.getWorkoutIcon = function(foodName) {
    var foods = {
      'walk': 'ion-android-walk',
      'jog': 'ion-ribbon-a',
      'bike': 'ion-android-bicycle'
    };
    var retIcon = foods[foodName.toLowerCase()];
    return retIcon || 'ion-ribbon-a';
  }

  // Used to display a food icon in the list
  // Defaults to the fork icon.
  $scope.getFoodIcon = function(foodName) {
    var foods = {
      'cheese pizza': 'ion-pizza',
      'coffee (milk and sugar)': 'ion-coffee',
      'yellow cake with vanilla frosting': 'ion-fork'
    };
    var retIcon = foods[foodName.toLowerCase()];
    return retIcon || 'ion-fork';
  }

  // Checks if user is logged in
  $scope.isUserLogged = function(){
    return AuthenticationService.IsLoggedIn();
  }

  $scope.getCurrentUser = function() {
    return AuthenticationService.CurrentUser().user;
  }

  // Logs out...
  $scope.doLogOut = function() {
    AuthenticationService.Logout();
    $ionicHistory.nextViewOptions({disableBack: true});
    $location.path('app/login');
  }

    // Watch for the set current user everytime it changes 
    // in the authentication service.
  $scope.$watch( 'getCurrentUser()' , function ( newValue, oldValue ) {
    $scope.currentUser = newValue; 
  });

})


// Controller for the 'login.html' & 'register.html' templates.
// Used for user login and user registration
.controller('LogInCtrl', function($scope, $ionicModal, $rootScope, $timeout, $location, $ionicHistory, $ionicPopup, UserService, AuthenticationService) {
  $scope.loginData = {};
  $scope.registerData = {};

  // Update the registerData variable with a 'Date' object
  // Used for display + data submission purposes
  $scope.$watch( $scope.registerData.birth_date, function ( birth_date ) {
    $scope.registerData.birth_date = new Date(birth_date);
  });

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    AuthenticationService.Login($scope.loginData.email, $scope.loginData.password, 
    function (response) {
      if (response.success) {
        // Go to the Home
        $ionicHistory.nextViewOptions({disableBack: true});
        $location.path('app/home');
      } else {
        // Show error
        $ionicPopup.alert({
          title: 'Login Failed.',
          template: response.data
        });
      }
    });
  }

  // Perform the register action when the user submits the register form
  $scope.doRegister = function() {
    $scope.registerData.birth_date = new Date($scope.registerData.birth_date); // convert date object
    UserService.Create($scope.registerData).then(function (response){
      if(response.success) {
        // Success! Close modal, since we are good!
        // They need to log in now...
        $scope.closeRegisterModal();
      } else {
        // Show error
        $ionicPopup.alert({
          title: 'Registration Failed.',
          template: response.data
        });
      }
    });
  }

  // When user clicks on "register" we show a modal
  // This is creates the register modal that we will use
  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openRegisterModal = function() {
    $scope.modal.show();
  };

  $scope.closeRegisterModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  $scope.$on('modal.hidden', function() {
    $scope.registerData = {}; // delete all registerData when modal is hidden
  });

})


// Controller for the 'profle.html' template.
// Displays and edits the user's profile.
.controller('ProfileCtrl', function($scope, $rootScope, $ionicPopup, AuthenticationService, UserService) {
  $scope.username = AuthenticationService.CurrentUser().username;
  $scope.editing = false;
  $scope.isUserDataHasChanges = false;
  $scope.userProfile = $scope.currentUser; // get it from the cache...

  // Load the scope data before enetering the view...
  $scope.$on('$ionicView.beforeEnter', function(){
    if ( !$scope.userProfile ) { // if the profile was empty, fill it
      UserService.GetByUsername($scope.username).then(function (response){
      if (response.success) {
        var user = response.data;
        user.gender = user.gender.toLowerCase(); // send gender to lowercase....
        user.birth_date = moment(user.birth_date).toDate(); // convert date object
        $scope.userProfile = user;
      }
    });
    }
  });

   // Set the watch of the variable
  // This checks for dirty-ness
  $scope.$watch('userProfile', function (newValue, oldValue) {
    if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
      $scope.isUserDataHasChanges = true;
    }
  }, true);

  // Perform the login action when the user submits the login form
  $scope.toggleEdit = function() {
    $scope.editing = true;
  };

  // Perform the login action when the user submits the login form
  $scope.saveProfile = function() {
    if ($scope.editing && $scope.isUserDataHasChanges) {
      UserService.Update($scope.userProfile).then(function (response){
        if (response.success) { // update success

          // A success alert dialog
          $ionicPopup.alert({
            title: 'User Update Success!',
            template: response.data.results
          });

          // Get the user from the server again and update currentUser + userProfile...
          UserService.GetByUsername($scope.username).then(function (resp) {
            if(resp.success) {
              var user = resp.data;
              user.gender = user.gender.toLowerCase(); // send gender to lowercase....
              user.birth_date = moment(user.birth_date).toDate(); // convert date object
              AuthenticationService.SetCurrentUser(user);
              $scope.userProfile = user;
              $scope.editing = false; // done editing...
              $scope.isUserDataHasChanges = false; // user was updated, forcing false...
            }
          });
        } else {
          // An alert dialog
          $ionicPopup.alert({
            title: 'User Update Failed.',
            template: response.data
          });
        }
      });
    } else {
      $scope.editing = false;
    }
  };

})


// Controller for the 'addWorkout.html' template.
// Submit a new user Workout item to the server.
.controller('AddWorkoutCtrl', function($scope, $stateParams, $location, $ionicHistory, AuthenticationService, WorkoutService) {
  
  // MET values are taken from 'Compendium of Physical Activities', again see README.md file 
  $scope.workoutTypes = [
    {text: 'Run', value: 'run', met: 8.0},
    {text: 'Walk', value: 'Walk', met: 6.0},
    {text: 'Bike', value: 'bike', met: 7.5}
  ];

  // Calculate the estimated calories everytime user changes workout_type or duration
  // It uses the function 'calculateCalories' defined below
  $scope.$watchGroup( ['workoutData.workout_type', 'workoutData.duration'], function ( newValues, oldValues, scope ) {
    $scope.workoutData.calories = $scope.calculateCalories(newValues[0], newValues[1]);
  });

  // Calculate the estimated calories for the workout done
  // Information on how/were we got the information for this is found
  // on the README.md file of this application.
  $scope.calculateCalories = function(activityType, duration){
    // Formula used: Calories = METS x weight (kg) x time (hours)
    // 1 kg = 0.45359237 (pounds)
    // 1 hour = 60 (mins)
    // METS values are defined above
    var userWeightKg = parseFloat($scope.currentUser.weight) * 0.45359237;
    var durationHours = parseFloat(duration) / 60.0;
    var activityMET = 6.0; // default MET
    for (var workout in $scope.workoutTypes) {
      if ($scope.workoutTypes[workout].value === activityType) {
        activityMET = $scope.workoutTypes[workout].met;
        break;
      }
    }
    return parseFloat(activityMET * userWeightKg * durationHours);
  }

  // Format the display of calories to two decimal points (xx.00)
  $scope.formatCalories = function(calories) {
    if(calories) {
      var calculatedCalories = parseFloat(calories);
      var value = calculatedCalories.toFixed(2);
      return value;
    }
  }

  // New user Workout template data object
  $scope.workoutData = {
    comments: null, 
    workout_type: 'run', 
    workout_timestamp: moment().toDate(), 
    distance: 0.0, 
    duration: 0.0,
    calories: 0.0
  };

  // Submit the user Workout item to server
  $scope.submitWorkout = function() {
    $scope.workoutData.workout_timestamp = moment($scope.workoutData.workout_timestamp).utc().toDate(); // convert date to utc
    WorkoutService.Create(AuthenticationService.CurrentUser().username, $scope.workoutData)
    .then(function (response) {
      if (response.success) {
        $ionicHistory.nextViewOptions({disableBack: true});
        $location.path('app/workouts');
      } else {
        // An alert dialog
        $ionicPopup.alert({
          title: 'Create Workout Failed.',
          template: response.data
        });
      }
    });
  }

  /*
    New Workout request variables format:
    workout_type=[string(100)]
    distance=[float(6,2)] miles
    duration=[int] minutes
    calories=[int]
    workout_timestamp=[UTC formatted date]
    authtoken=[string(32)]

    Example of user's Workout item:
    {"workout_id":51,
    "workout_type":"jog",
    "distance":2,
    "duration":65,
    "calories":250,
    "pace":1,
    "workout_timestamp":"2015-11-05T13:12:43.511Z",
    "email":"ntaylor@aps.rutgers.edu"},
  */

})


// Controller for the 'addFood.html' template.
// Submit a new user Food item to the server.
.controller('AddFoodCtrl', function($scope, $stateParams, $location, $ionicHistory, AuthenticationService, FoodService) {

  // Types of meal
  $scope.mealTypes = [
    {text: 'Breakfast', value: 'breakfast', id: 0},
    {text: 'Lunch', value: 'lunch', id: 1},
    {text: 'Dinner', value: 'dinner', id: 2},
    {text: 'Snack', value: 'snack', id: 3},
    {text: 'Other', value: 'other', id: 4}
  ];

  // Types of serving
  $scope.servingTypes = [
    {text: 'Quick Snack', value: '0.5', id: 0},
    {text: 'Normal', value: '1', id: 1},
    {text: 'Moderate', value: '2', id: 2},
    {text: 'A Lot', value: '3', id: 3}
  ];

  $scope.selected = {};
  $scope.selected.selectedMealType = $scope.mealTypes[0]; // Default to 'Breakfast'
  $scope.selected.selectedServingType = $scope.servingTypes[1]; // Default to 'Normal'

  // Get the list of foods from the server for display purposes.
  FoodService.GetFoodList().then(function (response){
    if(response.success) {
      $scope.foodTypes = response.data;
      $scope.selected.selectedFoodType = $scope.foodTypes[0]; // Default to first item
    }
  });

  // template user food data object
  $scope.foodData = {
    food: 1, // food id
    meal: 'breakfast', 
    serving: '0.5', 
    food_timestamp: moment().toDate(),
    comments: null
  };

  // Submit new user Food to server
  $scope.submitFood = function() {    
    // overrite some of the foodData values
    $scope.foodData.food = $scope.selected.selectedFoodType.food_id; // food id
    $scope.foodData.meal = $scope.selected.selectedMealType.value; // meal value
    $scope.foodData.serving = $scope.selected.selectedServingType.value; // serving value
    $scope.foodData.food_timestamp = moment($scope.foodData.food_timestamp).utc().toDate(); // convert date to utc

    // Send to server
    FoodService.Create(AuthenticationService.CurrentUser().username, $scope.foodData)
    .then(function (response) {
      if (response.success) {
        $ionicHistory.nextViewOptions({disableBack: true});
        $location.path('app/foods');
      } else {
        // An alert dialog
        $ionicPopup.alert({
          title: 'Create Food Failed.',
          template: response.data
        });
      }
    });
  }

  /*
    New Food request variables format:
    food=[int]
    serving=[float(4,2)]
    meal=[string(25)]
    food_timestamp=[UTC formatted date]
    comments=[string(255)] optional

    Example Food Type (pre-determined by server):
    {
      "food_id":1,
      "food_name":"Cheese Pizza",
      "calories":272,
      "serving_size":"1 slice",
      "serving_size_normalized":103
    },

    Example of User's Food Item:
    {
      "userfood_id":"2",
      "food":"1",
      "serving":"2.50",
      "meal":"breakfast",
      "food_timestamp":"2015-11-23T14:34:43.954Z",
      "email":"ntaylor@aps.rutgers.edu",
      "food_name":"Cheese Pizza",
      "calories_per_serving":"272",
      "serving_size":"1 slice",
      "serving_size_normalized":103,
      "total_calories":680,
      "total_mass":257
    }
  */
})


// Controller for the 'workouts.html' template. Displays user's list of workouts.
.controller('WorkoutsCtrl', function($scope, $stateParams, AuthenticationService, WorkoutService) {
  $scope.username = AuthenticationService.CurrentUser().username;

  // Load the scope data before enetering the view...
  $scope.$on('$ionicView.beforeEnter', function(){
    WorkoutService.GetAll($scope.username).then(function (response){
      if (response.success) {
        $scope.workoutList = response.data;
      }
    });
  });

  // Refresh mechanism for pull-to-refresh
  $scope.doRefresh = function() {
    WorkoutService.GetAll($scope.username).then(function (response){
      if (response.success) {
        $scope.workoutList = response.data;
        // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
      }
    });
  }
  
  // Format date using 'moment'
  $scope.formatDate = function(date) {
    if(date) {
      return moment(date).format('LL');
    }
  }

  // Formate the workout duration using 'moment'
  $scope.formatDuration = function(minutes){
    if(minutes){
      var duration = moment.duration(minutes, 'minutes');
      var hours = duration.hours();
      var minutes = duration.minutes();
      var seconds = duration.seconds();
      var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
      return result;
    }
  }

  // Format the workout pace using 'moment'
  $scope.formatPace = function(pace){
    if(pace && pace > 0) {
      var duration = moment.duration(pace, 'minutes');
      var minutes = duration.minutes();
      var seconds = duration.seconds();
      var result = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds) + " min/mi.";
      return result;
    }
  }

  // Format the calories
  $scope.formatCalories = function(calories) {
    if(calories) {
      var calculatedCalories = parseFloat(calories);
      var value = calculatedCalories.toFixed(2);
      return value;
    }
  }

  /*
    Example Workouts List:
  [
  {"workout_id":50,"workout_type":"jog","distance":2,"duration":65,"calories":250,"pace":1,"workout_timestamp":"2015-11-05T13:12:43.511Z","email":"ntaylor@aps.rutgers.edu"},
  {"workout_id":51,"workout_type":"jog","distance":2,"duration":65,"calories":250,"pace":1,"workout_timestamp":"2015-11-05T13:12:43.511Z","email":"ntaylor@aps.rutgers.edu"},
  {"workout_id":52,"workout_type":"jog","distance":2,"duration":65,"calories":250,"pace":1,"workout_timestamp":"2015-11-05T13:12:43.511Z","email":"ntaylor@aps.rutgers.edu"}
  ]
  */

})


// Controller for the 'foods.html' template. Displays user's list of foods.
.controller('FoodsCtrl', function($scope, $stateParams, AuthenticationService, FoodService) {
  $scope.username = AuthenticationService.CurrentUser().username;

  // Get list of pre-defined foods.
  FoodService.GetFoodList().then(function (response){
    if(response.success) {
      $scope.foods = response.data;
    }
  });

  // Load the scope data before enetering the view...
  $scope.$on('$ionicView.beforeEnter', function(){
    // Get user's list of foods
    FoodService.GetAll($scope.username).then(function(response) {
      if(response.success) {
        $scope.foodList = response.data;
      }
    });
  });  

  // Refresh mechanism for pull-to-refresh
  $scope.doRefresh = function() {
    FoodService.GetAll($scope.username).then(function(response) {
      if(response.success) {
        $scope.foodList = response.data;
         // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      }
    });
  }

  // Format the date using 'moment'
  $scope.formatDate = function(date) {
    if(date) {
      return moment(date).format('ll');
    }
  }

  // Format the calories using 'moment'
  $scope.formatCalories = function(calories) {
    if(calories) {
      var calculatedCalories = parseFloat(calories);
      var value = calculatedCalories.toFixed(2) + " calories";
      return value;
    }
  }

  /*
    Example Food List:
    [
      {"userfood_id":"2",
      "food":"1",
      "serving":"2.50",
      "meal":"breakfast",
      "food_timestamp":"2015-11-23T14:34:43.954Z",
      "email":"ntaylor@aps.rutgers.edu",
      "food_name":"Cheese Pizza",
      "calories_per_serving":"272",
      "serving_size":"1 slice",
      "serving_size_normalized":103,
      "total_calories":680,
      "total_mass":257}
    ]

    Example Foods (List of usable foods) from the server:
    [
    {"food_id":1,"food_name":"Cheese Pizza","calories":272,"serving_size":"1 slice","serving_size_normalized":103},
    {"food_id":2,"food_name":"Coffee (milk and sugar)","calories":41,"serving_size":"8 fl oz","serving_size_normalized":237},
    {"food_id":3,"food_name":"Yellow Cake with Vanilla Frosting","calories":239,"serving_size":"1 slice(1\/8 of 18oz cake)","serving_size_normalized":64}
    ]
  */

})

// Controller for the 'home.html' template
// Gets health stats and displays them.
// BP is always systolic/diastolic
// The total cholesterol = LDL + HDL + (Tri / 5)
.controller('HealthCtrl', function($scope, $stateParams, AuthenticationService, HealthService) {
  $scope.username = AuthenticationService.CurrentUser().username;
  $scope.statsText = {
    hr:{text:'Beats Per Minute', units: 'bpm'},
    chol: {text:'Total', units:'mg/dL'},
    tri:{text:'Trig', units: 'mg/dL'},
    hdl:{text:'HDL', units: 'mg/dL'},
    ldl:{text:'LDL', units: 'mg/dL'},
    bp: {text:'Blood Preassure', units: 'mmHg'},
    sys:{text:'Systolic', units: 'mmHg'},
    dia:{text:'Diastolic', units: 'mmHg'}
  };

  // Health stats template
  $scope.stats = {
      Dia:{min:0,max:0},
      HDL:{min:0,max:0},
      HR:{min:0,max:0},
      LDL:{min:0,max:0},
      Sys:{min:0,max:0},
      Tri:{min:0,max:0}
    };

  // Load the scope data before enetering the view...
  $scope.$on('$ionicView.beforeEnter', function(){
    HealthService.GetStats($scope.username).then(function (response){
      if (response.success) {
        $scope.stats = response.data;
      }
    });
  });

  $scope.getStatDisplayDetails = function(statLabel) {
    return $scope.statsText[statLabel.toLowerCase()];
  }

  // Format the display of values to two decimal points (xx.00)
  $scope.formatValue = function(floatValue) {
    if(floatValue.toString()) { // if the value is not undefined
      return parseFloat(floatValue).toFixed(2);
    } else {
      return floatValue;
    }
  }

  // Format the display of integer values.
  $scope.formatIntValue = function(value) {
    if(value.toString()) { // if the value is not undefined
      return parseInt(value);
    } else {
      return value;
    }
  }

  // Get the total cholesterol using the formula
  // total cholesterol = LDL + HDL + (Tri / 5)
  $scope.totalCholesterol = function(ldl, hdl, tri) {
    if(ldl.toString() && hdl.toString() && tri.toString()) { // if the value are not undefined
      var LDL = parseFloat(ldl);
      var HDL = parseFloat(hdl);
      var Tri = parseFloat(tri);
      return parseFloat(LDL + HDL + (Tri / 5.0)).toFixed(2);
    } else {
      return 0.00;
    }
  }

  /*
    Health Stats Example:
    {
      Dia:{min:0,max:0},
      HDL:{min:0,max:0},
      HR:{min:0,max:0},
      LDL:{min:0,max:0},
      Sys:{min:0,max:0},
      Tri:{min:0,max:0}
    }
  */
})

// Controller for the 'settings.html' template.
// Used for allowing users (future teams) to change the 
// URL of the application, etc...
.controller('SettingsCtrl', function($scope, $stateParams) {
});


/*
  // THESE ARE EXTRA FUNCTIONS
  // USED TO IMPLEMENT PLATFORM-SPECIFIC SETTINGS
  // AND IOS TOUCH-ID.

  $scope.getName = function () {
    if(plugins.appPreferences) {
      plugins.appPreferences.fetch(function(value){
        $scope.$apply(function(){$scope.name = value;});
        alert("I got this value: " + $scope.name);
      }, function(err){
        console.log(err);
      }, 'name');
    } else {
      return "Manuel";
    }
  };
  $scope.setName = function () {
    if(plugins.appPreferences) {
      plugins.appPreferences.store(function () {
        console.log('successfully saved!');
        alert("I saved: " + $scope.loginData.username);
        }, 
        function(){
          console.log('error setting reference...');
        }, 
        'name', 
        $scope.loginData.username
      );
    } else {
      console.log('nothing...');
    }
  };
  $scope.touchId = function(){
    $cordovaTouchID.checkSupport().then(function() {
      console.log('TouchID Available, using....');
      $cordovaTouchID.authenticate("Login plz").then(function() {
        alert('authenticated!');
      }, function () {
        alert('Something happened....');
      });
    }, function (error) {
      alert(error); // TouchID not supported
    });
  };
  */