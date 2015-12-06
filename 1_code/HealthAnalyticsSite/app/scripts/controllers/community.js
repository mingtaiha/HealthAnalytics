'use strict';

/**
 * @ngdoc function
 * @name healthAnalyticsSiteApp.controller:CommunityCtrl
 * @description
 * # CommunityCtrl
 * Controller of the healthAnalyticsSiteApp
 */
angular.module('healthAnalyticsSiteApp')
  .controller('CommunityCtrl', function (graphing) {
    $scope.generateGraphs = function() {
      if ($scope.selectedData && $scope.selectedData.state) {
        HealthService.GetAggregateStats($scope.selectedData.state).then(function (response) {
          if (response.success) {

            // get the stats object
            var agStats = response.data;

            // First remove all of the old ones...
            d3.selectAll("svg").remove();
            $scope.totalPopulation = '';

            // Update population
            $scope.totalPopulation = agStats.population_summary[0]['population'];

            // Generate all Histographs
            graphing.createHistogram('age', 'years', agStats.age_summary[0]);
            graphing.createHistogram('bmi', 'kg/m^2', agStats.bmi_summary[0]);
            graphing.createHistogram('weight', 'kg', agStats.weight_summary[0]);
            graphing.createHistogram('height', 'cm', agStats.height_summary[0]);
            graphing.createHistogram('waist', 'cm', agStats.waist_summary[0]);
            graphing.createHistogram('hr', 'bpm', agStats.hr_summary[0]);
            graphing.createHistogram('tri', 'mg/dL', agStats.tri_summary[0]);
            graphing.createHistogram('hdl', 'mg/dL', agStats.hdl_summary[0]);
            graphing.createHistogram('ldl', 'mg/dL', agStats.ldl_summary[0]);
            graphing.createHistogram('sys', 'mmHg', agStats.sys_summary[0]);
            graphing.createHistogram('dia', 'mmHg', agStats.dia_summary[0]);
            graphing.createHistogram('wthr', 'ratio', agStats.wthr_summary[0]);

            // Generate all Pie Charts
            var stats = [{key:'male', value: agStats.gender_summary[0].male}, {key:'female', value: agStats.gender_summary[0].female}];
            $scope.createPieChart('gender',stats);
            stats = [];
            for (var k in agStats.ethnicity_summary[0]) {
              if( agStats.ethnicity_summary[0].hasOwnProperty(k) && k !== 'state' ) {
                stats.push({key: k, value: agStats.ethnicity_summary[0][k]});
              }
            }
            console.log(stats);
            $scope.createPieChart('ethnicity',stats);


          } else {
            // An alert dialog
            $ionicPopup.alert({
              title: 'Could not leat stats.',
              template: response.data
            });
          }
        });
      } else {
        // An alert dialog
          alert('Select a state.');
      }
    }

  });
