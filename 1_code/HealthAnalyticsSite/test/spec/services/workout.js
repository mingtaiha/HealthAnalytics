'use strict';

describe('Service: workout', function () {

  // load the service's module
  beforeEach(module('healthAnalyticsSiteApp'));

  // instantiate service
  var workout;
  beforeEach(inject(function (_workout_) {
    workout = _workout_;
  }));

  it('should do something', function () {
    expect(!!workout).toBe(true);
  });

});
