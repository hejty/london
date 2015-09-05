let s = new Snap('#london');

Snap.load('london.svg', response => {
  let london = response,
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

  sky.attr({fill: "#178BFF"});

  let infiniteRotation = (object, x, y, speed) => {
    object.stop().animate({
      transform: `r360, ${x}, ${y}`
    }, speed, infiniteRotation.bind(null, object, x, y, speed));
  };

  let movingHorizontal = (object, speed, direction = '') => {
    object.stop().animate({
      transform: `t${direction}${s.node.offsetWidth*2}, 0`
    }, speed, movingHorizontal.bind(null, object, speed, direction));
  };

  let rotateWheel = (object, speed, direction = '') => {
    let bbox = object.getBBox();
    object.stop().parent().animate({
      transform: `r${direction}360, ${bbox.cx}, ${bbox.cy}`
    }, speed, rotateWheel.bind(null, object, speed, direction));
  };

  let changingSky = (object, speed, color) => {
    object.stop().animate({
      transform: `t0, ${s.node.offsetHeight/2}`
    }, speed, () => {
      sky.animate({fill: color}, speed)
    });
  };

  let rampRamp = (object, direction = '', speed = 10000, angle, x, y) => {
    object.stop().animate({
      transform: `r${direction}${angle}, ${x}, ${y}`
    }, speed, mina.linear);
  }

  setTimeout(() => {
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
