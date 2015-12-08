// Should be changed if testing against other data!!!!
var test_user_id = 'mo.maldonado@gmail.com';
var test_user_password = '1234';


// Authentication + User
describe('Unit: AuthenticationService + UserService', function(){
    
    var UserService;
    var AuthenticationService;

    beforeEach(module('ngCookies', 'starter.config', 'starter.services'));

    beforeEach(inject(function (_AuthenticationService_) {
        AuthenticationService = _AuthenticationService_;
    }));

    beforeEach(inject(function (_UserService_) {
        UserService = _UserService_;
    }));

    it('can get an instance of my AuthenticationService', inject(function(AuthenticationService) {
        expect(AuthenticationService).toBeDefined();
    }));

    it('can get an instance of my UserService', inject(function(UserService) {
        expect(UserService).toBeDefined();
    }));

    it('can log in', inject(function(AuthenticationService) {
        var myresponse = { 
            success: true, 
            code: 200, 
            data: { authtoken: jasmine.stringMatching(/^[a-zA-Z0-9]+$/)} 
        };
        AuthenticationService.Login(test_user_id, test_user_password, function(response){
             expect(response).toEqual(myresponse);
        });
    }));

    it('can get the user', inject(function(UserService){
        UserService.GetByUsername(test_user_id).then(function(response){
            expect(response.data).toEqual(jasmine.objectContaining({
                fname: 'Manuel'
            }));
        });
    }));


    it('can get the ethnicities', inject(function(UserService){
        UserService.GetEthnicitiesList().then(function(response){
            expect(response.data).toEqual(jasmine.objectContaining({
                success: true
            }));

            
        });
    }));


    it('can update the user', inject(function(UserService){
        UserService.GetByUsername(test_user_id).then(function(response){
            if (response.success) {
                var user = response.data;
                UserService.Update(user).then(function(response){
                    expect(response).toEqual(jasmine.objectContaining({
                        success: true
                    }));
                });   
            } else {
                fail("Get user came back with error");
            }
        });
    }));


    it('can log out', inject(function(AuthenticationService) {
        AuthenticationService.Login(test_user_id, test_user_password, function(response){
             expect(response).toEqual(jasmine.objectContaining({
                success: true
            }));
        });
    }));
});



// Workouts
describe('Unit: WorkoutService', function(){

    var WorkoutService;
    var AuthenticationService;

    beforeEach(module('ngCookies', 'starter.config', 'starter.services'));

    beforeEach(inject(function (_AuthenticationService_) {
        AuthenticationService = _AuthenticationService_;
    }));

    beforeEach(inject(function (_WorkoutService_) {
        WorkoutService = _WorkoutService_;
    }));

    it('can get an instance of my WorkoutService', inject(function(WorkoutService) {
        expect(WorkoutService).toBeDefined();
    }));

    it('can log in', inject(function(AuthenticationService) {
        var myresponse = { 
            success: true, 
            code: 200, 
            data: { authtoken: jasmine.stringMatching(/^[a-zA-Z0-9]+$/)} 
        };
        AuthenticationService.Login(test_user_id, test_user_password, function(response){
             expect(response).toEqual(myresponse);
        });
    }));

    it('can get the all workouts', inject(function(WorkoutService){
        WorkoutService.GetAll(test_user_id).then(function(response){
            expect(response.data).toEqual(jasmine.objectContaining({
                success: true
            }));
        });
    }));


    it('can get the workout by id', inject(function(WorkoutService){
        WorkoutService.GetAll(test_user_id).then(function(response){
            if (response.success) {
                var workouts = response.data;
                if( workouts.length <= 0 ) {
                    fail("No workouts in history to get");
                }
                WorkoutService.GetById(workouts[0]['workout_id']).then(function(response){
                    expect(response.data).toEqual(workouts[0]);
                });
            } else {
                fail("Get workout list came back with error");
            }
        });
    }));


    it('can log out', inject(function(AuthenticationService) {
        AuthenticationService.Login(test_user_id, test_user_password, function(response){
             expect(response).toEqual(jasmine.objectContaining({
                success: true
            }));
        });
    }));
});



// Food
describe('Unit: FoodService', function(){

    var FoodService;
    var AuthenticationService;

    beforeEach(module('ngCookies', 'starter.config', 'starter.services'));

    beforeEach(inject(function (_AuthenticationService_) {
        AuthenticationService = _AuthenticationService_;
    }));

    beforeEach(inject(function (_FoodService_) {
        FoodService = _FoodService_;
    }));

    it('can get an instance of my FoodService', inject(function(FoodService) {
        expect(FoodService).toBeDefined();
    }));

    it('can log in', inject(function(AuthenticationService) {
        var myresponse = { 
            success: true, 
            code: 200, 
            data: { authtoken: jasmine.stringMatching(/^[a-zA-Z0-9]+$/)} 
        };
        AuthenticationService.Login(test_user_id, test_user_password, function(response){
             expect(response).toEqual(myresponse);
        });
    }));

    it('can get the all foods', inject(function(FoodService){
        FoodService.GetAll(test_user_id).then(function(response){
            expect(response.data).toEqual(jasmine.objectContaining({
                success: true
            }));
        });
    }));

    it('can get the food by id', inject(function(FoodService){
        FoodService.GetAll(test_user_id).then(function(response){
            if (response.success) {
                var foods = response.data;
                if( foods.length <= 0 ) {
                    fail("No foods in history to get");
                }
                WorkoutService.GetById(foods[0]['userfood_id']).then(function(response){
                    expect(response.data).toEqual(foods[0]);
                });
            } else {
                fail("Get food list came back with error");
            }
        });
    }));

    it('can get the all foods types', inject(function(FoodService){
        FoodService.GetFoodList().then(function(response){
            expect(response.data).toEqual(jasmine.objectContaining({
                success: true
            }));
        });
    }));

    it('can log out', inject(function(AuthenticationService) {
        AuthenticationService.Login(test_user_id, test_user_password, function(response){
             expect(response).toEqual(jasmine.objectContaining({
                success: true
            }));
        });
    }));
});



// Health Stats
describe('Unit: HealthService', function(){

    var HealthService;
    var AuthenticationService;

    beforeEach(module('ngCookies', 'starter.config', 'starter.services'));

    beforeEach(inject(function (_AuthenticationService_) {
        AuthenticationService = _AuthenticationService_;
    }));

    beforeEach(inject(function (_HealthService_) {
        HealthService = _HealthService_;
    }));

    it('can get an instance of my HealthService', inject(function(HealthService) {
        expect(HealthService).toBeDefined();
    }));

    it('can log in', inject(function(AuthenticationService) {
        var myresponse = { 
            success: true, 
            code: 200, 
            data: { authtoken: jasmine.stringMatching(/^[a-zA-Z0-9]+$/)} 
        };
        AuthenticationService.Login(test_user_id, test_user_password, function(response){
             expect(response).toEqual(myresponse);
        });
    }));

    it('can get the all health stats', inject(function(HealthService){
        HealthService.GetStats(test_user_id).then(function(response){
            expect(response.data).toEqual(jasmine.objectContaining({
                success: true
            }));
        });
    }));

    it('can get the all aggregate stats', inject(function(HealthService){
        HealthService.GetAggregateStats('NJ').then(function(response){
            expect(response.data).toEqual(jasmine.objectContaining({
                success: true
            }));
        });
    }));

    it('can log out', inject(function(AuthenticationService) {
        AuthenticationService.Login(test_user_id, test_user_password, function(response){
             expect(response).toEqual(jasmine.objectContaining({
                success: true
            }));
        });
    }));
});