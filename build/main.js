'use strict';

var s = new Snap('#london');

Snap.load('london.svg', function (response) {
  var london = response,
      londonEye = response.select('#LondonEye'),
      sky = response.select('#Sky'),
      sun = response.select('#Sun'),
      cloud1 = response.select('#Cloud1'),
      cloud2 = response.select('#Cloud2'),
      cloud3 = response.select('#Cloud3'),
      birds = response.select('#Birds'),
      bus1 = response.select('#Bus1'),
      wheel1 = response.select('#Bus1Wheel1'),
      wheel2 = response.select('#Bus1Wheel2'),
      bus2 = response.select('#Bus2'),
      wheel3 = response.select('#Bus2Wheel1'),
      wheel4 = response.select('#Bus2Wheel2'),
      bus3 = response.select('#Bus3'),
      wheel5 = response.select('#Bus3Wheel1'),
      wheel6 = response.select('#Bus3Wheel2'),
      taxi = response.select('#Taxi'),
      wheel7 = response.select('#TaxiWheel1'),
      wheel8 = response.select('#TaxiWheel2'),
      ramp1 = response.select('#Ramp1'),
      ramp2 = response.select('#Ramp2');

  sky.attr({ fill: "#178BFF" });

  var infiniteRotation = function infiniteRotation(object, x, y, speed) {
    // Reset
    object.transform('r0, ' + x + ', ' + y);
    // Animation
    object.animate({
      transform: 'r360, ' + x + ', ' + y
    }, speed, infiniteRotation.bind(null, object, x, y, speed));
  };

  var movingHorizontal = function movingHorizontal(object, speed) {
    var direction = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

    // Reset
    object.transform('t0, 0');
    // Animation
    object.animate({
      transform: 't' + direction + s.node.offsetWidth * 2 + ', 0'
    }, speed, movingHorizontal.bind(null, object, speed, direction));
  };

  var rotateWheel = function rotateWheel(object, speed) {
    var direction = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

    var bbox = object.getBBox();
    // Reset
    object.parent().transform('r0, ' + bbox.cx + ', ' + bbox.cy);
    // Animation
    object.parent().animate({
      transform: 'r' + direction + '360, ' + bbox.cx + ', ' + bbox.cy
    }, speed, rotateWheel.bind(null, object, speed, direction));
  };

  var changingSky = function changingSky(object, speed, color) {
    // Reset
    object.transform('t0, 0');
    // Animation
    object.animate({
      transform: 't0, ' + s.node.offsetHeight / 2
    }, speed, function () {
      sky.animate({ fill: color }, speed);
    });
  };

  var rampRamp = function rampRamp(object, direction, speed, angle, x, y) {
    if (direction === undefined) direction = '';
    if (speed === undefined) speed = 10000;

    object.animate({
      transform: 'r' + direction + angle + ', ' + x + ', ' + y
    }, speed, mina.linear);
  };

  setTimeout(function () {
    rampRamp(ramp1, '', 10000, 20, 150.62, 753.03);
    rampRamp(ramp2, '-', 10000, 22.5, 606.52, 753.03);
  }, 5000);

  changingSky(sun, 30000, '#222333');

  infiniteRotation(londonEye, '1199.696', '378.059', 60000);

  rotateWheel(wheel1, 900, '-');
  rotateWheel(wheel2, 900, '-');
  movingHorizontal(bus1, 30000, '-');

  rotateWheel(wheel3, 1100);
  rotateWheel(wheel4, 1100);
  movingHorizontal(bus2, 40000);

  rotateWheel(wheel5, 700, '-');
  rotateWheel(wheel6, 700, '-');
  movingHorizontal(bus3, 20000, '-');

  rotateWheel(wheel7, 800);
  rotateWheel(wheel8, 800);
  movingHorizontal(taxi, 20000);

  movingHorizontal(cloud1, 360000);
  movingHorizontal(cloud2, 300000, '-');
  movingHorizontal(cloud3, 360000, '-');

  movingHorizontal(birds, 100000);

  s.append(london);
});