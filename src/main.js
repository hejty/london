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

  let infiniteRotation = (object, x, y, speed) => {
     // Reset
    object.transform(`r0, ${x}, ${y}`);
     // Animation
    object.animate({
      transform: `r360, ${x}, ${y}`
    }, speed, infiniteRotation.bind(null, object, x, y, speed));
  };

  let movingHorizontal = (object, speed, direction = '') => {
    // Reset
    object.transform('t0, 0');
    // Animation
    object.animate({
      transform: `t${direction}${s.node.offsetWidth*2}, 0`
    }, speed, movingHorizontal.bind(null, object, speed, direction));
  };

  infiniteRotation(londonEye, '1199.696', '378.059', 60000);

  movingHorizontal(bus1, 30000, '-');
  movingHorizontal(bus2, 40000);
  movingHorizontal(bus3, 20000, '-');
  movingHorizontal(taxi, 20000);

  movingHorizontal(cloud1, 360000);
  movingHorizontal(cloud2, 300000, '-');
  movingHorizontal(cloud3, 360000, '-');

  movingHorizontal(birds, 100000);

  s.append(london);
});
