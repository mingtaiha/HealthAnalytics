'use strict';

describe('Service: food', function () {

  // load the service's module
  beforeEach(module('healthAnalyticsSiteApp'));

  // instantiate service
  var food;
  beforeEach(inject(function (_food_) {
    food = _food_;
  }));

  it('should do something', function () {
    expect(!!food).toBe(true);
  });

});
