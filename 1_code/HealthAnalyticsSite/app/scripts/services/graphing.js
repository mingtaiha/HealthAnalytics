'use strict';

/**
 * @ngdoc service
 * @name healthAnalyticsSiteApp.graphing
 * @description
 * # login
 * Service in the healthAnalyticsSiteApp.
 */
angular.module('healthAnalyticsSiteApp')
  .service('graphing', function ($scope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    // Creates a Pie Chart with data that comes from the server
    // The stats need to be pre configures into an array of:
    // [{key:'', value:''}, ....]

    // Created a histogram from the aggregate data that comes from the server
    $scope.createHistogram = function(label, units, stats) {

      // Bin information
      // Bin Size == max-min / 20
      var binsize = (stats.max - stats.min) / $scope.numbins

      // Set the limits of the x axis
      var xmin = stats.min;
      var xmax = stats.max;

      var data = new Array($scope.numbins);
      for (var i = 0; i < $scope.numbins; i++) {
        data[i] = { numfill: parseFloat(stats['bin' + (i+1)]).toFixed(5) };
      }

      console.log(data);

      // A formatter for counts.
      var formatCount = d3.format("%");

      var margin = {top: 10, right: 65, bottom: 50, left: 40},
        binmargin = binsize * 0.05,
        width = $scope.dev_width - margin.left - margin.right,
        height = parseInt($scope.dev_height / 3) - margin.top - margin.bottom;

      // This scale is for determining the widths of the histogram bars
      // Must start at 0 or else x(binsize a.k.a dx) will be negative
      var x = d3.scale.linear()
        .domain([0, (xmax - xmin)]) // min to max
        .range([0, width]);

      // Scale for the placement of the bars
      var x2 = d3.scale.linear()
        .domain([xmin, xmax])
        .range([0, width]);

      // Y axis
      var y = d3.scale.linear()
        .domain([0, d3.max(data, function(d) { return d.numfill; })])
        .range([height, 0]);

      var xAxis = d3.svg.axis()
        .scale(x2)
        .orient("bottom");

      var yAxis = d3.svg.axis()
        .scale(y)
        .ticks(10)
        .orient("left")
        .tickFormat(formatCount);

      // put the graph in the "p" tag
      var svg = d3.select("."+ label +"-graph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // set up the bars
      var bar = svg.selectAll(".graph-bar")
        .data(data)
        .enter().append("g")
        .attr("class", "graph-bar")
        .attr("transform", function(d, i) { return "translate(" + x2(i * binsize + stats.min) + "," + y(d.numfill) + ")"; });

      // add rectangles of correct size at correct location
      bar.append("rect")
        .attr("x", x(binmargin))
        .attr("width", x(binsize - 2 * binmargin))
        .attr("height", function(d) { return height - y(d.numfill); });
      console.log(binsize);


      // add the x axis and x-label
      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
      svg.append("text")
        .attr("class", "xlabel")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + 40) + ")") // margin.bottom
        .text(units);

      // add the y axis and y-label
      svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0,0)")
        .call(yAxis);
      svg.append("text")
        .attr("class", "ylabel")
        .attr("y", 0 - margin.left) // x and y switched due to rotation
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "middle");
    }

    $scope.createPieChart = function(label, stats) {
      var margin = {top: 10, right: 50, bottom: 20, left: 30},
        width = $scope.dev_width - margin.left - margin.right,
        height = parseInt($scope.dev_height / 3),
        radius = Math.min(width, height) / 2;

      var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

      var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

      var labelArc = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

      var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.value; });

      var svg = d3.select("."+label+"-graph").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var g = svg.selectAll(".arc")
        .data(pie(stats))
        .enter().append("g")
        .attr("class", "arc");

      g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.key); });

      g.append("text")
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .text(function(d) { return d.data.key; });
    }

    $scope.formatPopulation = function (nStr) {
      if(nStr !== '') {
        nStr += '';
        x = nStr.split('.');
       var x1 = x[0];
       var x2 = x.length > 1 ? '.' + x[1] : '';

        var rgx = /(\d+)(\d{3})/;

        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
      }
    }

  });
