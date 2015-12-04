'use strict';

describe('Service: health', function () {

  // load the service's module
  beforeEach(module('healthAnalyticsSiteApp'));

  // instantiate service
  var health;
  beforeEach(inject(function (_health_) {
    health = _health_;
  }));

  it('should do something', function () {
    expect(!!health).toBe(true);
  });

});
